"use client";

import React, { useState, useEffect, ReactElement } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";
import { IoAnalyticsOutline } from "react-icons/io5";
import { MdOutlineHistory, MdLogout, MdDarkMode } from "react-icons/md";
import {
  FaUserGraduate,
  FaUserNinja,
  FaUserMd,
  FaUserInjured,
  FaUserAstronaut,
  FaUserSecret,
} from "react-icons/fa";
import Image from "next/image";
import NavLink from "./NavLink";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context";
import Switch from "@/src/components/ui/switch";

const Navbar = ({ userid }: { userid: String }) => {
  const [randomIcon, setRandomIcon] = useState<ReactElement | null>(null);
  const [user, setUser] = useState<any>({});
  const [sidenav, setSidenav] = useState(true)

  console.log(userid);

  const router = useRouter();
  
  const {setState} = useAppContext();
  setState(sidenav)

  const handleLogout = async () => {
    try {
      await axios.get("/api/logout")
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const userIconList: ReactElement[] = [
      <FaUserGraduate key="FaUserGraduate" />,
      <FaUserNinja key="FaUserNinja" />,
      <FaUserMd key="FaUserMd" />,
      <FaUserInjured key="FaUserInjured" />,
      <FaUserAstronaut key="FaUserAstronaut" />,
      <FaUserSecret key="FaUserSecret" />,
    ];

    const randomIndex = Math.floor(Math.random() * userIconList.length);
    setRandomIcon(userIconList[randomIndex]);

    const fetchData = async () => {
      try {
        const response = await axios.post("/api/fetchUser", { userid });
        setUser(response.data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [userid]);

  console.log(user);

  return (
    <>
      <div className="navbar_main flex justify-between items-center w-full h-[10vh] relative border border-slate-200 dark:bg-[#22223b]">
        <div className="navigation flex justify-between w-full px-8 items-center">
          <HiOutlineMenuAlt2
            className="h-8 w-8 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 p-1 object-cover cursor-pointer"
            onClick={() => setSidenav(!sidenav)}
          />
          <Image
            src="/mm.png"
            width={220}
            height={100}
            alt="Picture of the author"
          />
          <div></div>
        </div>
      </div>

      <div
        className={`${
          sidenav ? "translate-x-0" : "-translate-x-full"
        } navbar_side h-[90vh] w-[50%] md:w-[20%] border border-x-slate-200 absolute px-4 py-4 flex flex-col justify-between transition-all ease-in-out duration-500 dark:bg-[#22223b]`}
      >
        <div className="section_1">
          <div className="user_info flex items-center gap-4 px-2 pb-6 ">
            <div className="border border-purple rounded-full h-10 w-10 flex items-center justify-center object-cover scale-110">
              {randomIcon}
            </div>
            <div>
              <p>{user?.user?.username}</p>
              <p className="text-xs">{user?.user?.email}</p>
            </div>
          </div>

          <div className="routes border-t border-slate-400 pt-1">
            <NavLink href={`/${userid}/expense`} className="sidebar_content">
              <FaRegMoneyBill1 className="icon" />
              <p>Add Expense</p>
            </NavLink>
            <NavLink href={`/${userid}/dashboard`} className="sidebar_content">
              <RiDashboardFill className="icon" />
              <p>Dashboard</p>
            </NavLink>
            <NavLink href={`/${userid}/analytics`} className="sidebar_content">
              <IoAnalyticsOutline className="icon" />
              <p>Analytics</p>
            </NavLink>
            <NavLink href={`/${userid}/history`} className="sidebar_content">
              <MdOutlineHistory className="icon" />
              <p>History</p>
            </NavLink>
          </div>
        </div>

        <div className="section_2 border-t border-slate-400 pt-1">
          <div className="sidebar_content" onClick={handleLogout}>
            <MdLogout className="icon" />
            <p>Logout</p>
          </div>
          <div className="sidebar_content">
            <MdDarkMode className="icon" />
            <p>Dark mode</p>
            <Switch />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

// 	#EDEAE0 	#BBB3DB Crete Round
