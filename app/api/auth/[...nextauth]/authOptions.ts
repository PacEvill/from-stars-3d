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
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      // Persistir id e buscar isAdmin do banco
      if (user) {
        token.id = (user as any).id
        
        // Se for login com Google, buscar isAdmin do banco
        if (account?.provider === 'google') {
          try {
            const dbUser = await prisma.usuario.findUnique({
              where: { email: user.email! }
            })
            token.isAdmin = (dbUser as any)?.isAdmin ?? false
          } catch (error) {
            console.error('[AUTH] Erro ao buscar isAdmin:', error)
            token.isAdmin = false
          }
        } else {
          // Para Credentials, usar o valor já propagado
          token.isAdmin = (user as any).isAdmin ?? false
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id)
        session.user.isAdmin = Boolean((token as any).isAdmin)
      }
      return session
    }
  }
};
