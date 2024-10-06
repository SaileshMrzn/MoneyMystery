"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const User = ({ params }: { params: { userid: string } }) => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      await axios
        .post("/api/fetchUser", { userid: params.userid })
        .then((res) => {
          setLoading(false)
          setUser(res.data.user.username);
        })
        .catch((err) => {
          setLoading(false)
          console.log(err.message);
        });
    };

    fetchUser();
  }, [params.userid]);
  
{if(loading){
  return <p className="text-green text-center">Just a moment...</p>;
}}

  return (
    <div>
      Hello {user}, hope you&apos;re doing good. <br />
      Let&apos;s get started.
    </div>
  );
};

export default User;
