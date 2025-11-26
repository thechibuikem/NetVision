import { type FC } from "react";
import { PingBtn } from "../asIsComponents/ping";

const NavBar: FC = () => {
  return (
    <section className="mx-4 md:mx-8 bg-black flex items-center justify-between py-4 md:px-8 px-4 mt-4 mb-8 md:my-8 border border-[#ffffff30] rounded-lg transparent-black-cards">
      <h5 className="text-[#1a4f265b] text-lg text-shadow-2xs text-shadow-[#ffffffaa]">
        NETVISION
      </h5>
      <PingBtn />
    </section>
  );
};

export default NavBar;
