"use client";

import { Box, Button, TextField } from "@mui/material";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { Toaster, toast } from "sonner";



const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success(email);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center relative ">
      {/*Background Image*/}
      {/* <div className="absolute inset-0 z-0">
        <Image src={"/Bimon-Portrait.jpeg"} alt="bimon" fill />
      </div> */}
      {/* Black Fade Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent/70" />
      <div className="z-30 flex absolute items-center left-2 h-full pl-6 md:pl-0 md:ml-4 lg:ml-8 xl:ml-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-white">
            Login to access all the photos
          </h1>
          <Box
            className="flex flex-col gap-4 mt-6 justify"
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="email"
              label="Email"
              type="text"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              className="text-pink rounded-3xl bg-gray-700"
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              // variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              className="text-pink rounded-3xl bg-gray-700"
            />
           
            <Button
              className="text-inherit w-40 mt-6 justify-center items-center text-white rounded-3xl bg-blue-500 mx-auto"
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </Box>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default LoginPage;
