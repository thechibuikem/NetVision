import { useEffect } from "react";
import { MdComputer } from "react-icons/md";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { BsRouter } from "react-icons/bs";
import ReactFlow, {
  ReactFlowProvider,
  Handle,
  Position,
  type NodeProps,
  Background,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import NetworkDevice ,{ type NetworkDeviceProps } from "../BluePrints/NetworkDevice";
import SectionTitle from "../BluePrints/SectionTitle";


// creating custom node for reactFlow
const DeviceNode: React.FC<NodeProps<NetworkDeviceProps>> = ({ data }) => {
  return (
    <div>
      <NetworkDevice Logo={data.Logo} deviceId={data.deviceId} />
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
}
// registering custom nodes for reactflow
const nodeTypes = { deviceNode: DeviceNode };

// initailizing nodes that would be in our reactFlow with their positions
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

// initializing entire reactFlow graph component
export default function NetworkFlow() {
  return (
    <section className=" w-full lg:w-[60%] lg:h-[80vh]">
      <SectionTitle name="Networks" />

      <div className="lg:h-full h-[50vh] border w-full border-[#ffffff30] rounded-lg shadow-sm hover:shadow-xl shadow-[#1a4f265b] hover:-translate-y-1 transition-all duration-300 justify-center items-center bg-black">
        <ReactFlowProvider>
          <NetworkFlowInner />
        </ReactFlowProvider>
      </div>
    </section>
  );
}


// inner reactFlow component, where I can use useReactFlow because it's wrapped with a provider
function NetworkFlowInner() {
  const { setViewport } = useReactFlow();

  useEffect(() => {
    const width = window.innerWidth;

    if (width < 600) {
      setViewport({ x: 25, y: 100, zoom: 0.35 });
    } else if (width < 1024) {
      setViewport({ x: 100, y: 150, zoom: 0.6 });
    } else if (width < 1600) {
      setViewport({ x: 100, y: 100, zoom: 0.6 });
    } else {
      setViewport({ x: 100, y: 100, zoom: 1 });
    }



  }, [setViewport]);

  return (
    <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      nodeTypes={nodeTypes}
      proOptions={{ hideAttribution: true }}
      defaultViewport={{ x: 150, y: 100, zoom: 0.1 }}
    >
      <Background />
    </ReactFlow>
  );
}

