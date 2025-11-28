import NetworkFlow from "../sectionComponents/DeviceWrapper";
import Logs from "../sectionComponents/Logs";

function Principal() {
  return (
    <figure className="flex flex-col lg:flex-row gap-x-12 gap-y-12 items-center justify-center bg-black min-w-screen max-w-full w-full min-h-screen h-fit px-4 md:px-8">
      <NetworkFlow />
      <Logs />
    </figure>
  );
}

export default Principal