// File: pages/api/userEndpoint.js

import { getOrdersWithAddressesByUserId } from 'path-to-your-orders-module';

export default async function handler(req, res) {
    const userId = req.query.userId;

    try {
        const ordersWithAddresses = await getOrdersWithAddressesByUserId(userId);

        if (ordersWithAddresses.length > 0) {
            const sortedOrders = ordersWithAddresses.sort((a, b) => b.orders.id - a.orders.id);
            const latestOrderAddress = sortedOrders[0].addresses;

            if (latestOrderAddress.latitude && latestOrderAddress.longitude) {
                res.status(200).json({ latitude: latestOrderAddress.latitude, longitude: latestOrderAddress.longitude });
            } else {
                res.status(404).json({ message: 'Location data not found for the latest order.' });
            }
        } else {
            res.status(404).json({ message: 'No orders found for the user.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
