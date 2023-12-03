import prisma from "@/prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import NextAuth, { User as NextAuthUser } from 'next-auth'
interface NextAuthUserWithStringId extends NextAuthUser {
id: string
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
};