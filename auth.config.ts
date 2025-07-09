// auth.config.ts
import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import postgres from "postgres";
import { z } from "zod";

// Extending the NextAuth User and Session types to include `icon`
declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    image: string;
    wins: number;
    losses: number;
    ties: number;
  }

  interface Session {
    user: User;
  }
}

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Benutzername", type: "text" },
        password: { label: "Passwort", type: "password" },
      },
      async authorize(credentials) {
        // Input validation with clear error messages
        const parsed = z
          .object({
            username: z.string().min(1, "Benutzername darf nicht leer sein."),
            password: z.string().min(1, "Passwort darf nicht leer sein."),
          })
          .safeParse(credentials);

        if (!parsed.success) {
          throw new Error("Ungültige Eingabedaten. Bitte fülle alle Felder aus.");
        }

        const { username, password } = parsed.data;

        // Fetch user from the database
        const users = await sql`
          SELECT * FROM users WHERE username = ${username}
        `;
        const user = users[0];

        if (!user) {
          throw new Error("Benutzer existiert nicht.");
        }

        // Validate password
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new Error("Falsches Passwort.");
        }

        // Successful login
        return { id: user.id, name: user.username, image: user.image, wins: user.wins, losses: user.losses, ties: user.ties };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session?.user) {
        token.id = session.user.id;
        token.name = session.user.name;
        token.image = session.user.image;
        token.wins = session.user.wins;
        token.losses = session.user.losses;
        token.ties = session.user.ties;
        return token;
      } 
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.image = user.image;
        token.wins = user.wins;
        token.losses = user.losses;
        token.ties = user.ties;
      }
      return token;

    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
        session.user.wins = token.wins as number;
        session.user.losses = token.losses as number;
        session.user.ties = token.ties as number;
      }
      return session;
    },
  },

  pages: {
  },

  secret: process.env.NEXTAUTH_SECRET,
};
