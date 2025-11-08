import { pingService } from "./ping.service.js";


export async function ping(req, res) {
  const { sourceIp, destinationIp } = req.body;

  // const response = await pingService(sourceIp,destinationIp)

  const response = await pingService("192.168.1.1", "192.168.1.2");

  // res.json({
  //   status:200,
  //   message:`Yo! you pinged ${response}`
  // })

  console.log(response)
}
