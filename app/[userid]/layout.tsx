"use client";

import Navbar from "@/src/components/Navbar";
import { Suspense } from "react";
import Loading from "./loading";
import { useAppContext } from "@/src/context";

export default function LoggedInLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  const { state } = useAppContext();

  return (
    <div>
      <Navbar userid={params.userid} />
      <Suspense fallback={<Loading />}>
        <div
          className={`${
            state === true
              ? "opacity-0 md:mx-[22%] md:opacity-100"
              : "opacity-100 mx-10"
          } mt-4 transition-all ease-in-out duration-500`}
        >
          {children}
        </div>
      </Suspense>
    </div>
  );
}
