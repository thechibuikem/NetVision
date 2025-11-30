import { broadcast } from "../../../server.js";
import { devices } from "../database/network.db.js"


//function to expose devices in backend to frontend
export function exposeDevices (){
   return devices;
}

// function to do our arp sequence
export async function arpRequest(sourceDevice,destinationIP) {
  const destinationDevice = devices.find(
    (device) => device.ip === destinationIP
  ); //find the destination device object
  // If Recepient device doesn't exist within our network
  if (!destinationDevice) {
    return console.log(
      "Requested ARP recepient Device not in Sub-Network, Please Check IP Address"
    );
  }
  // Updating Arp table of source device
  sourceDevice.arpTable.push({
    mac: destinationDevice.mac,
    ip: destinationDevice.ip,
  });
  //broadcast changes to front-end
  broadcast({ type: "devices", devices: devices });
  return { sourceDevice, destinationDevice };
}

// Switch Mac Learning
export async function learnMac(sourceDevice) {

const homeSwitch = devices.find((device)=>device.type == "switch" && device.lanSegment === sourceDevice.lanSegment) 


const isMacEntry = homeSwitch.macTable.find((entry)=>entry.mac === sourceDevice.mac)

if (isMacEntry)return//end here if this entry is already on our mac table

  // Updating Arp table of source device
  homeSwitch.macTable.push({
    mac: sourceDevice.mac,
    interface: sourceDevice.networkInterface,
  });
  // broadcast changes to frontend

  broadcast({
    type:"devices",
    devices:devices
  })
}

