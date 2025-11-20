import React, { createContext, useState, useEffect,type ReactNode } from "react";

// Create contextType

// The Type for arpTable which is an object
interface arpTable {
  [ip: string]: string;
}

//A Basic device in our network should have these
export type Device = {
    id:number,
    deviceName:string,
    ip:string,
    mac:string
    arp:arpTable
}


type AppContextType = {
  devices: Device[];
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>;
};

// creating context and setting it's default to undefined
export const AppContext = createContext<AppContextType>({
  devices: [],
  setDevices: () => {
    ;
  },
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [devices, setDevices] = useState<Device[]>([]);

//   Backend endpoint to retrieve devices
  const endPoint = "http://localhost:5000/api/devices";

//   Side effect to retrieve devices
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(endPoint);
        if (!res.ok) {
          console.log("Backend Response is not okay");
          return;
        }

        const data = await res.json(); // extract json data from endpoint

        //retrieving array of device objects
        const retrievedDevices = (data.devices);

        console.log("Devices",retrievedDevices)
        // const devicesData = data.devices; // extract array of devices object from backend
        setDevices(retrievedDevices);//populate our devices state with device data from backend

        // console.log("devicesData", devicesData);
      } catch (err) {
        // console.error(err);
      }
    })();
  }, [endPoint]);





  return React.createElement(
    AppContext.Provider,
    { value: { devices, setDevices } },
    children
  );
};
