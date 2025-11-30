// BASICALLY ALL WE DO HERE IS TO SET UP A CONTEXT THAT EXPOSES AN ARRAY CALLED DEVICES WHERE WE'D STORE OUR DEVICES AND WITHIN OUR CONTEXT PROVIDER, WE SET UP A USE EFFECT THAT SENDS A GET REQUEST TO OUR BACKEND ROUTE THAT EXPOSES OUR ARRAY OF DEVICES


import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";


interface ARPEntry{
  mac:string,
  ip:string
}


interface MACTableEntry {
  mac: string;
  interface: string;
}

// The Type for arpTable which is an object
export interface arpTable {
  [ip: string]: string;
}

// Every Basic device in our network should have these
export type Device = {
  id: number;
  deviceName: string;
  ip: string;
  mac: string;
  networkInterface?: string;
  // interfaces?: string[];
  arpTable?: ARPEntry[];
  macTable?: MACTableEntry[];
};

type AppContextType = {
  // Array of devices from back-end
  devices: Device[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
  // Determine if ping modal is visible or not
  showPing: boolean;
  setShowPing: React.Dispatch<React.SetStateAction<boolean>>;
// checking if there's an ongoing Post request
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
};

// creating context and setting it's default to undefined
export const AppContext = createContext<AppContextType>({
  devices: [],
  setDevices: () => {},
  showPing: false,
  setShowPing: (showPing) => {
    showPing;
  },
  isSubmitting: false,
  setIsSubmitting: (isSubmitting) => {
    isSubmitting;
  },
});

// Provider for our context
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [showPing,setShowPing]= useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
// console.log(devices)
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

        // console.log("Devices", retrievedDevices);
        setDevices(retrievedDevices.map((d:Device) => ({ ...d }))); //populate our devices state with device data from backend
      } catch (err) {
        console.error(err);
      }
    })();
  }, [endPoint]);


console.log(devices)

  return React.createElement(
    AppContext.Provider,
    {
      value: {
        devices,
        setDevices,
        showPing,
        setShowPing,
        isSubmitting,
        setIsSubmitting,
      },
    },
    children
  );
};
