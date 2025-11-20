import {exposeDevices } from "./network.db.js"
export function getDevices (req,res){

   const retrievedDevices = exposeDevices()

    if (!retrievedDevices) {
      res.send(`No devices found ${retrievedDevices}`);
    }

    res.json({
      message: "Devices retrieved successfully",
      devices: retrievedDevices,
    });
}