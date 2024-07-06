import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar_landing = ({ className }: { className?: string }) => {
  return (
    <nav
      className={`navbar_main flex justify-between items-center w-full h-[10vh] px-24 py-8  text-md text-black ${className}`}
    >
      <div className="navigation flex justify-between w-full items-center">
        <div className="left flex gap-16 items-center">
          <Image
            src="/mm.png"
            width={200}
            height={100}
            alt="Picture of the author"
          />
          <div className="quick_access flex gap-10">
            <p className="hover_animation">About Us</p>
            <p className="hover_animation">Contact</p>
            <p className="hover_animation">Services</p>
          </div>
        </div>
        <div className="right flex gap-8 items-center">
          <div className="login flex gap-8">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar_landing;
