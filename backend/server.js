// importing dependencies
// import app from "./app.js";
// import dotenv from "dotenv"

//setting up environmental variables
// dotenv.config()

// const PORT = process.env.PORT||5000

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


import express from "express";
import pingRoutes from "./modules/ping/ping.route.js";
import { ping } from "./modules/ping/ping.controller.js";
import { getDevices } from "./modules/network/network.controller.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors())
app.use("/api", pingRoutes);
app.get("/api/devices",getDevices)//route to retrieve network devices

app.listen(5000, async () => {
  console.log("Server running on port 5000 \n\n");

  // // Run ping on start
  // await ping(
  //   { body: { sourceIp: "192.168.1.1", destinationIp: "255.1.1.2" } },
  //   { json: console.log } // mock Express res.json
  // );
});
