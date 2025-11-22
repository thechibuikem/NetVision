import { AppProvider } from "./api/context"
import DeviceWrapper from "./components/sectionComponents/DeviceWrapper";
import NetworkFlow from "./components/sectionComponents/DeviceWrapper";
import Home from "./components/Home";

function App() {
  return (
    <AppProvider>
      {/* <div className="flex items-center justify-center bg-black min-w-screen max-w-full w-full min-h-screen h-full px-4"> */}
     <Home/>
      {/* </div> */}
    </AppProvider>
  );
}

export default App