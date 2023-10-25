import NextAuth from "next-auth";
import { User } from "@/lib/users";
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultSession['user'] & {
      role: string;
    };
  }
  interface User {
    role?: string
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     /** The user's role. */
//     role?: string;
//   }
// }
