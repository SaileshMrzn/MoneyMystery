import React from "react";
import Navbar_landing from "@/src/components/Navbar_landing";
import { GoArrowRight } from "react-icons/go";
import Link from "next/link";

const Landing = () => {
  return (
    <div className="">
      <Navbar_landing />
      <div className="relative px-24 py-4 h-[90vh]">
        {/* Overlay with reduced opacity */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900/60 z-0"></div>

        {/* Background image */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-leo bg-center bg-cover bg-no-repeat z-[-1]"></div>

        {/* Content */}
        <div className="text_container relative z-10 text-white flex justify-center items-center h-full">
          <div className="text w-[85%] flex flex-col gap-8 justify-center items-center">
            <p className="text-6xl">Wondering where all your money went?</p>
            <p className="text-xl">
              Don&apos;t worry. We got you covered with our expense tracker.
            </p>
            <Link href="/login">
              <button className="border-2 bg-green border-green px-8 py-4 font-bold flex items-center gap-2 hover:translate-x-2 transition-all ease-in-out duration-200 rounded-lg">
                Start tracking expense
                <GoArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
