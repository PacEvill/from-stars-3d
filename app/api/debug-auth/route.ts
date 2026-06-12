import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const results: Record<string, unknown> = {};

  // Check env vars (without revealing secrets)
  results.NEXTAUTH_URL = process.env.NEXTAUTH_URL || '(not set)';
  results.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ? '✅ set' : '❌ missing';
  results.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ? '✅ set' : '❌ missing';
  results.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ? '✅ set' : '❌ missing';
  results.DATABASE_URL = process.env.DATABASE_URL ? '✅ set' : '❌ missing';
  results.VERCEL_URL = process.env.VERCEL_URL || '(not set)';

  // Test DB connection
  try {
    const count = await prisma.usuario.count();
    results.db_connection = '✅ connected';
    results.db_user_count = count;
  } catch (error: any) {
    results.db_connection = '❌ failed';
    results.db_error = error.message;
  }

  return NextResponse.json(results, { status: 200 });
}
