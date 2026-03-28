import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";
import { signInSchema } from "@/utils/userSchema";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        try {
          let user = null;
          const { email, password } =
            await signInSchema.parseAsync(credentials);
          if (!email) return null;
          user = await prisma.user.findUnique({
            where: {
              email,
            },
          });
          if (!user || !user.password) return null;
          const validUser = await bcrypt.compare(password, user.password!);
          if (validUser) return user;
          return null;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email },
        });
        session.user.id = dbUser?.id ?? (token.id as string);
      }
      return session;
    },
  },
});
