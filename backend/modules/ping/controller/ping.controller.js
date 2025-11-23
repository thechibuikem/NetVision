import { devices } from "../../network/database/network.db.js";

// controller to send ping
export async function ping(req, res) {
  const { sourceName, destinationName } = req.body;

  // find sourceDevice
  const sourceDevice = devices.find((device) => device.deviceName === sourceName);
  if (!sourceDevice) {
    // return res.status(404).json({ error: "Source device not found" });
    return res.json({ error: "Source device not found" });
  }

  // find receivingDevice
  const destinationDevice = devices.find((device) => device.deviceName === destinationName);
  if (!destinationDevice) {
    // return res.status(404).json({ error: "Destination device not found" });
    return res.json({ error: "Destination device not found" });
  }

  await sourceDevice.ping(destinationDevice.ip); //the ping process itself
  res.json({ status: 200, message: "Ping process complete" });
}
