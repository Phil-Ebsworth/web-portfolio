// lib/db.ts
import { Client } from 'pg';

// Die Umgebungsvariable DATABASE_URL enthält die Verbindung zu Neon PostgreSQL.
const client = new Client({
  connectionString: process.env.DATABASE_URL,  // Die Umgebungsvariable in .env
});

client.connect();

export default client;
