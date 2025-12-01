import { useContext } from "react";
import { AppContext } from "../../api/context";
import ErrorBanner from "../asIsComponents/ErrorBanner";
import NetworkFlow from "../sectionComponents/DeviceWrapper";
import Logs from "../sectionComponents/Logs";

function Principal() {
const context = useContext(AppContext)!
const {authErrorMsg} =  context


  return (
    <figure className="flex flex-col lg:flex-row min-w-screen w-full min-h-screen h-auto gap-x-12 items-center justify-center px-4 md:px-8">
      {authErrorMsg && <ErrorBanner />}   {/* Conditionally display error banner */}
      <NetworkFlow />
      <Logs />
    </figure>
  );
}

export default Principal