import { getAuthSession } from "@/api/auth/[...nextauth]/options";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt"
export default async function IndexPage(req:NextApiRequest) {
    const session = await getAuthSession();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    return (
        <>
        <div>
            <h1>Token</h1>
            <p>Token data</p>
            <pre>{JSON.stringify(token, null)}</pre>
        </div>
        <div>
            <h1>Session</h1>
            <p>Session data</p>
            <pre>{JSON.stringify(session, null)}</pre>
        </div>
        
        </>
    )
}