"use client";

import Navbar from "@/src/components/Navbar";
import { Suspense } from "react";
import Loading from "./loading";
import { useAppContext } from "@/src/context";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}>
          <div
            className={`${
              state === true
                ? "opacity-0 md:px-[22%] md:opacity-100"
                : "opacity-100 px-10"
            } pt-4 transition-all ease-in-out duration-500 dark:bg-[#22223b] min-h-[90vh]`}
          >
            {children}
          </div>
        </QueryClientProvider>
      </Suspense>
    </div>
  );
}
