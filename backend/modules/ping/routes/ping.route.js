import express from "express"
import { ping } from "../controller/ping.controller.js";//contoller to send pings

// initializing router
const router = express.Router();
// router.get("/", ping);
router.post('/sendPing',ping)
export default router