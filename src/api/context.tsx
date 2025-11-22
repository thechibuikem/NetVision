// BASICALLY ALL WE DO HERE IS TO SET UP A CONTEXT THAT EXPOSES AN ARRAY CALLED DEVICES WHERE WE'D STORE OUR DEVICES AND WITHIN OUR CONTEXT PROVIDER, WE SET UP A USE EFFECT THAT SENDS A GET REQUEST TO OUR BACKEND ROUTE THAT EXPOSES OUR ARRAY OF DEVICES


import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// The Type for arpTable which is an object
interface arpTable {
  [ip: string]: string;
}

// Every Basic device in our network should have these
export type Device = {
  deviceName: string;
  ip: string;
  mac: string;
  arp: arpTable;
};

type AppContextType = {
  devices: Device[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
showPing:boolean;
setShowPing:React.Dispatch<React.SetStateAction<boolean>>

};

// creating context and setting it's default to undefined
export const AppContext = createContext<AppContextType>({
  devices: [],
  setDevices: () => {},
  showPing:false,
  setShowPing:(showPing)=>{!showPing}
});

// Provider for our context
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [showPing,setShowPing]= useState<boolean>(false)

  //   Backend endpoint to retrieve devices
  const endPoint = "http://localhost:5000/api/network/devices";

  //   Side effect to retrieve devices from Backend
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(endPoint);
        if (!res.ok) {
          console.log("Backend Response is not okay");
          return;
        }
        //retrieving array of device objects
        const data = await res.json();
        const retrievedDevices = data.devices;

        console.log("Devices", retrievedDevices);
        setDevices(retrievedDevices); //populate our devices state with device data from backend
      } catch (err) {
        console.error(err);
      }
    })();
  }, [endPoint]);

  return React.createElement(
    AppContext.Provider,
    { value: { devices, setDevices ,showPing,setShowPing} },
    children
  );
};
