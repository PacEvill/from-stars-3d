import fs from 'node:fs';
import path from 'node:path';

const envPath = path.resolve(process.cwd(), '.env.local');

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split(/\r?\n/);
  const parsed = {};

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    parsed[key] = value;
  }

  return parsed;
}

function isPlaceholder(value = '') {
  const candidates = ['changeme', 'USER', 'PASSWORD', 'HOST', 'DATABASE'];
  return candidates.some((token) => value.includes(token));
}

async function main() {
  const envFile = readEnvFile(envPath);

  const required = [
    'DATABASE_URL',
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
  ];

  const missing = [];
  for (const key of required) {
    const value = process.env[key] || envFile[key];
    if (!value || isPlaceholder(value)) missing.push(key);
  }

  if (missing.length > 0) {
    console.error('Preflight falhou: variáveis obrigatórias ausentes/placeholder em .env.local');
    for (const key of missing) {
      console.error(`- ${key}`);
    }
    process.exit(1);
  }

  process.env.DATABASE_URL = process.env.DATABASE_URL || envFile.DATABASE_URL;

  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    await prisma.$queryRaw`SELECT 1`;
    await prisma.$disconnect();
    console.log('Preflight OK: ambiente e conexão com banco válidos.');
  } catch (error) {
    console.error('Preflight falhou: não foi possível conectar ao banco.');
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
