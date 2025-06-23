import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { projects } from '@/lib/temp-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedProjects() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      content TEXT NOT NULL,
      image_url VARCHAR(255) NOT NULL,
      link VARCHAR(255) NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    projects.map(async (project) => {
      return sql`
        INSERT INTO projects (id, title, description, content, image_url, link)
        VALUES (${project.id}, ${project.title}, ${project.description}, ${project.content}, ${project.image_url}, ${project.link})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}


export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedProjects(),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
