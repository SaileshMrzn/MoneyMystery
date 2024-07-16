import Navbar from "@/src/components/Navbar";
import { Suspense } from "react";
import Loading from "./loading";

export default function LoggedInLayout({
  children,
  params,
}:
Readonly<{
  children: React.ReactNode,
  params: any,
}>) {
  
  console.log(params.userid)
  return (
    <div>
      <Navbar userid ={params.userid}/>
      <Suspense fallback={<Loading/>}>
      {children}
      </Suspense>
    </div>
  );
}
