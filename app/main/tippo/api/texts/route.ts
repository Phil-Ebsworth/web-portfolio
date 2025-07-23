import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  const texts = await sql`
    SELECT slug, title FROM texts ORDER BY created_at DESC
  `;
  return NextResponse.json(texts);
}