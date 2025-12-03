> Part of Netvision -> Local Area Network Ping Simulator


# NetVision Device Classes

In NetVision, every network device is represented as an object in Express.js. All devices are instantiated from a root `Device` class that defines common properties and methods, including logging and pinging. These classes follow the **Liskov Substitution Principle**, allowing specific device types to extend the base functionality without breaking the system.

---

## Root Device Class

The `Device` class is the base class for all network devices. It defines general properties and methods that every device in the system shares.

```jsx
import { logEvent } from "../logs/logs.service.js";
import { arpRequest } from "./network.service.js";

export class Device {
  constructor(deviceName, mac, arp = [], type) {
    this.deviceName = deviceName; // Device name (e.g., PC1)
    this.mac = mac;               // MAC address (hardware identifier)
    this.arp = arp;               // ARP table for known devices
    this.type = type;             // Device type: PC, Switch, or Router
  }

  // Log actions to front-end logs visualizer
  async log(actionType, targetIP, layer, message) {
    await logEvent(actionType, this, targetIP, layer, message);
  }

  // Ping another device in the network
  async ping(destinationIP, round = 0, limit = 5) {
    if (round > limit) {
      console.log("Ping process complete");
      return;
    }

    const receivingDevice = this.arp.find(entry => entry.ip === destinationIP);

    if (!receivingDevice) {
      console.log(`Ping ${round} unsuccessful`);
      await this.log(
        "ARP Request",
        destinationIP,
        "Layer 2 - Data Link",
        `Who has ${destinationIP}? Tell ${this.mac}`
      );
      await arpRequest(this, destinationIP);
      await this.ping(destinationIP, round + 1, limit);
    } else {
      console.log(`Ping ${round} successful`);
      await this.log(
        "ICMP Request",
        destinationIP,
        "Layer 3 - Network",
        `ICMP ECHO from ${this.mac} to ${receivingDevice.mac}`
      );
      await this.ping(destinationIP, round + 1, limit);
    }
  }
}

```

### General Properties

- **Device Name**: A unique identifier for the device (e.g., PC1).
- **MAC Address**: Hardware address burned into the device.
- **Type**: One of the principal device types: PC, Switch, or Router.
- **ARP Table**: Tracks IP-to-MAC mappings for connected devices.

### General Methods

- **`log()`**: Sends events to the logging service to update the front-end log visualizer.
- **`ping()`**: Sends a ping to a target device using ARP and ICMP principles, recursively retrying until the target is reachable or a limit is reached.

---

## Instantiated Device Classes

The base `Device` class is extended to create specific network device types: `PC`, `Switch`, and `Router`.

### PC

Represents a workstation or end device connected to the network.

```jsx
export class PC extends Device {
  constructor(deviceName, mac, arp = [], ip, networkInterface, lan) {
    super(deviceName, mac, arp, "pc");
    this.ip = ip;                     // Device IP address
    this.networkInterface = networkInterface; // NIC details
    this.lan = lan;                   // Connected LAN
  }
}

```

### Switch

Represents a network switch that connects devices within a LAN.

```jsx
export class Switch extends Device {
  constructor(deviceName, mac, arp = [], ip, networkInterface, lan) {
    super(deviceName, mac, arp, "switch");
    this.ip = ip;
    this.networkInterface = networkInterface;
    this.lan = lan;
  }
}

```

### Router

Represents a router that connects multiple LANs and routes traffic between them.

```jsx
export class Router extends Device {
  constructor(deviceName, mac, arp = [], ip = [], networkInterfaces) {
    super(deviceName, mac, arp, "router");
    this.ip = ip;                     // Array of router IPs
    this.networkInterfaces = networkInterfaces; // Multiple network interfaces
  }
}

```

---

## Summary

- **Device class**: Base class with logging and pinging functionality.
- **PC, Switch, Router**: Specialized classes extending the base class.
- Each device has its ARP table to facilitate network communication.
- Ping functionality models real network behavior with ARP and ICMP principles.