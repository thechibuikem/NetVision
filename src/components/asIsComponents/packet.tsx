interface PacketProps{
    x:number,
    y:number
}


export default function Packet({ x, y }:PacketProps) {
  return (
    <div
className="absolute w-4 aspect-square rounded-full bg-[#670303f4] z-50"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        transition: "all 0.2s linear",
      }}
    ></div>
  );
}
