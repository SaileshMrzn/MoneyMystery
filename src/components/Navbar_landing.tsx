"use client"

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiMenu3Fill, RiCloseLine } from "react-icons/ri";

const Navbar_landing = ({ className }: { className?: string }) => {
  
  const[menubar, setMenubar] = useState(false)
  
  return (
    <nav
      className={`navbar_main flex justify-between items-center w-full h-[10vh] px-10 lg:px-20 py-8  text-md text-black ${className}`}
    >
      <div className="navigation flex justify-between w-full items-center">
        <div className="left flex gap-16 items-center">
          <Link href="/">
            <Image
              src="/mm.png"
              width={200}
              height={100}
              alt="Picture of the author"
            />
          </Link>
          {/* <div className="quick_access hidden lg:flex gap-10">
            <p className="hover_animation">About Us</p>
            <p className="hover_animation">Contact</p>
            <p className="hover_animation">Services</p>
          </div> */}
        </div>
        <div className="right flex gap-8 items-center">
          <div className="login hidden lg:flex gap-8">
            <Link href="/login">
              <button className="border-2 border-green/90 px-6 py-1 hover:bg-green rounded-lg hover:text-white">
                Login
              </button>
            </Link>
            <Link href="/login">
              <button className="border-2 border-green/90 px-6 py-1 hover:bg-green rounded-lg hover:text-white">
                Signup
              </button>
            </Link>
          </div>
          <div className="hamburger cursor-pointer lg:hidden">
            <RiMenu3Fill
              size={20}
              className="text-green"
              onClick={() => setMenubar(true)}
            />
          </div>
        </div>
      </div>

      <div
        className={`${
          menubar === true ? "flex translate-x-0" : "translate-x-full"
        }  menubar h-[100vh] w-[50%] md:w-[30%] absolute lg:hidden right-0 top-0 bg-white z-30 p-6 flex-col gap-1 transition-all ease-in-out duration-500`}
      >
        <RiCloseLine
          className="self-end cursor-pointer"
          onClick={() => setMenubar(false)}
        />

        {/* <ul className="flex flex-col gap-6 pt-4">
          <li className="hover_animation w-fit">About Us</li>
          <li className="hover_animation w-fit">Contact</li>
          <li className="hover_animation w-fit">Services</li>
        </ul> */}

        <div className="buttons mt-6">
          <Link href="/login">
            <button className="border-2 border-green/90 px-6 py-1 hover:bg-green rounded-lg hover:text-white w-full">
              Login
            </button>
          </Link>
          <Link href="/login">
            <button className="border-2 border-green/90 px-6 py-1 hover:bg-green rounded-lg hover:text-white w-full mt-4">
              Signup
            </button>
          </Link>
        </div>
      </div>

      <div
        className={`${
          menubar === true ? "block" : "hidden"
        } overlay absolute top-0 left-0 w-full h-screen bg-black/50 z-20 lg:hidden`}
        onClick={() => setMenubar(false)}
      ></div>
    </nav>
  );
};

export default Navbar_landing;
