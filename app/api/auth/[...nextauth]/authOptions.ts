import { AuthOptions, User } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
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
};
