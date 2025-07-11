import postgres from 'postgres';
import { NextRequest, NextResponse } from 'next/server';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }>}
)
{
    const slug = (await params).slug;

    try {
        const result = await sql`
            SELECT id, title, slug, description, cocktails, image_url FROM specials WHERE slug = ${slug}
        `;

        if (result.length === 0) {
            return NextResponse.json({ error: 'Special not found' }, { status: 404 });
        }

        return NextResponse.json(result[0]); // Einzelnes Special zurückgeben
    } catch (error){
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
