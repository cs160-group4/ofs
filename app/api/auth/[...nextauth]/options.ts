import { db } from "@/db/db";
import { authenticate, getUserRole } from "@/lib/users";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { randomBytes, randomUUID } from "crypto";
import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
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
      async authorize(credentials) {
        if (typeof credentials == "undefined") {
          return null;
        }
        const res = await authenticate(credentials.email, credentials.password);
        console.log("------------------ authenticate ------------------");
        console.log(res);
        // Return null if user data could not be retrieved
        return res;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          emailVerified: new Date(),
          image: profile.avatar_url,
          role: profile.role ?? "user",
        };
      },
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours

    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log("\n\n\n\n\n------------------ signIn ------------------");
      console.log("User:\n", user);
      console.log("Account:\n", account);
      return true;
    },
    async jwt({ token, user }) {
      // if (user) {
      //   console.log("---------- Set user role ----------");

      // }
      token.role = await getUserRole(token?.sub!);
      console.log("\n\n--------- jwt ---------");
      console.log("Token:\n", token);
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      console.log("------------------ Session ------------------");
      console.log("Session:\n", session);
      return session;
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
  },
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/register", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

export const getAuthSession = () => getServerSession(authOptions);
