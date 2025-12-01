import SectionTitle from "../bluePrints/SectionTitle";
import { Log } from "../bluePrints/Log";
import { useEffect, useState, type ReactElement } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

interface LogType {
  layer: string;
  message: string;
} //for our Logs State Array

//main component
function Logs(): ReactElement {
  const [logsArray, setLogsArray] = useState<LogType[]>([]);
  // let newArray:LogType[]=[]
//1. Socket to monitor logs 
useEffect(()=>{
  const socket = new WebSocket("wss://netvision-service.onrender.com");
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "newLog") {
          setLogsArray((prev)=>[...prev,
            { layer: data.layer, message: data.message }]),
    }
  };
},[])

   return (
     <section className=" w-full lg:w-[40%] lg:min-h-[80vh] h-[50vh] min-h-fit my-24">
       <SectionTitle name="Logs" />
       <figure className="w-full md:min-h-[80vh] md:h-full h-full flex flex-col rounded-lg border-[#ffffff30] border p-4 gap-4 cursor-pointer transition-all shadow-sm hover:shadow-xl  duration-300 transparent-black-cards overflow-scroll">
         <button className="ml-auto" onClick={()=>{setLogsArray([])}}>
           <FaRegTrashCan size={20} className="hover:text-red-500 cursor-pointer"/>
         </button>
         {logsArray.map((log, index) => (
           <Log key={index} message={log.message} />
         ))}
       </figure>
     </section>
   );
}

export default Logs;
