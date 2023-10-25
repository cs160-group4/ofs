"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Page() {
    const [data, setData] = useState()
    useEffect(() => {
        fetch("/api/sessions").then((res) => res.json()).then((data) => setData(data))
    }, [])
    return (
        <div className="space-y-2  flex flex-col items-center">
            <h1 className="text-3xl font-bold">Get user&apos;s session data</h1>
            <pre>
                <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
        </div>
    )
}