import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma"; // Import from lib/prisma
import bcrypt from "bcryptjs"; // Para comparar senhas

import { authOptions } from './authOptions'

// authOptions is defined in a separate module to avoid exporting named values from a route file
// which Next treats as Route exports. The handler below uses the imported options.

const handler = NextAuth(authOptions)
 = NextAuth(authOptions);

export { handler as GET, handler as POST };