import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const userId = (await params).id;

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        const result = await sql`SELECT id, username, icon FROM users WHERE id = ${userId}`;
        const user = result[0]; // Postgres result is usually an array

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error(error); // Log for debugging
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const userId = (await params).id;
    const body = await req.json();

    if (!userId || !body.icon) {
        return NextResponse.json({ error: 'User ID and icon are required' }, { status: 400 });
    }

    try {
        const result = await sql`
            UPDATE users
            SET icon = ${body.icon}
            WHERE id = ${userId}
            RETURNING id; 
        `;

        if (result.length === 0) {
            return NextResponse.json({ error: 'User not found or update failed' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error during update:", error);  // Log the full error message
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

