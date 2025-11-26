import { wss } from "../../../server.js";
import WebSocket from "ws";
import { devices } from "../../network/database/network.db.js"


// function to get key-players in ping animation
async function getAnimationKeyPlayers(sourceDevice,destinationDevice){
  const sameLan = sourceDevice.lan === destinationDevice.lan; //flag to determinine if this is a singlway or multiway message
  let homeSwitch = devices.find(
    (device) => device.type == "switch" && device.lan == sourceDevice.lan
  ); //fetch the switch local to our sourceDevice
  let awaySwitch = devices.find(
    (device) => device.type == "switch" && device.ip !== homeSwitch.ip
  ); //detect remote switch
  const router = devices.find((device) => device.type == "router"); //grab router

 return {sameLan,homeSwitch,awaySwitch,router}
}



export async function animateEvent(sourceDevice, destinationDevice) {
const {sameLan,homeSwitch,awaySwitch,router} = await getAnimationKeyPlayers(sourceDevice,destinationDevice)//destructuring key players

let route //route variable that is dynamically defined

//crafting animation path if we are on the same LAN,we use mac addresses because they are uniquely identifiable
if (sameLan){
     route = [
      { from: sourceDevice.mac, to: homeSwitch.mac },
      { from: homeSwitch.mac, to: destinationDevice.mac },
      { from: destinationDevice.mac, to: homeSwitch.mac },
      { from: homeSwitch.mac, to: sourceDevice.mac },
    ];
}else{
    route = [
      { from: sourceDevice.mac, to: homeSwitch.mac },
      { from: homeSwitch.mac, to: router.mac },
      { from: router.mac, to: awaySwitch.mac },
      { from: awaySwitch.mac, to: destinationDevice.mac },
      { from: destinationDevice.mac, to: awaySwitch.mac },
      { from: awaySwitch.mac, to: router.mac },
      { from: router.mac, to: homeSwitch.mac },
      { from: homeSwitch.mac, to: sourceDevice.mac },
    ];
}

const webSocketMessage = {type:"packetRoute",routes:route}//the message we'd send to the front-end

// console.log(webSocketMessage)

// BroadCast Packet route to front-end
const data = JSON.stringify(webSocketMessage)
wss.clients.forEach((client)=>{
    if (client.readyState === WebSocket.OPEN){
        client.send(data);
    }
})
}

