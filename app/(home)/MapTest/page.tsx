// import MapComponent from "@/components/MapComponent";
import { getAuthSession } from "@/api/auth/[...nextauth]/options";
import { getOrdersWithAddressesByUserId } from "@/lib/orders";

/*
  Author: Nandish Kumar
  Email: nandish.kumar@sjsu.edu
  Copyright (c) 2023 Nandish Kumar. All rights reserved.
*/

export default async function MapTest() {
    let signedIn = false;
    let name = '';
    let id = '';

    const session = await getAuthSession();
    if (session?.user) {
        signedIn = true;
        name = typeof session.user.name === 'string' ? session.user.name : '';
        id = typeof session.user.id === 'string' ? session.user.id : '';
    }

    if (!id) {
        // Handle the scenario where the ID is not available
        console.error('User ID is undefined.');
        return;
    }

    try {
        const list = await getOrdersWithAddressesByUserId(id);
        return (
            <>
                <div>
                    <h1>Map with routing</h1>
                    {/* <MapComponent list={list}/> */}
                </div>
            </>
        );
    } catch (error) {
        console.error('Error fetching orders:', error);
        // Return an error component or handle the error appropriately
    }
}
