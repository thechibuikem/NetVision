import {PC,Switch } from "../class/network.class.js";

// The arrays holding our device elements
 const pcs = [
   {
     name: "PC 1",
     ip: "192.168.1.1",
     mac: "AA:AA:AA:AA:AA:AA",
     interface: "g0/0", //fast ethernet 0
     lanSegment: "seg1",
     arp: [],
   },
   {
     name: "PC 2",
     ip: "192.168.1.2",
     mac: "BB:BB:BB:BB:BB:BB",
     interface: "g0/1", //fast ethernet 0
     lanSegment: "seg1",
     arp: [],
   },
   {
     name: "PC 3",
     ip: "192.168.1.3",
     mac: "CC:CC:CC:CC:CC:CC",
     interface: "g0/2", //fast ethernet 0
     lanSegment: "seg1",
     arp: [],
   },
   {
     name: "PC 4",
     ip: "255.1.1.1",
     mac: "DD:DD:DD:DD:DD:DD",
     interface: "g0/0", //fast ethernet 0
     lanSegment: "seg2",
     arp: [],
   },
   {
     name: "PC 5",
     ip: "255.1.1.2",
     mac: "EE:EE:EE:EE:EE:EE",
     interface: "g0/1", //fast ethernet 0
     lanSegment: "seg2",
     arp: [],
   },
   {
     name: "PC 6",
     ip: "255.1.1.3",
     mac: "FF:FF:FF:FF:FF:FF",
     interface: "g0/2", //fast ethernet 0
     lanSegment: "seg2",
     arp: [],
   },
 ];

// our lans switches
 const switches = [
   {
     name: "SW 1",
     ip: "192.168.1.0",
     mac: "GG:GG:GG:GG:GG:GG",
     interface: "f0/0", //fast ethernet 0
     lanSegment: "seg1",
     arp: [],
   },
   {
     name: "SW 2",
     ip: "255.1.0.0",
     mac: "HH:HH:HH:HH:HH:HH",
     interface: "f0/1", //fast ethernet 0
     lanSegment: "seg2",
     arp: [],
   },
 ];
;

//creating an array of pc instances from pc class and pcs array of object
 const pCInstances = pcs.map(
  p=> new PC(p.name,p.mac,p.arp,p.ip,p.interface,p.lanSegment)
)

 const switchInstances = switches.map(
  sw => new Switch(sw.name,sw.mac, sw.arp,sw.ip,sw.interface,sw.lanSegment)
)


const devicesWithoutId = [...pCInstances, ...switchInstances];

// assigning an id tp each device
devicesWithoutId.forEach((device,index)=>{device.id = index})

export const devices = devicesWithoutId;

// console.log(devices)

















































// export let arpTable = [
//   // e.g. { sourceIP: "192.168.1.2", destIP: "192.168.2.2", resolvedMAC: "AA:BB:CC:DD:EE:03" }
// ];
