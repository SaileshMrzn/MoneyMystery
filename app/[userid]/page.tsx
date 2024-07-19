"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const User = ({ params }: { params: { userid: string } }) => {
  const [user, setUser] = useState("");
    
  useEffect(() => {
    axios
      .post("/api/fetchUser", { userid: params.userid })
      .then((res) => {
        setUser(res.data.user.username);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [params.userid]);

  return (
    <div>
      Hello {user}, hope you&apos;re doing good. <br />
      Let&apos;s get started.
    </div>
  );
};

export default User;
