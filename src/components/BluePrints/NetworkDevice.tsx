import Tippy from "@tippyjs/react";
import { type FC, type ReactElement, useContext } from "react";
import { AppContext} from "../../api/context";

export type NetworkDeviceProps = {
  Logo: ReactElement;
  deviceId: number;
};

// Modal showing additional information
function AdditionalInfo () {
  return (
    <div className="min-w-64 aspect-square transparent-cards backdrop-blur-2xl text-[12px] p-4 rounded-sm flex flex-col gap-y-2">
      <h5 className="">Name: PC 1</h5>
      <h5>IP: 169.255.255.255</h5>
      <h5>MAC: BBBB:BBBB:BBBB</h5>
      <h5>INTERFACE: F0/0</h5>
      <h5>LAN: LAN 1</h5>
      <h5>
        ARP: [ Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
        repellat magnam natus, quisquam ut obcaecati sit eveniet]
      </h5>
    </div>
  );
}

// Network device component
const NetworkDevice: FC<NetworkDeviceProps> = ({ Logo, deviceId }):ReactElement => {
  // initializing context
  const context = useContext(AppContext);
  if (!context) {
    console.log("Network Device must be inside app provider");
  }
// destructuring devices state from our context
  const { devices } = context;

  // identifying required device object
  const requiredDevice = devices[deviceId];



  return (
    <figure className="text-white flex flex-col items-center gap-y-2 border-dashed border-white relative">
      {/* Network device Icon */}
      <Tippy
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 shadow-xl shadow-[#1a4f265b]"
        content={<AdditionalInfo />}
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
