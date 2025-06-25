import postgres from "postgres";
import { NextResponse } from "next/server";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
    try {
        const result = await sql`
            SELECT id, title, url, description, slug, category, created_at, prompt
            FROM images
            `;
        return NextResponse.json(result);
    } catch (err) {
        console.error("Fehler beim Abrufen der Bilder:", err);
        return NextResponse.json({error: "Serverfehler"}, { status: 500 });
    }
}