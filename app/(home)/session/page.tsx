import { getAuthSession } from "@/api/auth/[...nextauth]/options";
import { NextApiRequest } from "next";
export default async function SessionPage() {
    const session = await getAuthSession();
    return (
        <>
            {/* <div className="space-y-2  flex flex-col items-center">
                <h1 className="text-3xl font-bold">Get user&apos;s session data</h1>
                <pre>
                    <code>{JSON.stringify(session, null, 2)}</code>
                </pre>

                <div className="drawer drawer-end">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Open drawer</label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            <li><a>Sidebar Item 1</a></li>
                            <li><a>Sidebar Item 2</a></li>
                        </ul>
                    </div>
                </div>
            </div> */}
        </>
    )
}