import { useContext } from "react";
import { AppContext } from "../../api/context";
import { useRef } from "react";
import type { ReactElement, } from "react"

function PingModal():ReactElement{
const context = useContext(AppContext)
if (!context){
  console.log("ping component has gats to be wrapped within app provider")
}

// creating ref containers
const sourceRef = useRef<HTMLInputElement|null>(null);
const destinationRef = useRef<HTMLInputElement | null>(null);



// destructure state an setter from context
const {setShowPing} = context
const endpoint = 'http://localhost:5000/api/ping/sendPing';


async function handleSubmit(e:React.FormEvent){
  e.preventDefault();
  // targetting refs contents
  const sourceName: string = sourceRef.current?.value || "";
  const destinationName: string = destinationRef.current?.value || "";
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sourceName, destinationName }), //send source and destination device to backend for processing
    });
    if (!res.ok) {
      console.log("Backend Response was not okay");
    }
    const data = res.json();
    // console.log(data);
  } catch (err) {
    console.log(err);
  }
}

// ============ OUR PING SEND FORM=================//
  return (
      <form
       className="absolute flex flex-col gap-y-4 w-56 h-fit transparent-black-cards -left-1/6 -translate-x-1/2 -top-1/2 translate-y-1/12 p-4 z-50 hover:shadow-lg hover:shadow-[#1a4f265b]"
       onSubmit={handleSubmit}
       onMouseOver={()=>{setShowPing(true)}}
       onMouseOut={()=>{setShowPing(false)}}
       >
        {/* source  */}
        <div className="flex flex-col gap-y-2">
          <label htmlFor="source">Source Device</label>
          <input
            ref={sourceRef}
            type="text"
            name="source"
            className="transparent-black-cards relative w-full px-4"
            placeholder="PC 1"
          />
        </div>
        {/* destination  */}
        <div className="flex flex-col gap-y-2">
          <label htmlFor="source">Destination Device</label>
          <input
            ref={destinationRef}
            type="text"
            name="source"
            className="transparent-black-cards relative w-full px-4"
            placeholder="PC 2"
          />
        </div>
        <button className="transparent-cards px-8" type="submit">send</button>
      </form>
    );
}

export function PingBtn():ReactElement{

  const context = useContext(AppContext);
  if (!context) {
    console.log("ping component has gats to be wrapped within app provider");
  }
  // destructure state an setter from context
  const { showPing, setShowPing } = context;

    return (
      <section className="relative">
      {showPing &&
        <PingModal/>}
        <button 
        className="border-[#ffffff30] border shadow-lg hover:shadow-xl shadow-[#1a4f265b] text-white px-8 py-2 text-sm rounded-md hover:-translate-y-1 transition-all duration-300 cursor-pointer transparent-black-cards"
        onMouseOver={()=>setShowPing(!showPing)}
        >
          ping
        </button>
      </section>
    );
}