import React from "react";
import Navbar_landing from "@/src/components/Navbar_landing";
import { GoArrowRight } from "react-icons/go";
import Link from "next/link";

const Landing = () => {
  return (
    <div className="">
      <Navbar_landing />
      <div className="relative md:px-24 px-6 py-4 h-[90vh]">
        {/* Overlay with reduced opacity */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900/60 z-0"></div>

        {/* Background image */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-leo bg-center bg-cover bg-no-repeat z-[-1]"></div>

        {/* Content */}
        <div className="text_container relative z-10 text-white flex md:justify-center items-center h-full">
          <div className="text w-[85%] flex flex-col gap-8 justify-center items-start md:items-center text-left md:text-center">
            <p className="lg:text-6xl md:text-5xl text-4xl leading-[3rem]">
              Wondering where all your money went?
            </p>
            <p className="lg:text-xl md:text-base leading-7">
              Don&apos;t worry. We got you covered with our expense tracker.
            </p>
            <Link href="/login">
              <button className="border-2 bg-green border-green p-4 md:px-8 md:py-4 font-bold flex items-center gap-2 hover:translate-x-2 transition-all ease-in-out duration-200 rounded-lg text-sm lg:text-base">
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
