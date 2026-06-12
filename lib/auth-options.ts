import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import type { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      async profile(profile) {
        const user = await prisma.usuario.findUnique({
          where: { email: profile.email },
        });

        if (!user) {
          const newUser = await prisma.usuario.create({
            data: {
              email: profile.email,
              nome: profile.name,
              imagem: profile.picture,
              emailVerified: new Date(),
            },
          });

          return {
            id: newUser.id.toString(),
            name: newUser.nome,
            email: newUser.email,
            image: newUser.imagem,
          };
        }

        if (!user.emailVerified) {
          await prisma.usuario.update({
            where: { id: user.id },
            data: { emailVerified: new Date() },
          });
        }

        return {
          id: user.id.toString(),
          name: user.nome,
          email: user.email,
          image: user.imagem,
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        senha: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.senha) {
          return null;
        }

        const user = await prisma.usuario.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.senha) {
          return null;
        }

        if (!user.emailVerified) {
          throw new Error('Por favor, verifique seu e-mail antes de fazer login.');
        }

        const isPasswordValid = await bcrypt.compare(credentials.senha, user.senha);
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id.toString(),
          name: user.nome,
          email: user.email,
          image: user.imagem,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'credentials' && user) {
        const dbUser = await prisma.usuario.findUnique({
          where: { email: user.email as string },
        });
        if (!dbUser?.emailVerified) {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }): Promise<JWT> {
      if (user) {
        token.id = user.id;
        token.name = user.name ?? null;
        token.email = user.email ?? null;
        token.picture = user.image ?? null;
      }

      if (trigger === 'update' && session?.user?.image) {
        token.picture = session.user.image;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        name: token.name ?? null,
        email: token.email ?? null,
        image: token.picture ?? null,
      };
      return session;
    },
  },
  pages: {
    signIn: '/login',
    verifyRequest: '/auth/verify-request',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
