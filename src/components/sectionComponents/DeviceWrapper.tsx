import { MdComputer } from "react-icons/md";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { BsRouter } from "react-icons/bs";
// import type { IconType } from "react-icons";
// import type { ReactElement } from "react";
// import { useCallback} from "react";
import { type NetworkDeviceProps } from "../BluePrints/NetworkDevice";
import NetworkDevice from "../BluePrints/NetworkDevice";
import {
  Handle,
  Position,
  type NodeProps,
  type Node,
  type Edge,
} from "reactflow";
import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";

const DeviceNode: React.FC<NodeProps<NetworkDeviceProps>> = ({ data }) => {
  return (
    <div>
      <NetworkDevice Logo={data.Logo} deviceId={data.deviceId} />
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};
// creating a node type for my re-usuable device component
const nodeTypes = { deviceNode: DeviceNode };

const initialNodes = [
  {
    id: "1",
    type: "deviceNode",
    position: { x: 0, y: 0 },
    data: { Logo: <MdComputer size={48} />, deviceId: 0 },
  },
  {
    id: "2",
    type: "deviceNode",
    position: { x: 0, y: 400 },
    data: { Logo: <MdComputer size={48} />, deviceId: 1 },
  },
  {
    id: "3",
    type: "deviceNode",
    position: { x: 200, y: 200 },
    data: { Logo: <HiOutlineSwitchHorizontal size={48} />, deviceId: 4 },
  },
  {
    id: "4",
    type: "deviceNode",
    position: { x: 400, y: 200 },
    data: { Logo: <BsRouter size={48} />, deviceId: 6 },
  },
  {
    id: "5",
    type: "deviceNode",
    position: { x: 600, y: 200 },
    data: { Logo: <HiOutlineSwitchHorizontal size={48} />, deviceId: 5 },
  },
  {
    id: "6",
    type: "deviceNode",
    position: { x: 800, y: 0 },
    data: { Logo: <MdComputer size={48} />, deviceId: 2 },
  },
  {
    id: "7",
    type: "deviceNode",
    position: { x: 800, y: 400 },
    data: { Logo: <MdComputer size={48} />, deviceId: 3 },
  },
];

// The connectors in my architecture
const initialEdges = [
  { id: "e1-2", source: "1", target: "3", type: "straight" },
  { id: "e1-2", source: "2", target: "3", type: "straight" },
  { id: "e1-2", source: "3", target: "4", type: "straight" },
  { id: "e1-2", source: "4", target: "5", type: "straight" },
  { id: "e1-2", source: "5", target: "6", type: "straight" },
  { id: "e1-2", source: "5", target: "7", type: "straight" },
];

export default function NetworkFlow() {
  // const [nodes] = useNodesState(initialNodes);
  // const [edges] = useEdgesState(initialEdges);

  return (
    <div className="h-96 w-3xl flex justify-center items-center bg-black">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}

// function DeviceWrapper() {
//       // type for my objects in device spawner
//   type DeviceSpawner = {
//       id:number,
//       icon:IconType
//   }

//   const devicesArray: DeviceSpawner[] = [
//       // pcs
//       { id: 0, icon: HiMiniComputerDesktop },
//       { id: 1, icon: HiMiniComputerDesktop },
//       { id: 2, icon: HiMiniComputerDesktop },
//       { id: 3, icon: HiMiniComputerDesktop },
//       // switches
//       { id: 4, icon: HiOutlineSwitchHorizontal },
//       { id: 5, icon: HiOutlineSwitchHorizontal },
//       // router
//       { id: 6, icon: BsRouter },
//   ];

//   // converting devices Array into an array of network Icons that I can use
//   const NetworkComponents:ReactElement[]=  devicesArray.map(
//       (device) => (
//     <NetworkDevice
//       Logo={< device.icon size={40} />}
//       deviceId= {device.id}
//     />
//   )

//   );

//   // actual stuff being returned in page
//     return (
//       <figure className="flex gap-8">
//         {NetworkComponents[2]}
//         {NetworkComponents[6]}
//         {NetworkComponents[4]}
//       </figure>
//     );
//   }

// export default DeviceWrapper
