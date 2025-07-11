import {NextRequest, NextResponse} from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(
    req: NextRequest
){
    try {
        const result = await sql`
            SELECT id, title, slug, description, cocktails, image_url FROM specials
        `;

        if (result.length === 0) {
            return NextResponse.json({ error: 'No specials found' }, { status: 404 });
        }

        return NextResponse.json(result); // Alle Specials zurückgeben
    } catch (error) {
        console.error('[API ERROR]:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}