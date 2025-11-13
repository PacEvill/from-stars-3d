import { AuthOptions, User } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        // Aceita ambos para compatibilidade com o front atual
        senha: { label: "Senha", type: "password" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<User | null> {
        const email = credentials?.email as string | undefined;
        const senha = (credentials as any)?.senha as string | undefined;
        const password = (credentials as any)?.password as string | undefined;
        const providedPassword = senha || password;

        if (!email || !providedPassword) {
          return null;
        }

        const user = await prisma.usuario.findUnique({
          where: { email }
        });

        if (!user || !user.senha) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(providedPassword, user.senha);

        if (!passwordMatch) {
          return null;
        }

        const authUser: User = {
          id: String(user.id),
          email: user.email,
          name: user.nome || undefined,
          image: user.imagem || undefined,
          isAdmin: (user as any).isAdmin ?? false,
        };

        return authUser;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt"
  },
  // Garantir que NEXTAUTH_URL esteja correto em produção (definir na plataforma de deploy)
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // Minimizar tamanho do cookie JWT: NÃO armazenar imagem base64 (evita erro 431: headers too large).
      if (user) {
        token.id = (user as any).id
        // Buscar apenas flag isAdmin, ignorar imagem pesada
        try {
          const dbUser = await prisma.usuario.findUnique({ where: { email: user.email! } })
          token.isAdmin = (dbUser as any)?.isAdmin ?? false
        } catch (error) {
          console.error('[AUTH] Erro ao buscar isAdmin:', error)
          token.isAdmin = false
        }
      } else if (token.email) {
        // Revalida somente isAdmin em ciclos subsequentes se necessário
        try {
          const dbUser = await prisma.usuario.findUnique({ where: { email: token.email as string } })
          if (dbUser) token.isAdmin = (dbUser as any).isAdmin ?? (token as any).isAdmin ?? false
        } catch (error) {
          console.error('[AUTH] Erro ao revalidar isAdmin:', error)
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id)
        session.user.isAdmin = Boolean((token as any).isAdmin)
        // Buscar imagem sob demanda do banco (não inflar JWT). Evita header gigante.
        try {
          const dbUser = await prisma.usuario.findUnique({ where: { email: session.user.email! } })
          if (dbUser?.imagem) session.user.image = dbUser.imagem
        } catch (error) {
          console.error('[AUTH] Erro ao carregar imagem na session:', error)
        }
      }
      return session
    }
  }
};
