import { useEffect, useState ,useRef} from "react";
import { useContext } from "react";
import { AppContext } from "../../api/context";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import SectionTitle from "../bluePrints/SectionTitle";
import { accessRfRequirements } from "../../utils/reactFlowNodesProvider";
import Packet from "../asIsComponents/packet";
import { getNodeRoute } from "../../utils/macToRFIdConverter";
//=============TYPES===========

import {type NodeRoute } from "../../utils/macToRFIdConverter";


//getting rf requirements e.g initial node, initial edges & custom node types
const {initialNodes,initialEdges,nodeTypes} = accessRfRequirements()

// inner reactFlow component, where I can use useReactFlow because it's wrapped with a provider
function NetworkFlowInner() {
  const { setViewport, getNodes } = useReactFlow(); //rf's adjust diagram & node retrieval hook
  const { devices } = useContext(AppContext)!;
  const [routes, setRoutes] = useState<NodeRoute[]>([]); //ping route state array
  const [rfRoutes, setRfRoutes] = useState<NodeRoute[]>([]);
  const [packet, setPacket] = useState<{ x: number; y: number } | null>(null); //for the current position of the packet
  const socketRef = useRef<WebSocket | null>(null);
  const nodes = getNodes();

  // 1. Viewport setup
  useEffect(() => {
    // dynamically adjusting the centering and zoom of my react-flow diagram
    const width: number = window.innerWidth; //screen width
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

  // 2. catch routes from web-sockets
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");
    socketRef.current = socket;
    socket.onmessage = (event) => {
      const data = JSON.parse(event?.data); //backend response
      if (data?.type == "packetRoute") {
        setRoutes(data.routes);
      }
    };
    socket.onerror = (error) => {
      console.log("WebSocket error:", error);
    }; //error-handling

    //cleanup on unmount
    // return()=>{
    //   if (socketRef.current){
    // socketRef.current.close()}}
  }, []);

  // 3. Build rf noDE route
  useEffect(() => {
    const holderArray: NodeRoute[] = [];
    routes.forEach((route) => {
      let newRoute = getNodeRoute(nodes, route, devices);
      holderArray.push(newRoute);
    });
    setRfRoutes(holderArray);
  }, [routes]);

  // 4. Animate Packet Movement
  useEffect(() => {
    console.log(rfRoutes);
    if (rfRoutes.length === 0) return; //quit if theres no animation to be done
    const nodes = getNodes(); //get nodes from react-flow chart
    console.log("nodes", nodes);
    let i = 0; //current animation we are on
    console.log("our nodeRoutes", rfRoutes[i]);

    function animateStep() {
      const step: NodeRoute = rfRoutes[i]; //keep track on what route we are on
      const fromNode = nodes.find((node) => node.id === step.from);
      const toNode = nodes.find((node) => node.id === step.to);

      // console.log("step: ", step);

      if (!fromNode || !toNode) return;
      setPacket({ x: fromNode.position.x, y: fromNode.position.y }); //start animation

      // Move to 'to' node after a short delay
      setTimeout(() => {
        setPacket({ x: toNode.position.x, y: toNode.position.y });
        i++;
        if (i < routes.length) setTimeout(animateStep, 400);
      }, 50);
    }

    animateStep();
  }, [rfRoutes]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {packet && <Packet x={packet.x} y={packet.y} />}

      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
        defaultViewport={{ x: 150, y: 100, zoom: 0.1 }}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
// initializing entire reactFlow graph component
 export default function NetworkFlow() {
  return (
    <section className=" w-full lg:w-[60%] lg:h-[80vh]">
      <SectionTitle name="Networks" />
      <div className="lg:h-full h-[50vh] border transparent-black-cards w-full border-[#ffffff30] rounded-lg shadow-sm hover:shadow-sm shadow-[#1a4f265b] hover:-translate-y-1 transition-all duration-300 justify-center items-center bg-black">
        <ReactFlowProvider>
          <NetworkFlowInner />
        </ReactFlowProvider>
      </div>
    </section>
  );
}
