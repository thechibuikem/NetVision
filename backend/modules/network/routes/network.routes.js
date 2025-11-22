import express from "express"
import { getDevices } from "../controller/network.controller.js";//controller to get network devices

// initializing router
const router = express.Router()
//mounting routes
router.get("/devices",getDevices)

export default router