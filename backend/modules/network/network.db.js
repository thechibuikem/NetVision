import { type } from "os";

export const pcs = [
  {
    name: "PC1",
    ip: "192.168.1.1",
    mac: "AA:AA:AA:AA:AA:AA",
    // type:"pc",
    interface: "f0/0", //fast ethernet 0
    lan: "LAN1",
    arp: [],
  },
  {
    name: "PC2",
    ip: "192.168.1.2",
    mac: "BB:BB:BB:BB:BB:BB",
    // type:"pc",
    interface: "f0/1", //fast ethernet 0
    lan: "LAN2",
    arp: [{ mac: "AA:AA:AA:AA:AA:AA", name: "PC1" }],
  },
  {
    name: "PC3",
    ip: "255.1.1.1",
    mac: "CC:CC:CC:CC:CC:CC",
    // type:"pc",
    interface: "g0/0", //fast ethernet 0
    lan: "LAN1",
    arp: [],
  },
  {
    name: "PC4",
    ip: "255.1.1.2",
    mac: "DD:DD:DD:DD:DD:DD",
    // type:"pc",
    interface: "g0/1", //fast ethernet 0
    lan: "LAN2",
    arp: [],
  },
];

// our lans switches
export const switches = [
  {
    name: "SW1",
    ip: "",
    mac: "",
    // type: "switch",
    interface: "f0/0", //fast ethernet 0
    lan: "LAN1",
    arp: [],
  },
  {
    name: "SW2",
    ip: "",
    mac: "",
    // type: "switch",
    interface: "f0/1", //fast ethernet 0
    lan: "LAN2",
    arp: [],
  },
];

// Arp table 
const routerARP = [  
// e.g. { sourceIP: "192.168.1.2", destIP: "192.168.2.2", resolvedMAC: "AA:BB:CC:DD:EE:03" }
]

// our LANs router
const router = {
  name: "router",
  ip1: "",
  ip2: "",
  type: "router",
  interface1: "",
  arp: [],
};

// 

// exporting an array devices as containing all devices we'd use in our network
export const devices = [
  ...pcs.map((pc) => ({ ...pc, type: "pc" })),
  ...switches.map((sw) => ({ ...sw, type: "switch" })),
  router,
];

// const devices = [{...pcs,type:"pc"},{...switches,type:"switch"},router]

export let arpTable = [
  // e.g. { sourceIP: "192.168.1.2", destIP: "192.168.2.2", resolvedMAC: "AA:BB:CC:DD:EE:03" }
];
