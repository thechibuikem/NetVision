import { logEvent } from "../logs/logs.service.js"; //reporterfunction to send reports of events to front-end
import { arpRequest } from "./network.service.js";

// base device class having default ping function
export class Device {
  constructor(deviceName, mac, arp = [], type) {
    this.deviceName = deviceName;
    this.mac = mac;
    this.arp = arp;
    this.type = type;
  }
  getMac() {
    return this.mac;
  }

  // function for devices to log
  async log(actionType, targetIP, layer, message) {
    await logEvent(actionType, this, targetIP, layer, message);
  }

  //send ping method
  async ping(destinationIP, round = 0, limit = 5) {
    //base recursive condition
    if (round > limit) {
      // console.log("new source device: \n", this.deviceName);
      console.log("ping process complete \n");
      return;
    } //loop guard to stop our recursion
    else {
      // Check ARP table first for receiving device
      const receivingDevice = this.arp.find(
        (entry) => entry.ip === destinationIP
      );
      if (!receivingDevice) {
        //If the receiving device is unknown by sending device ARP device
        console.log(` ping ${round} insuccessful`);
        await this.log(
          "ARP Request",
          destinationIP,
          "Layer 2 - Data Link",
          `Who has ${destinationIP}? Tell ${this.mac} \n`
        ); //Log out ARP request
        //
        await arpRequest(this, destinationIP);
        //================================= retry ping after ARP resolves=========================
        await this.ping(destinationIP, round+1, limit);
      } else {
        console.log(` ping ${round} successful`);
        await this.log(
          //Log out ARP request
          "ICMP Request",
          destinationIP,
          "Layer 3 - Network",
          `ICMP ECHO from ${this.mac} to ${receivingDevice.mac} \n`
        );
         await this.ping(destinationIP, round+1, limit);
      }
    }
  }
} //root class of networking devices in out system that we'll use to create other classes

export class PC extends Device {
  constructor(deviceName, mac, arp = [], ip, networkInterface, lan) {
    super(deviceName, mac, arp, "pc");
    this.ip = ip;
    // this.arp = arp
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
