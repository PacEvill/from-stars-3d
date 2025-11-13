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
    async jwt({ token, user, account }) {
      // Persistir id, isAdmin e imagem do usuário no token JWT.
      // Isso permite que a sessão (session callback) reflita mudanças como atualização da foto de perfil.
      if (user) {
        token.id = (user as any).id
        // Se o objeto user (primeiro login) já tiver imagem vinda do authorize, manter.
        if ((user as any).image) {
          token.image = (user as any).image
        }

        // Carregar flags/atributos adicionais do banco (isAdmin + imagem mais recente)
        try {
          const dbUser = await prisma.usuario.findUnique({
            where: { email: user.email! }
          })
          if (dbUser) {
            token.isAdmin = (dbUser as any).isAdmin ?? false
            // Sempre sincronizar imagem do banco (pode ter sido atualizada em outra aba/request)
            if (dbUser.imagem) {
              token.image = dbUser.imagem
            }
          }
        } catch (error) {
          console.error('[AUTH] Erro ao buscar dados do usuário (isAdmin/imagem):', error)
          // Fallback: manter valores já presentes
          token.isAdmin = (token as any).isAdmin ?? false
        }
      } else if (token.email) {
        // Requisições subsequentes (sem objeto user). Revalidar sempre para refletir alterações recentes (ex: upload de avatar).
        try {
          const dbUser = await prisma.usuario.findUnique({ where: { email: token.email as string } })
          if (dbUser) {
            token.isAdmin = (dbUser as any).isAdmin ?? (token as any).isAdmin ?? false
            if (dbUser.imagem) token.image = dbUser.imagem
          }
        } catch (error) {
          console.error('[AUTH] Erro ao revalidar dados do usuário (ciclo subsequente):', error)
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id)
        session.user.isAdmin = Boolean((token as any).isAdmin)
        // Propagar imagem se existir no token
        if ((token as any).image) {
          session.user.image = (token as any).image as string
        }
      }
      return session
    }
  }
};
