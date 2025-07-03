// auth.config.ts
import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import postgres from "postgres";
import { z } from "zod";
import { DefaultSession } from "next-auth";

// Extending the NextAuth User and Session types to include `icon`
declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    image?: string;
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
        return { id: user.id, name: user.username, image: user.image };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session?.user) {
        token.id = session.user.id;
        token.name = session.user.name;
        token.image = session.user.image || "/icons/star.png";
        return token;
      } 
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.image = user.image;
      }
      return token;

    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string || "/icons/star.png";
      }
      return session;
    },
  },

  pages: {
    signIn: "/main/auth/login", // Ensure this has a leading slash
  },

  secret: process.env.NEXTAUTH_SECRET,
};
