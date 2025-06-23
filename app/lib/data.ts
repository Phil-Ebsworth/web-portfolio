import postgres from 'postgres';
import { Project, } from './definitions';
import fs from 'fs/promises';
import path from 'path';

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

export async function fetchProjectsFromJson() {
    try {
        const filePath = path.join(process.cwd(), 'app', 'data', 'projects.json');
        const fileContents = await fs.readFile(filePath, 'utf-8');
        const projects: Project[] = JSON.parse(fileContents);
        return projects;
    } catch (error) {
        console.error('File Read Error: ', error);
        throw new Error('Failed to fetch projects from JSON.');
    }
}
