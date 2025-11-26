// importing dependencies
import bodyParser from "body-parser"
import http from "http"
import express from "express";
import cors from "cors"
import pingRoutes from "./modules/ping/routes/ping.route.js";
import networkRoutes from "./modules/network/routes/network.routes.js"
import { WebSocketServer } from "ws";


const app = express();

export const server = http.createServer(app);
app.use(express.json());
app.use(cors())
app.use("/api/ping", pingRoutes);
app.use("/api/network",networkRoutes)//route for networks
// handling websocket operations


export const wss = new WebSocketServer({ server });// Create WebSocket server on the HTTP server
wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (msg) => {
    console.log("Received:", msg.toString());
  });

  ws.send(JSON.stringify({ type: "init", message: "hello client" }));
});



server.listen(5000, async () => {
  console.log("Server running on port 5000 ✅");
});
