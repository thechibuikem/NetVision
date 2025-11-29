import { wss } from "../../../server.js";
import WebSocket from "ws";
import { devices } from "../../network/database/network.db.js"






export async function animateICMPEvent(sourceDevice, destinationDevice) {
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


  console.log("\n\n\n otherDevices: ",otherDevices ,"\n\n\n")

  const holderArray = []; // to hold other routes that I will generatee

  otherDevices.forEach((device) => {
    const route = craftRoute(device, sourceDevice);

    const halfRouteIndex = route.length / 2; //we use this to slice our array halfway to get pur from route

    const fromRoute = route.slice(0, halfRouteIndex);
  // console.log("from route: ",fromRoute)

    holderArray.push(fromRoute);
  });

  holderArray.push(mainRoute); 

  const webSocketMessage = { type: "ARPRoute", routes: holderArray };

  // BroadCast Packet route to front-end
  const data = JSON.stringify(webSocketMessage);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}


// // function to get key-players in ICMP animation
function getKeyPlayers(sourceDevice){
  //flag to determinine if this is a singlway or multiway message
  let homeSwitch = devices.find(
    (device) =>
      device.type == "switch" && device.lanSegment == sourceDevice.lanSegment
  ); //fetch the switch local to our sourceDevice
  let awaySwitch = devices.find(
    (device) =>
      device.type == "switch" && device.lanSegment !== sourceDevice.lanSegment
  ); //detect remote switch
  return { homeSwitch, awaySwitch };
}


function craftRoute(destinationDevice, sourceDevice) {
  let route;
  const { homeSwitch, awaySwitch } = getKeyPlayers(sourceDevice);

//  console.log("awaySwitch",awaySwitch)
  
  const isSameLanSegment = sourceDevice.lanSegment === destinationDevice.lanSegment; //flag to determinine if this is a singlway or multiway message 

  // craft route for
  if (isSameLanSegment) {
    route = [
      { from: sourceDevice.id, to: homeSwitch.id },
      { from: homeSwitch.id, to: destinationDevice.id },
      { from: destinationDevice.id, to: homeSwitch.id },
      { from: homeSwitch.id, to: sourceDevice.id },
    ];
  } else {
    route = [
      { from: sourceDevice.id, to: homeSwitch.id },
      { from: homeSwitch.id, to: awaySwitch.id },
      { from: awaySwitch.id, to: destinationDevice.id },
      { from: destinationDevice.id, to: awaySwitch.id },
      { from: awaySwitch.id, to: homeSwitch.id },
      { from: homeSwitch.id, to: sourceDevice.id },
    ];
  }
  return route;
}