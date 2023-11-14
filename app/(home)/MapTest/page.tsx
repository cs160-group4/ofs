'use client'
import React, { useEffect, useState } from 'react';
import MapComponent from '@/components/MapComponent';
import { getOrdersWithAddressesByUserId } from "@/lib/orders"; // import your function

const MapPage = () => {
    const [startPoint, setStartPoint] = useState<[number, number]>([0, 0]);
    const [endPoint, setEndPoint] = useState<[number, number]>([0, 0]);
    const userId = "user123";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orders = await getOrdersWithAddressesByUserId(userId);
                if (orders.length > 0) {
                    const latestOrder = orders[0];

                    setEndPoint([latestOrder.addresses.longitude, latestOrder.addresses.latitude]);

                    setStartPoint([37.3352, -121.8811]); // Example start point
                }
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <div>
            <MapComponent startPoint={startPoint} endPoint={endPoint} />
        </div>
    );
};

export default MapPage;
