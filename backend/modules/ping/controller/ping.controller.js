import { devices, pcs } from "../../network/database/network.db.js";
import { checkDevice } from "../utils/checkIp.js";

// controller to send ping
export async function ping(req, res) {
  const { sourceName, destinationName } = req.body;
  //flags for invalid pc names
  const isSourceDevice = checkDevice(sourceName);
  const isDestinationDevice = checkDevice(destinationName);


console.log("issourceDevice: ", isSourceDevice, "\nisDestinationDevice",isDestinationDevice);

  //check if source and destination pcs exist
  if (isSourceDevice && isDestinationDevice) {
    //find receivin device
    const sourceDevice = devices.find(
      (device) => device.deviceName === sourceName
    );
    //flag for source device
    if (!sourceDevice) {
      return res.json({ error: " Please enter valid to-match device names" });
    }

    // find receivingDevice
    const destinationDevice = devices.find(
      (device) => device.deviceName === destinationName
    );
    //flag for destination device
    if (!destinationDevice) {
      return res.status(404).json({ error: "Destination device not found" });
    }
//ping
    await sourceDevice.ping(destinationDevice.ip); //the ping process itself
      return res.status(200).json({ type: "success" });
  }
    else {
    return res.json({ error: "Please enter valid to-match PC names" });
    }

  }

