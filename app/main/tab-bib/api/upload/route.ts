import { NextRequest, NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')  // Sonderzeichen entfernen
    .replace(/\s+/g, '-')          // Leerzeichen durch Bindestriche ersetzen
    .replace(/-+/g, '-')           // doppelte Bindestriche vermeiden
    .replace(/^-+|-+$/g, '');      // führende/trailing Bindestriche entfernen
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'Keine Datei empfangen.' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const pdfDir = path.join(process.cwd(), 'public', 'pdf');
  if (!existsSync(pdfDir)) {
    await mkdir(pdfDir, { recursive: true });
  }

  const fileName = file.name.replace(/\s+/g, '-').toLowerCase();
  const filePath = path.join(pdfDir, fileName);
  await writeFile(filePath, buffer);

  const title = file.name.replace(/\.pdf$/i, '');
  const slug = generateSlug(title);
  const pdf_url = `/pdf/${fileName}`;

  await sql`
    INSERT INTO tabs (title, artist, tab_data, pdf_url, slug)
    VALUES (${title}, '', '', ${pdf_url}, ${slug})
  `;

  return NextResponse.json({ message: 'PDF hochgeladen', pdf_url, title, slug });
}
