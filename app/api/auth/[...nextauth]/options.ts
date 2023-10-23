import { db } from "@/db/db";
import { authenticate } from "@/lib/users";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions as NextAuthConfig } from "next-auth";

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials, req) {
        if (typeof credentials == "undefined") {
          return null;
        }
        const res = await authenticate(credentials.email, credentials.password);
        if (!res) {
          return res;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        // console.log(profile);
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: "user",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Add role to the token right after signin
      if (user) {
        token.role = user.role;
      }

      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.role = token.role;
      console.log(session);
      return session;
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
  },
};
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
export const getAuthSession = () => getServerSession(authOptions);
