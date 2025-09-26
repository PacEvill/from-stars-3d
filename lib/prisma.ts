<<<<<<< HEAD
import { PrismaClient } from '@prisma/client';

// Em ambiente de desenvolvimento, o hot-reloading pode criar múltiplas instâncias do PrismaClient,
// levando ao esgotamento de conexões com o banco de dados. Este código evita isso.
declare global {
  // Permite que a variável `prisma` seja acessada globalmente.
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = client;
}

export default client;
=======
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
>>>>>>> e49773a9c7187248936ff0f570a2e0ad5af17ab1
