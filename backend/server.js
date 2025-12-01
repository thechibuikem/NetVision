// importing dependencies
// import bodyParser from "body-parser"
// import http from "http"
import https from "https"
import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import { WebSocketServer } from "ws";
import pingRoutes from "./modules/ping/routes/ping.route.js";
import networkRoutes from "./modules/network/routes/network.routes.js"

dotenv.config()
const app = express();

// export const server = http.createServer(app);
export const server = https.createServer(app);
app.use(express.json());//also a bodyparser middleware
app.use(cors())
app.use("/api/ping", pingRoutes);
app.use("/api/network",networkRoutes)//route for networks
// handling websocket operations


//
export const wss = new WebSocketServer({ server });// Create WebSocket server on the HTTP server

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


export function broadcast (data) {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      // OPEN
      client.send(JSON.stringify(data));
    }
  });
};










const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✅`);
});
