import { devices } from "./network.db.js"

// function to locate device sending ping
export async function findPingingDevice (sourceIp){
    return devices.find((device)=>(device.ip == sourceIp))
}

// function to do our arp sequence between a source device and a requested device
export async function arpRequest(sourceDevice,destinationIP) {
   const destinationDevice = devices.find(
     (device) => device.ip === destinationIP
   ); //find the destination device object within the devices array, where my devices ip matches my destinationIP address 

    sourceDevice.arp.push({
    mac:destinationDevice.mac,ip:destinationDevice.ip
   }
)

  return {sourceDevice,destinationDevice}
}


//function to send our ICMP request

