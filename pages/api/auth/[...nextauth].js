import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
          style: { marginBottom: "1.5rem" },
        },
      },

      async authorize(credentials) {
        const db = (await connectDB).db("paintings_shop");
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });
        if (!user) {
          console.log("This user does not exist.");
          return null;
        }

        const passwordCheck = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!passwordCheck) {
          console.log("Password doesn't match.");
          return null;
        }
        return user;
      },
    }),

    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),

    // issue = this document requires 'trustedscript' assignment.
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
        token.user.image = user.image;
        token.user.mileage = user.mileage;
        token.user.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  adapter: MongoDBAdapter(connectDB),
};

export default NextAuth(authOptions);
