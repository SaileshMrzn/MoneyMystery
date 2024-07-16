"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import Navbar_landing from "@/src/components/Navbar_landing";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {Suspense} from 'react';
import Loading from '../loading'

const Login = () => {
  const [signupUser, setSignupUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (
      signupUser.email.length > 0 &&
      signupUser.username.length > 0 &&
      signupUser.password.length > 0
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
    
    setTimeout(()=>{
      
    }, 5000)
    
  }, [signupUser]);

  const handleSignup = async () => {
    try {
      const response = await axios.post("/api/signup", signupUser);

      console.log("Signed up", response.data);

      toast.success("Signup Successful");

      setSignupUser({
        email: "",
        username: "",
        password: "",
      });
    } catch (error: any) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/login", loginUser);

      console.log("Logged in", response.data);
      
      toast.success("Login Successful")

      const userdata: any = await axios.post("/api/fetchEmail", {
        email: loginUser.email,
      });
      const userid = userdata.data.user._id;

      router.push(`/${userid}`);

      setLoginUser({
        email: "",
        password: "",
      });
    } catch (error: any) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Navbar_landing className="fixed top-0" />
      <Suspense fallback={<Loading/>}>
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Loign and start saving some money.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="email">Email/Username</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginUser.email}
                    onChange={(e) => {
                      setLoginUser({ ...loginUser, email: e.target.value });
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginUser.password}
                    onChange={(e) => {
                      setLoginUser({ ...loginUser, password: e.target.value });
                    }}
                  />
                </div>
                <div className="space-y-1 flex justify-between text-sm text-muted-foreground items-center pt-1">
                  <div className="space-x-2">
                    <input type="checkbox" id="check" />
                    <Label htmlFor="check">Remember me</Label>
                  </div>
                  <Label className="cursor-pointer">Forgot Password?</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleLogin}>Login</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>Signup to continue.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={signupUser.email}
                    onChange={(e) => {
                      setSignupUser({ ...signupUser, email: e.target.value });
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={signupUser.username}
                    onChange={(e) => {
                      setSignupUser({ ...signupUser, username: e.target.value });
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={signupUser.password}
                    onChange={(e) => {
                      setSignupUser({ ...signupUser, password: e.target.value });
                    }}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSignup} disabled={btnDisabled}>
                  Signup
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </Suspense>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "",
          duration: 4000,
          style: {
            background: "white",
            color: "black",
          },
        }}
      />
      <div className="absolute bottom-10 text-sm text-muted-foreground">
        <p>2024 &copy; MoneyMystery. All rights reserved</p>
      </div>
    </div>
  );
};

export default Login;

//react-hot-toast
