import { updateRobot, updateOrder } from "@/lib/robots"; // Import your existing functions

export default async (req, res) => {
    const { robotId, orderIds } = req.body;

    // Mark robot as busy
    await updateRobot(robotId, { status: 'busy' });

    // Mark orders as shipped
    await Promise.all(orderIds.map(id => updateOrder(id, { deliveryStatus: 'shipped' })));

    res.json({ success: true });
};
