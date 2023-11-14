import MapComponent from "@/components/MapComponent";
import { getOrdersWithAddresses } from "@/lib/orders";
export default async function MapTest() {
    const list = await getOrdersWithAddresses();
    return (
        <>
            <div>
                <h1>Map with routing</h1>
                <MapComponent  list={list}/>
            </div>
        </>
    );
}
