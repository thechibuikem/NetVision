
// import { WebSocketServer } from "ws";

// export const wss = new WebSocketServer({ server });// Create WebSocket server on the HTTP server

// import { devices } from "./modules/network/database/network.db.js";

//  wss.on("connection", (ws) => {
//    console.log("Client connected via WebSocket");

//    ws.on("message", (message) => {
//      console.log("Received:", message);
//      ws.send(`Server received your message: ${message}`);
//    });

//    ws.on("close", () => {
//      console.log("Client disconnected");
//    });
//  });


// export function broadcast (data) {
//   wss.clients.forEach((client) => {
//     if (client.readyState === 1) {
//       // OPEN
//       client.send(JSON.stringify(data));
//     }
//   });
// };





//   //  const webSocketMessage = { type: "devices", devices: devices };
//   //  const data = JSON.stringify(webSocketMessage);
//   //  wss.clients.forEach((client) => {
//   //    if (client.readyState === WebSocket.OPEN) {
//   //      client.send(data);
//   //    }
//   //  });
