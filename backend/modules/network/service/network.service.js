import { devices } from "../database/network.db.js"


//function to expose devices in backend to frontend
export function exposeDevices (){
   return devices;
}




// function to locate device sending ping
export async function findPingingDevice (sourceIp){
    return devices.find((device)=>(device.ip == sourceIp))
}

// function to do our arp sequence between a source device and a requested device
export async function arpRequest(sourceDevice,destinationIP) {
   const destinationDevice = devices.find(
     (device) => device.ip === destinationIP
   ); //find the destination device object within the devices array, where my devices ip matches my destinationIP address 
// If Recepient device doesn't exist within our sub-network
if (!destinationDevice){
  return (console.log("Requested ARP recepient Device not in Sub-Network, Please Check IP Address"))
}
// Updating Arp table of source device
    sourceDevice.arp.push({
    mac:destinationDevice.mac,ip:destinationDevice.ip
   }
)

  return {sourceDevice,destinationDevice}
}


