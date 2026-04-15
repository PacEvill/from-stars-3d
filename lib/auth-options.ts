import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { createTransport } from 'nodemailer';

type UserToken = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

const prismaAdapterCompat = PrismaAdapter as unknown as (client: unknown, modelMapping?: unknown) => unknown;

export const authOptions: NextAuthOptions = {
  adapter: prismaAdapterCompat(prisma as any, {
    user: 'Usuario',
    account: 'Account',
    session: 'Session',
    verificationToken: 'VerificationToken',
  } as any) as any,
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier: email, url, provider: { server, from } }) {
        const { host } = new URL(url);
        const transport = createTransport(server);
        await transport.sendMail({
          to: email,
          from,
          subject: `Verifique seu e-mail para ${host}`,
          text: `Para fazer login, clique no link: ${url}`,
          html: `<p>Para fazer login no From Stars 3D, clique no link abaixo:</p><p><a href="${url}">${url}</a></p>`,
        });
      },
    }),
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
    async jwt({ token, user, trigger, session }) {
      const jwtToken = token as UserToken;

      if (user) {
        jwtToken.id = user.id;
        jwtToken.name = user.name;
        jwtToken.email = user.email;
        jwtToken.image = user.image;
      }

      if (trigger === 'update' && session?.user?.image) {
        jwtToken.image = session.user.image;
      }

      return jwtToken;
    },
    async session({ session, token }) {
      const jwtToken = token as UserToken;
      session.user = {
        ...session.user,
        id: jwtToken.id,
        name: jwtToken.name,
        email: jwtToken.email,
        image: jwtToken.image,
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
