// import {type Device } from "../api/context";
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
export function getNodeRoute(rfNodes:RfNode[],route: NodeRoute): NodeRoute {
  const deviceIdToDeviceId: IdRoute = {
    from: +route.from,
    to: +route.to,
  }; // {from:1,to:2}


console.log("backend devices id",deviceIdToDeviceId)

  const nodeRoute = getNodeFromDeviceRoute(deviceIdToDeviceId, rfNodes); // {from:1,to:2}


  return nodeRoute;
}






//this function takes in a mac address and returns the devices native id that has that mac address from our express db
function getNodeFromDeviceRoute(route: IdRoute,rfNodes:RfNode[]) {
  const sourceNode = rfNodes.find((node:RfNode) => node.data.deviceId == route.from);
  const destinationNode = rfNodes.find(
    (node) => node.data.deviceId == route.to
  );

console.log( "source and destination nodes",destinationNode,sourceNode);


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
