import { ping } from "./ping.controller.js";
import express from "express"
const router = express.Router();


// router.get("/", (req, res) => {
//   res.send("Server is running");
// });

router.get("/", ping);

export default router