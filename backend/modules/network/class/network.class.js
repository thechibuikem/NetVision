import { logEvent } from "../../logs/service/logs.service.js"; //reporter function to send reports of events to front-end
import { arpRequest, learnMac } from "../service/network.service.js";
import { animateICMPEvent } from "../../animatePacket/service/animatePacket.service.js";
import { devices } from "../database/network.db.js";
import { animateARPEvent } from "../../animatePacket/service/animatePacket.service.js";

 //root class of networking devices in out system that we'll use to create other classes
export class Device {
  constructor(deviceName, mac, type) {
    this.deviceName = deviceName;
    this.mac = mac;
    this.type = type;
  }
}
//Pc class
export class PC extends Device {
  constructor(
    deviceName,
    mac,
    arpTable = [],
    ip,
    networkInterface,
    lanSegment
  ) {
    super(deviceName, mac, "pc");
    this.arpTable = arpTable;
    this.ip = ip;
    this.networkInterface = networkInterface;
    this.lanSegment = lanSegment;
  }

  //function to send route for icmp animation
  async animateICMP (destinationIP) {
    const destinationDevice = devices.find(
      (device) => device.ip == destinationIP
    );
    await animateICMPEvent(this, destinationDevice);
  }

  //function to send route for arp animation
  async animateARP (destinationIP) {
    const destinationDevice = devices.find(
      (device) => device.ip == destinationIP
    );
    animateARPEvent(this, destinationDevice);
  }

  // function for devices to log
  async log (actionType,sourceMac, targetIP, layer) {
    await logEvent(actionType, sourceMac, targetIP, layer);
  }

  //send ping method
  async ping (destinationIP, round = 1, limit = 4) {
    let isPinging = false //flag to check if there's an ongoing ping
    //base recursive condition
    if (round > limit) {
      console.log("ping process complete \n");
      return;
    } else {
  
      learnMac(this)//teach our switch about this device 

      //check if our pc knows our destination device
      const receivingDevice = this.arpTable.find(
        (entry) => entry.ip === destinationIP
      );
      //===== If recieving device is absent on source devices ARP table====
      if (!receivingDevice) {
        // console.log(` ping ${round} insuccessful`);
        // log arp request
        await this.log(
          "ARP Request",
          this.mac,
          destinationIP,
          "Layer 2 - Data Link"
        );
        //arp reply log
        setTimeout(() => {
          this.log(
            "ARP Reply",
            this.mac,
            destinationIP,
            "Layer 2 - Data Link",
          );
        }, 4000);

        
//sending arp request
        await arpRequest(this, destinationIP); // send ARP request out to complete a round
        setTimeout(() => {
          this.animateARP(destinationIP);
        }, 1000);
        setTimeout(async () => {
          await this.ping(destinationIP, round + 1, limit);
        }, 8000);
      }

      //=====ICMP ========
      else {
        console.log(` ping ${round} successful`);
        // setTimeout(async () => {
          await this.log(
            "ICMP Request",
            this.mac,
            destinationIP,
            "Layer 3 - Network",
          );
    

        //icmp reply log
        setTimeout(() => {
          this.log(
            "ICMP Reply",
            this.mac,
            destinationIP,
            "Layer 2 - Data Link",
          );
        }, 3500);


        setTimeout(() => {
          this.animateICMP(destinationIP);
        }, 1000);

        setTimeout(async () => {
          await this.ping(destinationIP, round + 1, limit);
        }, 6000);
      }
    }
  }

} 
 //Switch Class
export class Switch extends Device {
  constructor(deviceName, mac, macTable = [], ip, networkInterface, lanSegment) {
    super(deviceName, mac, "switch");
    this.macTable = macTable
    this.ip = ip;
    this.networkInterface = networkInterface;
    this.lanSegment = lanSegment;
  }
}
