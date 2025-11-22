import { useContext } from "react";
import { AppContext } from "../../api/context";


import type { ReactElement, } from "react"

function PingModal():ReactElement{
const context = useContext(AppContext)
if (!context){
  console.log("ping component has gats to be wrapped within app provider")
}
// destructure state an setter from context
const {showPing,setShowPing} = context


  return (
      <figure
       className="absolute flex flex-col gap-y-4 w-56 h-fit bg-amber-300 transparent-black-cards -left-1/6 -translate-x-1/2 -top-1/2 translate-y-1/12 p-4 z-30 hover:shadow-lg hover:shadow-[#1a4f265b]"
       onMouseOver={()=>{setShowPing(true)}}
       onMouseOut={()=>{setShowPing(false)}}
       >
        {/* source  */}
        <div className="flex flex-col gap-y-2">
          <label htmlFor="source">Source Device</label>
          <input
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
            type="text"
            name="source"
            className="transparent-black-cards relative w-full px-4"
            placeholder="PC 2"
          />
        </div>
        <button className="transparent-cards px-8">send</button>
      </figure>
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
        className="border-[#ffffff30] border shadow-lg hover:shadow-xl shadow-[#1a4f265b] text-white px-8 py-2 text-sm rounded-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        onMouseOver={()=>setShowPing(!showPing)}
        >
          ping
        </button>
      </section>
    );
}