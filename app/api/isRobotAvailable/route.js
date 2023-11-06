import { getRobot } from "@/lib/robots";  // Import your existing getRobot function

export default async (req, res) => {
    const { robotId } = req.query;
    const robot = await getRobot(robotId);

    res.json({ isAvailable: robot.status === 'available' });
};
