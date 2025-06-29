// auth.config.ts
import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import postgres from "postgres";
import { z } from "zod";

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
        return { id: user.id, name: user.username };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/main/auth/login", // Ensure this has a leading slash
  },

  secret: process.env.NEXTAUTH_SECRET,
};
