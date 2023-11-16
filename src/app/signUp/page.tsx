"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../models/LoginSchema";
import FormInput from "@/components/Input";
import { useRouter } from "next/navigation"; // Import useRouter from next/router
import { Toaster, toast } from "sonner";
import Link from "next/link";

type Inputs = {
  email: string;
  password: string;
};

// ... (import statements)

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // TODO: Implement your login logic here
    // For now, simulate a successful login
    const isAuthenticated = true;

    if (isAuthenticated) {
      toast.success(`You have successfully logged in.`);
      // Redirect to the gallery page after successful login
      router.push("/gallery");
    } else {
      toast.error(`Login failed. Please check your credentials.`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* left side */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome back! Please enter your details
          </span>
          <form onSubmit={handleSubmit(onSubmit)} className="py-4">
            {/* Email input using the FormInput component */}
            <FormInput
              label="Email"
              type="email"
              id="email"
              register={register}
              error={errors.email}
              disabled={isSubmitting}
            />

            {/* Password input using the FormInput component */}
            <FormInput
              label="Password"
              type="password"
              id="password"
              register={register}
              error={errors.password}
              disabled={isSubmitting}
            />

            <div className="flex justify-between w-full py-4">
              <div className="mr-24">
                <input type="checkbox" name="ch" id="ch" className="mr-2" />
                <span className="text-md">Remember for 30 days</span>
              </div>
              <span className="font-bold text-md">Forgot password</span>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:scale(0.9)"
              style={{ transition: "all 0.3s ease-in-out" }}
            >
              Sign in
            </button>
          </form>

          <button className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover-bg-black hover-text-white">
            <img
              // src="https://img.icons8.com/material/24/google-logo--v1.png"
              src="https://img.icons8.com/color/48/google-logo.png"
              alt="img"
              className="w-6 h-6 inline mr-2"
            />
            Sign in with Google
          </button>
          <div className="text-center text-gray-400">
            Don't have an account?
            <Link href="/signup">
              <span className="font-bold text-black">Sign up for free</span>
            </Link>
          </div>
        </div>
        {/* right side */}
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          {/* text on image */}
          <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <span className="text-white text-xl">
              We've been using Untitle to kick
              <br />
              start every new project and can't <br />
              imagine working without it.
            </span>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default SignUp;
