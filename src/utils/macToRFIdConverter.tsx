import {type Device } from "../api/context";
import { type RfNode } from "./reactFlowNodesProvider";
//=============TYPES===========
export interface IdRoute{
    from:number,
    to:number
}

export interface NodeRoute{
  from:string,
  to:string
}// for our react-flow route

//this function takes in an animation Route from our websocket and returns a parsed clone of this route that uses the REACT FLOW NODES id
export function getNodeRoute(rfNodes:RfNode[],route: NodeRoute, devices: Device[]): NodeRoute {
  const sourceMac = route.from;
  const destinationMac = route.to;
  const sourceDeviceId = getIdFromMac(sourceMac, devices);
  const destinationDeviceId = getIdFromMac(destinationMac, devices);


  const deviceIdToDeviceId: IdRoute = {
    from: sourceDeviceId,
    to: destinationDeviceId,
  }; // {from:1,to:2}


  const nodeRoute = getNodeFromDeviceRoute(deviceIdToDeviceId, rfNodes); // {from:1,to:2}
  return nodeRoute;
}

//this function takes in a mac address and returns the devices native id 
 function getIdFromMac(mac: string, devices: Device[]): number {
   // const { devices } = useContext(AppContext)!; //retrieving devices from context
   const device = devices.find((device) => device.mac == mac);
   if (device === undefined) {
     throw new Error("device is undefined");
   }
   const deviceId = device.id;
   return deviceId; //retrieve deviceId on our backend for this mac address
 }

//this function takes in a mac address and returns the devices native id that has that mac address from our express db
function getNodeFromDeviceRoute(route: IdRoute,rfNodes:RfNode[]) {
  // const { initialNodes } = accessRfRequirements(); //retrieving devices from context
  const sourceNode = rfNodes.find((node:RfNode) => node.data.deviceId == route.from);
  const destinationNode = rfNodes.find(
    (node) => node.data.deviceId == route.to
  );


  console.log("sourceNode",sourceNode)
  //handle cases where source and destination nodes are not found
  if (!sourceNode) {
    throw new Error(`Source node with deviceId ${route.from} not found`);
  }

  if (!destinationNode) {
    throw new Error(`Destination node with deviceId ${route.to} not found`);
  }

  //getting the source and destination id of our devices on react-flow
  const nodeIdToNodeId = {
    from: sourceNode.id, 
    to: destinationNode.id,
  };
  return nodeIdToNodeId;
}
