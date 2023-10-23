import { getServerSession } from "next-auth/next"

export default async function IndexPage() {
    const session = await getServerSession()
    return (
        <div>
            <h1>Session</h1>
            <p>Session data</p>
            <pre>{JSON.stringify(session, null)}</pre>
        </div>
    )
}