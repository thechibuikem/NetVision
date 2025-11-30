import { MdComputer } from "react-icons/md";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { type NodeProps,Handle,Position } from "reactflow";
import NetworkDevice,{type NetworkDeviceProps} from "../components/bluePrints/NetworkDevice";
import type { ReactElement } from "react";


interface Coordinates{
  x:number,
  y:number
}

interface DataProps{
  Logo:ReactElement,
  deviceId:number
}

export interface RfNode {
  id:string,
  type?:string,
  position:Coordinates
  data:DataProps
}


// creating custom node for reactFlow
  const DeviceNode: React.FC<NodeProps<NetworkDeviceProps>> = ({ data }) => {
    return (
      <div>
        <NetworkDevice Logo={data.Logo} deviceId={data.deviceId} />
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
      </div>
    );
  };
  // registering custom nodes for reactflow
 export const nodeTypes = { deviceNode: DeviceNode };

  // initailizing nodes that would be in our reactFlow with their positions
export const initialNodes: RfNode[] = [
  // pcs
  {
    id: "1",
    type: "deviceNode",
    position: { x: 0, y: 0 },
    data: { Logo: <MdComputer size={48} />, deviceId: 0 },
  },
  {
    id: "2",
    type: "deviceNode",
    position: { x: 0, y: 200 },
    data: { Logo: <MdComputer size={48} />, deviceId: 1 },
  },
  {
    id: "3",
    type: "deviceNode",
    position: { x: 0, y: 400 },
    data: { Logo: <MdComputer size={48} />, deviceId: 2},
  },
  // switches
  {
    id: "4",
    type: "deviceNode",
    position: { x: 300, y: 200 },
    data: { Logo: <HiOutlineSwitchHorizontal size={48} />, deviceId: 6 },
  },
  {
    id: "5",
    type: "deviceNode",
    position: { x: 600, y: 200 },
    data: { Logo: <HiOutlineSwitchHorizontal size={48} />, deviceId: 7 },
  },
  //pcs
  {
    id: "6",
    type: "deviceNode",
    position: { x: 900, y: 0 },
    data: { Logo: <MdComputer size={48} />, deviceId: 3},
  },
  {
    id: "7",
    type: "deviceNode",
    position: { x: 900, y: 200 },
    data: { Logo: <MdComputer size={48} />, deviceId: 4 },
  },
  {
    id: "8",
    type: "deviceNode",
    position: { x: 900, y: 400 },
    data: { Logo: <MdComputer size={48} />, deviceId: 5 },
  },
];



// The connectors in my architecture
const initialEdges = [
  { id: "1", source: "1", target: "4", type: "straight", animated: true },
  { id: "2", source: "2", target: "4", type: "straight", animated: true },
  { id: "3", source: "3", target: "4", type: "straight", animated: true },
  { id: "3", source: "4", target: "5", type: "straight", animated: true },
  { id: "4", source: "5", target: "6", type: "straight", animated: true },
  { id: "5", source: "5", target: "7", type: "straight", animated: true },
  { id: "6", source: "5", target: "8", type: "straight", animated: true },
];

export function accessRfRequirements() {
  

  return {initialNodes,initialEdges,nodeTypes};
};
