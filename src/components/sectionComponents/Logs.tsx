import SectionTitle from "../bluePrints/SectionTitle";
import { Log } from "../bluePrints/Log";
import { useEffect, useState, type ReactElement } from "react";

interface LogType {
  layer: string;
  message: string;
} //for our Logs State Array

//main component
function Logs(): ReactElement {
  const [logsArray, setLogsArray] = useState<LogType[]>([]);
// useEffect(()=>{
  const socket = new WebSocket("ws://localhost:5000");
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === "newLog") {
      const newArray:LogType[] = [
        ...logsArray,
        { layer: data.layer, message: data.message },
      ];
      setLogsArray(newArray);
    }
  };
// },[])

        // console.log("logsArray :",logsArray);

  return (
    <section className=" w-full lg:w-[40%] lg:h-[80vh] h-[30vh] ">
      <SectionTitle name="Logs" />
      <figure className="w-full md:min-h-[80vh] h-full  flex flex-col  rounded-lg border-[#ffffff30] border p-4 gap-4 cursor-pointer transition-all shadow-sm hover:shadow-xl shadow-[#1a4f265b] duration-300 transparent-black-cards">
        {logsArray.map(
          (log, index) =>(<Log key={index} message={log.message} />)
        )}
      </figure>
    </section>
  );
}

export default Logs;
