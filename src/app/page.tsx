

import React from "react";
import LoginForm from "./login/page";
import Portfolio from "../Tempo/Portfolio";
import Link from "next/link";
// import LoginForm from "@/app/LoginPage";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl mb-6">Welcome to My Portfolio</h1>
      <p className="text-lg mb-8">
        Explore my amazing work and don't miss the chance to see more!
      </p>
      {/* Link to the login page */}
      <Link href="/login">
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 rounded-full text-white hover:opacity-90 transition duration-300">
          Sign In
        </button>
      </Link>
    </div>
  );
};

export default Home;
