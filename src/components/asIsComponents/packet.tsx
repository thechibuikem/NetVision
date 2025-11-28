interface PacketProps{
    x:number,
    y:number
}


export default function Packet({ x, y }:PacketProps) {
  return (
    <div
className="absolute w-3 aspect-square rounded-full bg-[#55981ed0] z-50"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        transition: "all 0.4s linear",
      }}
    ></div>
  );
}
