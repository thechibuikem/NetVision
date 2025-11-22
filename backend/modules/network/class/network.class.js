import { logEvent } from "../../logs/service/logs.service.js"; //reporter function to send reports of events to front-end
import { arpRequest } from "../service/network.service.js";

// base device class having default ping function
export class Device {
  constructor(deviceName, mac, arp = [], type) {
    this.deviceName = deviceName;
    this.mac = mac;
    this.arp = arp;
    this.type = type;
  }

  // function for devices to log
  async log(actionType, targetIP, layer, message) {
    await logEvent(actionType, this, targetIP, layer, message);
  }

  //send ping method
  async ping(destinationIP, round = 0, limit = 5) {
    //base recursive condition
    if (round > limit) {
      console.log("ping process complete \n");
      return;
    }
    else {
      // Check ARP table first for recepient
      const receivingDevice = this.arp.find(
        (entry) => entry.ip === destinationIP
      );
      //===== If recieving device is absent on source devices ARP table====
      if (!receivingDevice) {
        // Run a log function, to alert of an impending ARP request and conditionally log to console that this ping round was insuccessful
        console.log(` ping ${round} insuccessful`);
        await this.log(
          "ARP Request",
          destinationIP,
          "Layer 2 - Data Link",
          `Who has ${destinationIP}? Tell ${this.mac} \n`
        );
        await arpRequest(this, destinationIP); // send ARP request out to complete a round
        //
        // await this.ping(destinationIP, round + 1, limit); 
         setTimeout(3000, async () => {
    await this.ping(destinationIP, round + 1, limit);
                });
      }
      //===== If recieving device is present on source devices ARP table====
      else {
        console.log(` ping ${round} successful`);
        await this.log(
          "ICMP Request",
          this.mac,
          destinationIP,
          "Layer 3 - Network",
          `ICMP ECHO from ${this.mac} to ${receivingDevice.mac} \n`
        );
        //
         setTimeout(3000, async () => {
          await this.ping(destinationIP, round + 1, limit);
        });
      }
    }
  }
} //root class of networking devices in out system that we'll use to create other classes

export class PC extends Device {
  constructor(deviceName, mac, arp = [], ip, networkInterface, lan) {
    super(deviceName, mac, arp, "pc");
    this.ip = ip;
    this.networkInterface = networkInterface;
    this.lan = lan;
  }
} //Class for Pcs in our system, that we'll use as key players in our system

export class Switch extends Device {
  constructor(deviceName, mac, arp = [], ip, networkInterface, lan) {
    super(deviceName, mac, arp, "switch");
    this.ip = ip;
    this.networkInterface = networkInterface;
    this.lan = lan;
  }
} //Class for switch, that serve as connectors within LANs

export class Router extends Device {
  constructor(deviceName, mac, arp = [], ip = [], networkInterfaces) {
    super(deviceName, mac, arp, "router");
    this.arp = arp;
    this.ip = ip;
    this.networkInterfaces = networkInterfaces;
  }
} //Class for Routers, that serve as connectors between LANs
