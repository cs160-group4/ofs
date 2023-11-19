"use client"
import Link from "next/link"
import { notFound } from "next/navigation";
import { useEffect, useState } from "react"

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

// An example of how to get user's session data using client side rendering

export default function Page() {
    notFound();
    // const [data, setData] = useState()
    // useEffect(() => {
    //     fetch("/api/auth/session").then((res) => res.json()).then((data) => setData(data))
    // }, [])


    // return (
    //     <div className="space-y-2  flex flex-col items-center">
    //         <h1 className="text-3xl font-bold">Get user&apos;s session data</h1>
    //         <pre>
    //             <code>{JSON.stringify(data, null, 2)}</code>
    //         </pre>
    //     </div>
    // )
    return (<>  </>)
}