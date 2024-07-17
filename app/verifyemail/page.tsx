"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const urlToken = useSearchParams()?.get("token");

  useEffect(() => {
    // const urlToken = query.token;
    // const urlToken = window.location.search.split("=")[1];
    setToken(urlToken as string);

    if (!urlToken) {
      setError(true);
    }
  }, [urlToken]);

  const handleVerify = async () => {
    try {
      console.log(token);
      await axios.post("/api/verifyEmail", { token });
      setVerified(true);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2">
      <h1>Verify your email</h1>
      {!error && (
        <button onClick={handleVerify} className="text-green hover_animation">
          Click Here
        </button>
      )}
      {verified && (
        <h2>
          User Verified. Go to
          <Link href={"/login"} className="text-blue-500">
            Login
          </Link>
        </h2>
      )}
      {error && <h2>Something went wrong</h2>}
    </div>
  );
}
