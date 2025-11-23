import { wss } from "../server.js";

 wss.on("connection", (ws) => {
   console.log("Client connected via WebSocket");

   ws.on("message", (message) => {
     console.log("Received:", message);
     ws.send(`Server received your message: ${message}`);
   });

   ws.on("close", () => {
     console.log("Client disconnected");
   });
 });