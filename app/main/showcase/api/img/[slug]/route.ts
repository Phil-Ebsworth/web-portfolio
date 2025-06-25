import postgres from 'postgres';
import { NextRequest, NextResponse } from 'next/server';

const sql = postgres(process.env.Postgres_URL!, { ssl: 'require' });

export async function GET(
    req: NextRequest,
    {params}: { params: Promise<{ slug: string }>}) {
    const slug = (await params).slug;
    try {
        const result = await sql`SELECT url, title, description, category, created_at, prompt FROM images WHERE slug = ${slug}`;
        if (result.length === 0) {
            return NextResponse.json({ error: "Bild nicht gefunden" }, { status: 404 });
        }
        return NextResponse.json(result[0], { status: 200 });
    } catch (err) {
        console.error("Fehler beim Abrufen des Bildes:", err);
        return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
    }
}
