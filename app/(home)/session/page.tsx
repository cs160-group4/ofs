import { getAuthSession } from "@/api/auth/[...nextauth]/options";
import { NextApiRequest } from "next";
import { notFound } from "next/navigation";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

// An example of how to get user's session data using server side rendering

export default async function SessionPage() {
    // const session = await getAuthSession();
    notFound();
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