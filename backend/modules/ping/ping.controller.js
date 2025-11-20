import { devices } from "../network/network.db.js";

export async function ping(req, res) {
  const { sourceIp, destinationIp } = req.body;


// find sourceDevice
const sourceDevice = devices.find(device => device.ip === sourceIp)
  if (!sourceDevice) {
    return res.status(404).json({ error: "Source device not found" });
  }

await sourceDevice.ping(destinationIp)//the ping process itself
res.json({ status: 200, message: "Ping process complete" });

}
