import postgres from "postgres";
import { NextResponse } from "next/server";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
    try {
        const result = await sql`
            SELECT id, name, slug, description, image_url, ingredients, instructions
            FROM cocktails
            `;
        return NextResponse.json(result);
    } catch (err) {
        console.error("Fehler beim Abrufen der Cocktails:", err);
        return NextResponse.json({error: "Serverfehler"}, { status: 500 });
    }
}