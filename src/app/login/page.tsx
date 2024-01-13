"use client";

import React from "react";
import { useForm, SubmitHandler, FieldValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchemaType, loginSchema } from "../../models/LoginSchema";
import FormInput from "@/components/Input";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@mui/material";
import axios from "axios";
import { hashPassword } from "../utils/hash-password";

type Inputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data: LoginSchemaType) => {
    try {
      // TODO: send the data to the server
      const hashedPassword = await hashPassword({
        password: data.password,
      });
      console.log(hashedPassword);
      toast(hashedPassword);
    } catch (error) {
      console.log(error);
    }
  };

  const onTestClick = async () => {
    try {
      const res = await axios.post("/api/auth/sign-in", {
        email: "123@gmail.com",
        password: "12345678Ua@",
      });
      if (res.data.status === 401) {
        console.log(res.data.message);
        toast(res.data.message);
        return;
      } else if (res.data.status === 200) {
        console.log(res.data.message);
        toast(res.data.message);
        return;
      }
    } catch (error: any) {
      console.log(error.code);
      if (error.code === "ECONNREFUSED") {
        toast("Server is not running");
        return;
      }
      if (error.code === "ERR_BAD_RESPONSE") {
        toast("Connection error");
        return;
      }
      toast(error.message);
    }
  };
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0'>
        {/* left side */}
        <div className='flex flex-col justify-center p-8 md:p-14'>
          <span className='mb-3 text-4xl font-bold text-black'>Welcome!</span>
          <span className='font-light text-gray-400 mb-8'>
            Enter the email and the password provided.
          </span>
          <Button onClick={onTestClick}>Click</Button>
          <form onSubmit={handleSubmit(onSubmit)} className='py-4 '>
            {/* Email input using the FormInput component */}
            <FormInput
              name='email'
              label='Email'
              type='email'
              id='email'
              register={register}
              error={errors.email}
              disabled={isSubmitting}
            />

            {/* Password input using the FormInput component */}
            <FormInput
              label='Password'
              name='password'
              type='password'
              id='password'
              register={register}
              error={errors.password}
              disabled={isSubmitting}
            />

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full mt-10 bg-black text-white p-2 rounded-lg  hover:scale(0.9)'
              style={{ transition: "all 0.3s ease-in-out" }}
            >
              Sign in
            </button>
          </form>
        </div>
        {/* right side */}
        <div className='relative'>
          <Image
            src='/novs_10_06_-20231128-0001.jpg'
            alt='img'
            className='w-[400px] h-full hidden rounded-r-2xl md:block object-cover'
            width={400}
            height={500}
          />
          {/* text on image */}
          <div className='absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block'>
            <div className='text-center text-white text-xl md:text-lg lg:text-xl xl:text-2xl'>
              Turning fleeting moments
              <br />
              into everlasting memories,
              <br />
              one click at a time
            </div>
          </div>
        </div>
      </div>
      <Toaster position='bottom-right' />
    </div>
  );
};

export default LoginForm;
