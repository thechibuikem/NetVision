import { wss } from "../../../server.js";
import WebSocket from "ws";
import { devices } from "../../network/database/network.db.js"


// // function to get key-players in ICMP animation
function getKeyPlayers(sourceDevice){
  // // 2. get all devices on same LAN, except source
  // const lanMembers = devices.filter(
  //   (d) => d.lan === sourceDevice.lan && d.mac !== sourceDevice.mac
  // );

  //flag to determinine if this is a singlway or multiway message
  let homeSwitch = devices.find(
    (device) => device.type == "switch" && device.lan == sourceDevice.lan
  ); //fetch the switch local to our sourceDevice
  let awaySwitch = devices.find(
    (device) => device.type == "switch" && device.lan !== sourceDevice.lan
  ); //detect remote switch
  const router = devices.find((device) => device.type == "router"); //grab router


  // console.log("home switch: \n",homeSwitch,
  //   "away switch: \n",
  //   awaySwitch,
  //   "router: \n",router)
  return { homeSwitch, awaySwitch, router };
}

// // function to get key-players in ARP animation
// async function getICMPAnimationKeyPlayers(sourceDevice,destinationDevice){
//   const sameLan = sourceDevice.lan === destinationDevice.lan; //flag to determinine if this is a singlway or multiway message
//   let homeSwitch = devices.find(
//     (device) => device.type == "switch" && device.lan == sourceDevice.lan
//   ); //fetch the switch local to our sourceDevice
//   let awaySwitch = devices.find(
//     (device) => device.type == "switch" && device.ip !== homeSwitch.ip
//   ); //detect remote switch
//   const router = devices.find((device) => device.type == "router"); //grab router

//  return {sameLan,homeSwitch,awaySwitch,router}
// }


function craftRoute(destinationDevice, sourceDevice) {
  let route;
  const { homeSwitch, awaySwitch, router } = getKeyPlayers(sourceDevice);
  // console.log("source Device", sourceDevice);
  // console.log("homeSwitch", homeSwitch);

  const sameLan = sourceDevice.lan === destinationDevice.lan; //flag to determinine if this is a singlway or multiway message
  // craft route for

  if (sameLan) {
    route = [
      { from: sourceDevice.id, to: homeSwitch.id },
      { from: homeSwitch.id, to: destinationDevice.id },
      { from: destinationDevice.id, to: homeSwitch.id },
      { from: homeSwitch.id, to: sourceDevice.id },
    ];
  } else {
    route = [
      { from: sourceDevice.id, to: homeSwitch.id },
      { from: homeSwitch.id, to: router.id },
      { from: router.id, to: awaySwitch.id },
      { from: awaySwitch.id, to: destinationDevice.id },
      { from: destinationDevice.id, to: awaySwitch.id },
      { from: awaySwitch.id, to: router.id },
      { from: router.id, to: homeSwitch.id },
      { from: homeSwitch.id, to: sourceDevice.id },
    ];
  }
  return route;
}



export async function animateICMPEvent(sourceDevice, destinationDevice) {

  // console.log("samelan: ", sameLan);

  const route = craftRoute( destinationDevice, sourceDevice);

  // console.log("ROUTE", route);

  const webSocketMessage = { type: "ICMPRoute", routes: route }; //the message we'd send to the front-end

  // BroadCast Packet route to front-end
  const data = JSON.stringify(webSocketMessage);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

export function animateARPEvent(sourceDevice, destinationDevice) {

  const mainRoute = craftRoute(destinationDevice, sourceDevice); //crafting major route for the right device

  const otherDevices = devices.filter((device) => (
    device.type == "pc" &&
      !(device.ip === destinationDevice.ip || device.ip === sourceDevice.ip)
  ));


  console.log("otherDevices: ",otherDevices)

  const holderArray = []; // to hold other routes that I will generatee

  otherDevices.forEach((device) => {
    const route = craftRoute(device, sourceDevice);

    const halfRouteIndex = route.length / 2; //we use this to slice our array halfway to get pur from route

    const fromRoute = route.slice(0, halfRouteIndex);
  console.log("from route: ",fromRoute)

    holderArray.push(fromRoute);
  });

  holderArray.push(mainRoute); //


console.log("our holder array",holderArray)

  const webSocketMessage = { type: "ARPRoute", routes: holderArray };

  // BroadCast Packet route to front-end
  const data = JSON.stringify(webSocketMessage);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}
