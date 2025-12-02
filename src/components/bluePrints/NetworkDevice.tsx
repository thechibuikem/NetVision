import Tippy from "@tippyjs/react";
import { type FC, type ReactElement, useContext } from "react";
import { type Device, AppContext } from "../../api/context";

export type NetworkDeviceProps = {
  Logo: ReactElement;
  deviceId: number;
};


type TippyProps = {
  requiredDevice: Device;
};


// Modal showing additional information
function AdditionalInfo({requiredDevice}: TippyProps): ReactElement {
      
        console.log(requiredDevice);
  return (
    <div className="min-w-64 aspect-square transparent-cards backdrop-blur-2xl text-[12px] p-4 rounded-sm flex flex-col gap-y-2">
      <h5 className="">{requiredDevice?.deviceName}</h5>
      <h5>IP: {requiredDevice?.ip}</h5>
      <h5>MAC: {requiredDevice?.mac}</h5>
      <h5>INTERFACE: {requiredDevice?.networkInterface}</h5>
      <h5>LAN SEGMENT: {requiredDevice?.lanSegment}</h5>
      {/* arp cache */}
      {requiredDevice?.arpTable && <h5>ARP CACHE : </h5>}
      <ul>
        {requiredDevice?.arpTable?.map((element, index) => (
          <li key={index}>
            {element.ip} - {element.mac}
          </li>
        ))}
      </ul>
      {/* mac table */}
      {requiredDevice?.macTable && <h5>MAC TABLE : </h5>}
      <ul>
        {requiredDevice?.macTable?.map((element, index) => (
          <li key={index}>
            {element.mac} - {element.interface}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Network device component
const NetworkDevice: FC<NetworkDeviceProps> = ({ Logo, deviceId }):ReactElement => {
  // initializing context
  const {devices} = useContext(AppContext)!;
  // identifying required device object
  const requiredDevice:Device = devices[deviceId];


  return (
    <figure className="text-white flex flex-col items-center gap-y-2 border-dashed border-white relative">
      {/* Network device Icon */}
      <Tippy
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 shadow-xl"
        content={<AdditionalInfo requiredDevice={requiredDevice} />}
      >
        <div className="shadow-lg flex justify-center items-center  shadow-[#1a4f265b] border border-[#2dd11079] bg-black cursor-pointer w-24 aspect-square rounded-md">
          {/* {iconWithSize} */}
          {Logo}
        </div>
      </Tippy>
      {/* Network Device Title */}
      <h3>{requiredDevice ? requiredDevice.deviceName : "PC X"}</h3>
    </figure>
  );
};

export default NetworkDevice;
