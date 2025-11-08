import { logEvent } from "../logs/logs.service.js";
import { devices } from "../network/network.db.js";
import { arpRequest, findPingingDevice, } from "../network/network.service.js";

// business logic for the ping
export async function pingService(sourceIP, destinationIP){
  const pingingDevice = await findPingingDevice(sourceIP); // first find device sending ping on our devices array, we call ping device

  await sendPing(pingingDevice,destinationIP,0,4)
}

async function sendPing(pingingDevice,destinationIp,round,limit) {
  //base recursive condition
  if (round>limit){
    console.log("new source device: \n", pingingDevice);
    console.log('ping process complete \n')
    return
  }//loop guard to stop our recursion

  else{
    //ARP REQUEST
    if (!pingingDevice.arp.find((entry)=>(entry.ip == destinationIp)))//check arp table to see if there's no entry that holds for our IP
    {
      console.log(`ping ${round} insuccessful \n`)
      // use log function
      await logEvent(
        "ARP Request",
        pingingDevice,
        destinationIp,
        "Layer 2 - Data Link",
        `Who has ${destinationIp}? Tell ${pingingDevice} \n`
      );
    await arpRequest(pingingDevice,destinationIp)
      round++,
     await sendPing(pingingDevice,destinationIp,round,limit)
    }

    //ICMP REQUEST
    else{
      console.log(`ping ${round} successful \n`);

const receivingDevice = pingingDevice.arp.find(device=>device.ip == destinationIp)//retrieve the receiving device, we'd send ICMP messages to

      // use log function
      await logEvent(
        "ICMP ECHO",
        pingingDevice,
        destinationIp,
        "Layer 3 - Network",
        `ICMP Echo ${pingingDevice.mac}? to ${receivingDevice.mac} \n`
      );

      round++, await sendPing(pingingDevice, destinationIp, round, limit);
    }
  }
  }