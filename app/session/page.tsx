import { getAuthSession } from "@/api/auth/[...nextauth]/options";

export default async function IndexPage() {
    const session = await getAuthSession();
    return (
        <>

        <div>
            <h1>Session</h1>
            <p>Session data</p>
            <pre>{JSON.stringify(session, null)}</pre>
        </div>
        
        </>
    )
}