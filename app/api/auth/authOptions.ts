import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma"; // Import from lib/prisma
import bcrypt from "bcryptjs"; // Para comparar senhas

export const authOptions: NextAuthOptions = {
  // @next-auth/prisma-adapter v1 expects a single prisma client argument.
  // Model mapping would require adapter configuration or schema changes; keep adapter call simple.
  adapter: PrismaAdapter(prisma as any),
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    //   async profile(profile) {
    //     const user = await prisma.usuario.findUnique({
    //       where: { email: profile.email },
    //     });
    //     if (!user) {
    //       // Se o usuário não existe, crie um novo
    //       const newUser = await prisma.usuario.create({
    //         data: {
    //           email: profile.email,
    //           nome: profile.name,
    //           imagem: profile.picture,
    //         },
    //       });
    //       return {
    //         id: newUser.id.toString(),
    //         ...newUser,
    //       };
    //     }
    //     return {
    //       id: user.id.toString(),
    //       ...user,
    //     };
    //   },
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        senha: { label: "Senha", type: "password" },
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

        if (!user) {
          return null;
        }

        // Protege contra user.senha ser null (campo opcional no schema)
        if (!user.senha) return null;

        const isPasswordValid = await bcrypt.compare(credentials.senha, user.senha);
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id.toString(),
          name: user.nome, // Mapeia nome do DB para name da sessão
          email: user.email,
          image: user.imagem, // Mapeia imagem do DB para image da sessão
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // O `user` object só está disponível no primeiro login
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }

      // Se a sessão for atualizada (ex: troca de imagem), atualize o token
      if (trigger === "update" && session?.user?.image) {
        token.image = session.user.image;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Redireciona para sua página de login
  },
  secret: process.env.NEXTAUTH_SECRET, // Chave secreta para JWT
};
