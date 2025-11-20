import { AppProvider } from "./api/context"
import DeviceWrapper from "./components/sectionComponents/DeviceWrapper";
import NetworkFlow from "./components/sectionComponents/DeviceWrapper";

function App() {
  return (
    <AppProvider>
      <div className="flex items-center justify-center bg-black min-w-screen max-w-full w-full min-h-screen h-full">
     <NetworkFlow/>
      </div>
    </AppProvider>
  );
}

export default App