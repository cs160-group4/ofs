import { getAuthSession } from "@/api/auth/[...nextauth]/options";
import { NextApiRequest } from "next";
export default async function IndexPage(req:NextApiRequest) {
    const session = await getAuthSession();
    return (
        <>
        <div className="space-y-2  flex flex-col items-center">
            <h1 className="text-3xl font-bold">Get user&apos;s session data</h1>
            <pre>
                <code>{JSON.stringify(session, null, 2)}</code>
            </pre>
        </div>
        </>
    )
}