import React from 'react'
import Image from 'next/image'; 
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-14 px-10 md:px-20 text-sm text-gray-600 bg-[#dad7cd] tracking-wide h-fit">
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-12 border-b border-purple pb-8">
        
        <div className="desc self-start w-full md:w-[50%]">
          <div className="logo">
            <Image src="/mm_black.png" alt="Logo" height={100} width={160} />
          </div>
          <div className="text mt-4">
            <p className="leading-6">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque porro amet quam voluptatum veritatis nulla quas
              cupiditate facilis culpa reprehenderit!
            </p>
          </div>
        </div>

        <div className="contact self-start">
          <h2 className="uppercase tracking-widest">Contact Us</h2>
          <ul className="flex flex-col gap-2 mt-4">
            <li>moneymystery@gmail.com</li>
            <li>Kirtipur-05, Kathmandu, Nepal</li>
            <li>+977 9840510225</li>
          </ul>
        </div>

        <div className="follow self-start">
          <h2 className="uppercase tracking-widest">Follow Us</h2>
          <div className="icons flex mt-4 gap-4">
            <FaFacebook size={25} className="icon_hover" />
            <FaLinkedin size={25} className="icon_hover" />
            <FaInstagram size={25} className="icon_hover" />
          </div>
        </div>
        
      </div>

      <div className="cc">
        <p className="text-right pt-8">
          &copy; 2024 MoneyMystery. All rights reserved
        </p>
      </div>
      
    </footer>
  );
}
