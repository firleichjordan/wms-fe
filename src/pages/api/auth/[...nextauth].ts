import { compare } from "bcrypt";
import { authServices } from "@/services/auth";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { data }: any = credentials as {
          email: string;
          password: string;
        };

        const user: any = await authServices.signIn(data);

        console.log(user);

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("username" in token) {
        session.user.username = token.username;
      }
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("role" in token) {
        session.user.email = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
