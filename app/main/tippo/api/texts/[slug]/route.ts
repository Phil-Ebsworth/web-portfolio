import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(
  req: NextResponse, 
  { params }: { params: { slug: string } }) 
  {
  const slug = (await params).slug;

  if (!slug) {
    return NextResponse.json({ error: 'slug required' }, { status: 400})
  }
  const result = await sql`
    SELECT title, content FROM texts WHERE slug = ${slug} LIMIT 1
  `;

  if (result.length === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(result[0]);
}
