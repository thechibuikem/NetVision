interface LogsProp{
  message:string
}


export function L2Log({ message }: LogsProp) {
  return (
    <div
      className="transparent-cards bg-blue-100 border border-blue-400 rounded-sm cursor-pointer
        p-2 text-[12px] hover:-translate-y-1 duration-200 transition-all"
    >
      {message}
    </div>
  );
}

export function L3Log({message}:LogsProp) {
  return (
    <div className="bg-green-100 border border-green-400 transparent-black-cards rounded-sm p-2 text-[12px] cursor-pointer hover:-translate-y-1 duration-200 transition-all">  
  {message}
    </div>
  );
}

export function Log({ message }: LogsProp) {
  return (
    <div className="transparent-cards rounded-sm p-2 md:p-2 text-[12px] md:text-[1rem] cursor-pointer duration-200 transition-all">
      {message}
    </div>
  );
}
