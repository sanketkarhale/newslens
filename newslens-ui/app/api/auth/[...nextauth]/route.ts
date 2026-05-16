import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email or Mobile", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.email },
              { mobile: credentials.email }
            ]
          }
        });

        // Auto-register logic for the demo (if user not found, create them)
        if (!user) {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const isEmail = credentials.email.includes('@');
          const newUser = await prisma.user.create({
            data: {
              email: isEmail ? credentials.email : null,
              mobile: !isEmail ? credentials.email : null,
              password: hashedPassword,
              name: credentials.email.split('@')[0]
            }
          });
          return newUser;
        }

        if (user && user.password) {
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (isValid) {
            return user;
          }
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_local_dev_only",
});

export { handler as GET, handler as POST };
