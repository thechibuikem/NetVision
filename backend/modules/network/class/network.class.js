import { logEvent } from "../../logs/service/logs.service.js"; //reporter function to send reports of events to front-end
import { arpRequest } from "../service/network.service.js";
import { animateICMPEvent } from "../../animatePacket/service/animatePacket.service.js";
import { devices } from "../database/network.db.js";
import { animateARPEvent } from "../../animatePacket/service/animatePacket.service.js";

 //root class of networking devices in out system that we'll use to create other classes
export class Device {
  constructor(deviceName, mac, arp = [], type) {
    this.deviceName = deviceName;
    this.mac = mac;
    this.arp = arp;
    this.type = type;
  }

  //function to send route for icmp animation
  async animateICMP(destinationIP) {
    const destinationDevice = devices.find(
      (device) => device.ip == destinationIP
    );
    await animateICMPEvent(this, destinationDevice);
  }

  //function to send route for arp animation
  async animateARP(destinationIP) {
    const destinationDevice = devices.find(
      (device) => device.ip == destinationIP
    );
     animateARPEvent(this, destinationDevice);
  }

  // function for devices to log
  async log(actionType, targetIP, layer, message) {
    await logEvent(actionType, this, targetIP, layer, message);
  }

  //send ping method
  async ping(destinationIP, round = 1, limit = 4) {
    // let isPinging = false //flag to check if there's an ongoing ping
    //base recursive condition
    if (round > limit) {
      console.log("ping process complete \n");
      return;
    } else {
      // isPinging = true
      const receivingDevice = this.arp.find(
        (entry) => entry.ip === destinationIP
      );
      //===== If recieving device is absent on source devices ARP table====
      if (!receivingDevice) {
        // console.log(` ping ${round} insuccessful`);
        // log arp request
        await this.log(
          "ARP Request",
          destinationIP,
          "Layer 2 - Data Link",
          `Who has ${destinationIP}? Tell ${this.mac} \n`
        );

        await arpRequest(this, destinationIP); // send ARP request out to complete a round
          setTimeout(() => {
            this.animateARP(destinationIP);
          }, 1000);
        setTimeout(async () => {
          await this.ping(destinationIP, round + 1, limit);
        }, 8000);
      }

      //===== If recieving device is present on source devices ARP table====
      else {
        console.log(` ping ${round} successful`);
        setTimeout(async () => {
          await this.log(
            "ICMP Request",
            this.mac,
            destinationIP,
            "Layer 3 - Network",
            `ICMP ECHO from ${this.mac} to ${receivingDevice.mac} \n`
          );
        }, 1000);
        
        setTimeout( ()=>{this.animateICMP(destinationIP)},1000)
       
        setTimeout(async () => {
          await this.ping(destinationIP, round + 1, limit);
        }, 6000);
      }
    }
  }
}
//Class for Pcs in our system, that we'll use as key players in our system
export class PC extends Device {
  constructor(deviceName, mac, arp = [], ip, networkInterface, lan) {
    super(deviceName, mac, arp, "pc");
    this.ip = ip;
    this.networkInterface = networkInterface;
    this.lan = lan;
  }
} 
 //Class for switch, that serve as connectors within LANs
export class Switch extends Device {
  constructor(deviceName, mac, arp = [], ip, networkInterface, lan) {
    super(deviceName, mac, arp, "switch");
    this.ip = ip;
    this.networkInterface = networkInterface;
    this.lan = lan;
  }
}
//Class for Routers, that serve as connectors between LANs
export class Router extends Device {
  constructor(deviceName, mac, arp = [], ip = [], networkInterfaces) {
    super(deviceName, mac, arp, "router");
    this.arp = arp;
    this.ip = ip;
    this.networkInterfaces = networkInterfaces;
  }
} 
