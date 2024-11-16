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
import { Suspense } from "react";
import Loading from "../loading";

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
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errors2, setErrors2] = useState({
    email: "",
    password: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const router = useRouter();

  const validateSignUp = () => {
    const validationErrors = { email: "", username: "", password: "" };
    let isValid = true;

    // Validate email
    if (!signupUser.email || !loginUser.email) {
      validationErrors.email = "Email is required.";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(signupUser.email)) {
        validationErrors.email = "Invalid email format.";
        isValid = false;
      }
    }

    // Validate username
    if (!signupUser.username) {
      validationErrors.username = "Username is required.";
      isValid = false;
    }

    // Validate password
    if (!signupUser.password || !loginUser.password) {
      validationErrors.password = "Password is required.";
      isValid = false;
    } else if (signupUser.password.length < 6) {
      validationErrors.password =
        "Password must be at least 6 characters long.";
      isValid = false;
    }

    // Update the errors state
    setErrors(validationErrors);

    return isValid;
  };
  
  const validateLogin = () => {
    const validationErrors = { email: "", password: "" };
    let isValid = true;

    // Validate email
    if (!loginUser.email) {
      validationErrors.email = "Email is required.";
      isValid = false;
    }

    // Validate password
    if (!loginUser.password) {
      validationErrors.password = "Password is required.";
      isValid = false;
    } 

    setErrors2(validationErrors);

    return isValid;
  };

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

    setTimeout(() => {}, 5000);
  }, [signupUser]);

  const handleSignup = async () => {
    if (validateSignUp()) {
      try {
        setSignUpLoading(true);
        const response = await axios.post("/api/signup", signupUser);
        setSignupUser({
          email: "",
          username: "",
          password: "",
        });
        toast.success("Signup Successful");
      } catch (error: any) {
        console.log(error.response.data);
        toast.error(error.response?.data?.error || "Something went wrong");
      } finally {
        setSignUpLoading(false);
      }
    }
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      try {
        setLoginLoading(true);
        const response = await axios.post("/api/login", loginUser);
        setLoginLoading(false);
        const userdata: any = await axios.post("/api/fetchEmail", {
          email: loginUser.email,
        });
        const userid = userdata.data.user._id;
        toast.success("Login Successful");
        setTimeout(() => {
          router.push(`/${userid}`);
        }, 2000);
        setLoginUser({
          email: "",
          password: "",
        });
      } catch (error: any) {
        toast.error(error.response?.data?.error || "Something went wrong");
        console.log(error);
      } finally {
        setLoginLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
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
      <Navbar_landing className="fixed top-0" />
      <Suspense fallback={<Loading />}>
        <Tabs defaultValue="login" className="md:w-[400px] w-[300px]">
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
                  {errors2.email && (
                    <p className="text-sm text-red-400">{errors2.email}</p>
                  )}
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
                  {errors2.password && (
                    <p className="text-sm text-red-400">{errors2.password}</p>
                  )}
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
                <Button onClick={handleLogin}>
                  {loginLoading ? "Loading..." : "Login"}
                </Button>
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
                    required
                    value={signupUser.email}
                    onChange={(e) => {
                      setSignupUser({ ...signupUser, email: e.target.value });
                    }}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    required
                    value={signupUser.username}
                    onChange={(e) => {
                      setSignupUser({
                        ...signupUser,
                        username: e.target.value,
                      });
                    }}
                  />
                  {errors.username && (
                    <p className="text-sm text-red-400">{errors.username}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={signupUser.password}
                    onChange={(e) => {
                      setSignupUser({
                        ...signupUser,
                        password: e.target.value,
                      });
                    }}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-400">{errors.password}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSignup} disabled={btnDisabled}>
                  {signUpLoading ? "Loading..." : "Signup"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </Suspense>
      <div className="absolute bottom-10 text-sm text-muted-foreground">
        <p>2024 &copy; MoneyMystery. All rights reserved</p>
      </div>
    </div>
  );
};

export default Login;

//react-hot-toast
