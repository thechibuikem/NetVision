import { exposeDevices } from "../service/network.service.js";

// controller that uses Expose Devices service
export function getDevices (req,res){

  // using exposeDevices service to retrieve devices db
   const retrievedDevices = exposeDevices()

    if (!retrievedDevices) {
      res.send(`No devices found ${retrievedDevices}`);
    }

    res.json({
      message: "Devices retrieved successfully",
      devices: retrievedDevices,
    });
}