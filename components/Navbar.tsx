import React from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

const Navbar = () => {
  return (
    <>
      <div className="navbar_main flex justify-between items-center w-full h-[10vh] border border-red-900 relative">
        <div className="navigation flex justify-between w-full border border-blue-500 px-8 items-center">
          <HiOutlineMenuAlt2 className="h-8 w-8 rounded-full hover:bg-slate-200 p-1 object-cover cursor-pointer" />
          <h1>[Title]</h1>
          <div></div>
        </div>
      </div>

      <div className="navbar_side h-[90vh] w-[18%] border border-green-500 absolute px-4 py-4">
        <p className="sidebar_content">Add expense</p>
        <p className="sidebar_content">Dashboard</p>
        <p className="sidebar_content">Analytics</p>
        <p className="sidebar_content">History</p>
      </div>
    </>
  );
};

export default Navbar;
