"use client";

// pages/login.js
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { loginSchema } from "../schemas/loginSchema";
import { loginSchema } from "../utils/validationSchemas";


const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    // For simplicity, check for invalid credentials
    if (data.email !== "user@example.com" || data.password !== "password") {
      alert("Invalid credentials! Please try again.");
    } else {
      // You can replace this with your authentication logic
      alert("Login successful!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full px-4">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`border rounded-md px-4 py-2 w-full ${
              errors.email ? "border-red-500" : ""
            }`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`border rounded-md px-4 py-2 w-full ${
              errors.password ? "border-red-500" : ""
            }`}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
