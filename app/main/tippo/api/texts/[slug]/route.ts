import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  console.log('Requested slug:', params.slug);
  const result = await sql`
    SELECT title, content FROM texts WHERE slug = ${params.slug} LIMIT 1
  `;

  if (result.length === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(result[0]);
}
