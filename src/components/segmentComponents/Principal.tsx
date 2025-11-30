import NetworkFlow from "../sectionComponents/DeviceWrapper";
import Logs from "../sectionComponents/Logs";

function Principal() {
  return (
    <figure className="flex flex-col lg:flex-row min-w-screen w-full min-h-screen h-auto gap-x-12 items-center justify-center px-4 md:px-8">
      <NetworkFlow />
      <Logs />
    </figure>
  );
}

export default Principal