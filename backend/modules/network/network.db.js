import {PC,Switch,Router } from "./network.class.js";

export const pcs = [
  {
    name: "PC1",
    ip: "192.168.1.1",
    mac: "AA:AA:AA:AA:AA:AA",
    interface: "f0/0", //fast ethernet 0
    lan: "LAN1",
    arp: [],
  },
  {
    name: "PC2",
    ip: "192.168.1.2",
    mac: "BB:BB:BB:BB:BB:BB",
    interface: "f0/1", //fast ethernet 0
    lan: "LAN2",
    arp: [{ mac: "AA:AA:AA:AA:AA:AA", name: "PC1" }],
  },
  {
    name: "PC3",
    ip: "255.1.1.1",
    mac: "CC:CC:CC:CC:CC:CC",
    interface: "g0/0", //fast ethernet 0
    lan: "LAN1",
    arp: [],
  },
  {
    name: "PC4",
    ip: "255.1.1.2",
    mac: "DD:DD:DD:DD:DD:DD",
    interface: "g0/1", //fast ethernet 0
    lan: "LAN2",
    arp: [],
  },
];

// our lans switches
 const switches = [
  {
    name: "SW1",
    ip: "",
    mac: "",
    interface: "f0/0", //fast ethernet 0
    lan: "LAN1",
    arp: [],
  },
  {
    name: "SW2",
    ip: "",
    mac: "",
    interface: "f0/1", //fast ethernet 0
    lan: "LAN2",
    arp: [],
  },
];

// our LANs router
const router = {
  name: "router",
  mac: "",
  ips: [],
  interfaces: [],
  arp: [],
};

//creating an array of pc instances from pc class and pcs array of object
 const pCInstances = pcs.map(
  p=> new PC(p.name,p.mac,p.arp,p.ip,p.interface,p.lan)
)

 const switchInstances = switches.map(
  sw => new Switch(sw.name,sw.mac, sw.arp,sw.ip,sw.interface,sw.lan)
)

const routerInstance = new Router(router.name, router.mac,router.arp, router.ips,router.interfaces);

// exporting an array devices as containing all devices we'd use in our network
export const devices = [
...pCInstances,
...switchInstances,
routerInstance
];

// Assigning ids to my devices array in a new array for mmy front-end
const devicesWithIds = devices.map((device, index) => ({
  id: index, // assign new unique id starting from 0
  ...device, // keep existing properties
}));


//function to expose devices in backend to frontend

export function exposeDevices (){
   return devicesWithIds;
}

















































// export let arpTable = [
//   // e.g. { sourceIP: "192.168.1.2", destIP: "192.168.2.2", resolvedMAC: "AA:BB:CC:DD:EE:03" }
// ];
