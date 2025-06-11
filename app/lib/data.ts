import postgres from 'postgres';
import { Project, } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchProjects() {
    try {
        const data = await sql<Project[]>`SELECT * FROM projects`;
        return data;
    } catch (error) {
        console.error('Database Error: ', error);
        throw new Error('Failed to fetch projects data.');
    }
}
