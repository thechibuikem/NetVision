import express from "express"
import cors from "cors"
import pingsRouter from "./modules/ping/ping.route.js";
import logsRouter from "./modules/logs/logs.route.js";

// initialize app
const app = express();
//mount middlewares
app.use((cors()))
app.use((express.json()))
app.use("/api/ping",pingsRouter)//register routes
app.use("/api/logs", logsRouter);


//export app
export default app;