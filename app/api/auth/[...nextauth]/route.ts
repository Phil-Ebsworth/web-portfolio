// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authConfig } from "auth.config"; // Pfad anpassen

export const { handlers } = NextAuth(authConfig);
export const GET = handlers.GET;
export const POST = handlers.POST;
