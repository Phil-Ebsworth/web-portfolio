import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const userId = (await params).id;
    const body = await req.json();

    // Ensure that the userId is present and at least one field (image, name, etc.) is provided in the body
    if (!userId || Object.keys(body).length === 0) {
        return NextResponse.json({ error: 'User ID and at least one field (e.g., image, name) are required' }, { status: 400 });
    }

    // Construct the SQL query dynamically
    const fieldsToUpdate: string[] = [];
    const queryParams: any[] = [];

    // Dynamically build the update set part of the query
    if (body.image) {
        fieldsToUpdate.push(`image = $${queryParams.length + 1}`);
        queryParams.push(body.image);
    }

    if (body.name) {
        fieldsToUpdate.push(`username = $${queryParams.length + 1}`);
        queryParams.push(body.name);
    }

    // Check if there are any fields to update
    if (fieldsToUpdate.length === 0) {
        return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    // Combine the fields into the query string
    const query = `
        UPDATE users
        SET ${fieldsToUpdate.join(', ')}
        WHERE id = $${queryParams.length + 1}
        RETURNING id;
    `;
    queryParams.push(userId);

    try {
        // Execute the query
        const result = await sql.unsafe(query, queryParams);

        if (result.length === 0) {
            return NextResponse.json({ error: 'User not found or update failed' }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error during update:", error);  // Log the full error message
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
