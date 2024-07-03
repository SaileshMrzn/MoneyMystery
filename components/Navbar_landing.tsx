import React from "react";
import Image from "next/image";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

const Navbar_landing = () => {
  return (
    <nav>
      <div className="navbar_main flex justify-between items-center w-full h-[10vh] relative border border-slate-200 px-16 font-round">
        <div className="navigation flex justify-between w-full px-8 items-center">
          <Image
            src="/mm.png"
            width={250}
            height={100}
            alt="Picture of the author"
          />
          <div className="right flex gap-8 items-center">
            <div className="quick_access flex gap-8">
              <p className="hover_animation">About</p>
              <p className="hover_animation">Contact</p>
              <p className="hover_animation">Services</p>
            </div>

            <div className="login flex gap-4 ">
              <button className="text-green hover_animation">Login</button>
              <button className="text-green hover_animation">Signup</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar_landing;
