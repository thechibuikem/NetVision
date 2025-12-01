
import { broadcast } from "../../../server.js";

//create function to send logs via webSocket
export async function logEvent(actionType, sourceMac, destinationIP, layer) {
  let time = new Date().toISOString(); //getting current date

  
  //dynamically preparing our message
  let message;
if (actionType === "ICMP Request") {
    message = `
    | ${layer} | ${actionType} | Echo Request from ${sourceMac} to ${destinationIP} |`;
  }
else if (actionType === "ICMP Reply"){
   message = `
    | ${layer} | ${actionType} | Echo Reply from ${destinationIP} to ${sourceMac} |`;
  }
else if (actionType === "ARP Request") {
    message = `
    | ${layer} | ${actionType} | Who has ${destinationIP} tell ${sourceMac} |`;}
else if (actionType === 'ARP Reply'){
    message = `| ${layer} | ${actionType} | From ${destinationIP} tell ${sourceMac} |
    `;
  }
  // logs.push(message);

  // the message our front-end websocket would receive
const webSocketMessage = {
  type: "newLog",
  layer: layer,
  message: message
};


  // Broadcast new log to all connected websocket clients
broadcast(webSocketMessage)
}
