import { useEffect, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import SectionTitle from "../bluePrints/SectionTitle";
import { accessRfRequirements } from "../../utils/reactFlowNodesProvider";
import Packet from "../asIsComponents/packet";
import { getNodeRoute } from "../../utils/getRfNodeRoutes";
//=============TYPES===========

import {type NodeRoute } from "../../utils/getRfNodeRoutes";

//getting rf requirements e.g initial node, initial edges & custom node types
const {initialNodes,initialEdges,nodeTypes} = accessRfRequirements()

// inner reactFlow component, where I can use useReactFlow because it's wrapped with a provider
function NetworkFlowInner() {
  const { setViewport, getNodes, viewportInitialized, getViewport } = useReactFlow(); //rf's adjust diagram & node retrieval hook
  const [unicastRoutes, setUnicastRoutes] = useState<NodeRoute[]>([]); //icmp  route state array
  const [rfUnicastRoutes, setRfUnicastRoutes] = useState<NodeRoute[]>([]);
  const [packet, setPacket] = useState<{ x: number; y: number } | null>(null); //for the current position of the packet
  const [packets, setPackets] = useState<{ x: number; y: number }[]>([]);
  const [multicastRoutes, setMulticastRoutes] = useState<NodeRoute[][]>([]); //arp route state array
  const [rfMulticastRoutes, setRfMulticastRoutes] = useState<NodeRoute[][]>([]);
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

  // 2. catch unicast-packet flow routes from web-sockets
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");
    socket.onmessage = (event) => {
      const data = JSON.parse(event?.data); //check backend response
      if (data?.type == "ICMPRoute") {
        setUnicastRoutes(data.routes);
      } else if (data?.type == "ARPRoute") {
        setMulticastRoutes(data.routes);
      }
    };
    socket.onerror = (error) => {
      console.log("WebSocket error:", error);
    };
  }, []);


  // 3. Build react-flow unicast- node routes from backend
  useEffect(() => {
    const holderArray: NodeRoute[] = [];
    unicastRoutes.forEach((route: NodeRoute) => {
      let newRoute = getNodeRoute(nodes, route);
      holderArray.push(newRoute);
    });
    setRfUnicastRoutes(holderArray);
  }, [unicastRoutes]);

  // 4. Build react-flow multicast - node routes from backend
  useEffect(() => {
    const superHolderArray: NodeRoute[][] = []; //create an array that would hold arrays of routes
    // for each array of route
    multicastRoutes.forEach((routes) => {
      const holderArray: NodeRoute[] = []; //create an array that would hold the transformed root object
      routes.forEach((route: NodeRoute) => {
        let transformedRoute = getNodeRoute(nodes, route);
        holderArray.push(transformedRoute); //push transformed root object into new array of transformed routes
      });
      superHolderArray.push(holderArray);
    });
    setRfMulticastRoutes(superHolderArray);
  }, [multicastRoutes]);

  console.log("transformed arp routes", rfMulticastRoutes);
  console.log("arp routes", multicastRoutes);

  // 5. Animate unicast Packet Movement
  useEffect(() => {
    if (!viewportInitialized) return;
    if (rfUnicastRoutes.length === 0) return; //quit if theres no animation to be done
    const nodes = getNodes(); //get nodes from react-flow chart
    console.log("nodes", nodes);
    let i = 0; //current animation we are on
    console.log("our nodeRoutes", rfUnicastRoutes[i]);

    // recursive function for animation
    function animateStep() {
      const step: NodeRoute = rfUnicastRoutes[i]; //keep track on what route we are on
      const fromNode = nodes.find((node) => node.id === step.from);
      const toNode = nodes.find((node) => node.id === step.to);

      if (!fromNode || !toNode) return;
      // Get current viewport transformation
      const viewport = getViewport();

      // Apply viewport transformation: (nodePos * zoom) + offset for responsiveness
      const sourceScreenPos = {
        x: fromNode.position.x * viewport.zoom + viewport.x,
        y: fromNode.position.y * viewport.zoom + viewport.y,
      };

      const destinationScreenPos = {
        x: toNode.position.x * viewport.zoom + viewport.x,
        y: toNode.position.y * viewport.zoom + viewport.y,
      };

      // Start animation at source position
      setPacket({ x: sourceScreenPos.x, y: sourceScreenPos.y });

      // Move to 'to' node after a short delay
      setTimeout(() => {
        setPacket({ x: destinationScreenPos.x, y: destinationScreenPos.y });
        i++;
        if (i < unicastRoutes.length) {
          setTimeout(() => animateStep(), 500);
        } else {
          // no more routes — wipe packet
          setTimeout(() => setPacket(null), 600);
        }
        // setTimeout(animateStep, 50);//wait 50mms before each step
      }, 200);
    }

    // Wait for viewport to settle before running animation
    setTimeout(() => {
      animateStep();
    }, 200);
  }, [rfUnicastRoutes]);

  // 6. Animate multicast packet movement
  useEffect(() => {
    if (!viewportInitialized) return;
    if (rfMulticastRoutes.length === 0) return;

    const nodes = getNodes();
    const viewport = getViewport();

    // For each multicast branch
    rfMulticastRoutes.forEach((routeArray, index) => {
      let stepIndex = 0;

      // Recursive function for each branch
      function animateBranch() {
        const step = routeArray[stepIndex];
        const fromNode = nodes.find((n) => n.id === step.from);
        const toNode = nodes.find((n) => n.id === step.to);

        if (!fromNode || !toNode) return;

        // Compute screen positions
        const fromPos = {
          x: (fromNode.position.x * viewport.zoom) + viewport.x,
          y: (fromNode.position.y * viewport.zoom) + viewport.y,
        };
        const toPos = {
          x: toNode.position.x * viewport.zoom + viewport.x,
          y: toNode.position.y * viewport.zoom + viewport.y,
        };

        // Step 1: place packet at FROM node
        setPackets((prev) => {
          const copy = [...prev];
          copy[index] = fromPos; // assign packet position for this branch
          return copy;
        });

        setTimeout(() => {
          // Step 2: move packet to TO node
          setPackets((prev) => {
            const copy = [...prev];
            copy[index] = toPos;
            return copy;
          });

          stepIndex++;

          if (stepIndex < routeArray.length) {
            setTimeout(animateBranch, 500);
          } else {
            // End of route — remove packet
            setTimeout(() => {
              setPackets((prev) => {
                const copy = [...prev];
                copy[index] = null as any; // or remove it entirely
                return copy;
              });
            }, 500);
          }
        }, 200);
      }

      // Start animation after short delay
      setTimeout(() => animateBranch(), 200);
    });
  }, [rfMulticastRoutes]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {packet !== null && <Packet x={packet.x} y={packet.y} />}

      {packets.map(
        (packet, i) => packet && <Packet key={i} x={packet.x} y={packet.y} />
      )}

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
