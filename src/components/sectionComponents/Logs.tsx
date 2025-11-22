import SectionTitle from "../BluePrints/SectionTitle";
import { L2Log,L3Log } from "../BluePrints/Log";
import { useState } from "react";

function Logs() {
const [logsArray,setLogsArray] = useState<string[]>([]) //logs array that would hold our logs from the backend
const socket = new WebSocket('ws://localhost:5000')

// client-side end of websocket connection
socket.onmessage = (event)=>{
  const data = JSON.parse(event.data);
  if (data.type === "newLog"){
    const newArray = [...logsArray,data]
    setLogsArray(newArray)
  }
}


  return (
    <section className=" w-full lg:w-[40%] lg:h-[80vh] min-h-[40vh] h-fit ">
      <SectionTitle name="Logs" />
      <figure className="w-full h-full flex flex-col  rounded-lg border-[#ffffff30] border p-4 gap-4 cursor-pointer transition-all shadow-sm hover:shadow-xl shadow-[#1a4f265b] duration-300">
        {/* <L3Log /> */}
        <L2Log />
        <L3Log />
        <L2Log />
        <L3Log />
      </figure>
    </section>
  );
}

export default Logs