"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Page() {
    const [data, setData] = useState()
    useEffect(() => {
        fetch("/api/sessions").then((res) => res.json()).then((data) => setData(data))
    }, [])


    const [isDisabled, setIsDisabled] = useState(true);
  

    function clickButton() {
       let drawer = document.getElementById("myDrawer") as HTMLInputElement;
         if (drawer) {
              drawer.click();
         }
    }

    return (
        <div className="space-y-2  flex flex-col items-center">
            <h1 className="text-3xl font-bold">Get user&apos;s session data</h1>
            <pre>
                <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
            <button onClick={clickButton} >Click</button>
            
            <div className="drawer drawer-end">
                    <input id="myDrawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Open drawer</label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            {/* Sidebar content here */}
                            <li><a>Sidebar Item 1</a></li>
                            <li><a>Sidebar Item 2</a></li>
                        </ul>
                    </div>
                </div>
        </div>



    )
}