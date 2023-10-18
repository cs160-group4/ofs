import { AuthOptions, getServerSession } from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db/db"
import { authenticate } from "@/lib/users"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"

export const authOptions: AuthOptions = {
    // adapter: DrizzleAdapter(db),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" }
            },
            async authorize(credentials, req) {
                if (typeof credentials == "undefined") {
                    return null;
                }
                const res = await authenticate(credentials.email, credentials.password);
                if (!res) {
                    return res
                }
                // Return null if user data could not be retrieved
                return null
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: profile.role ?? 'user',
                }
            }
        }),
    ],
    session: { strategy: "jwt" },
    jwt: {
        secret: process.env.JWT_SECRET as string,
    },
}
export const getAuthSession = () => getServerSession(authOptions)