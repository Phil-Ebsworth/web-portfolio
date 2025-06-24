// /api/tabs/[slug]/route.ts

import postgres from 'postgres';
import { NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(
  request: Request,
  context: { params: { slug: string } }
) {
  const slug = decodeURIComponent(context.params.slug);

  try {
    const result = await sql`
  SELECT * FROM tabs
  WHERE slug = ${slug}
`;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
