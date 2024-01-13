"use client";

// Navbar.js
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Bimon";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <header className="fixed w-full top-0 flex items-center justify-between p-4 sm:p-10 h-[90px] z-30">
      {/* Logo and Name */}
      <div className="flex items-center space-x-4">
        <Image
          src="" // Replace with your actual logo image path
          alt="Logo"
          width={32}
          height={32}
        />
        <span className="uppercase text-xl font-medium">{siteName}</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden sm:flex items-center space-x-4">
        <Link href="/login" className="hover:bg-opacity-90 pr-4 text-white">
          Sign In
        </Link>
        <Link href="/" className="hover:bg-opacity-90 pr-4 text-white">
          Home
        </Link>
        <Link href="/gallery" className="hover:bg-opacity-90 pr-4 text-white">
          Gallery
        </Link>
        <Link
          href="/upload"
          target="_blank"
          className="hover:bg-opacity-90 pr-4 text-white"
        >
          Upload
        </Link>
      </div>

      {/* Dropdown Menu for smaller screens */}
      <div className="sm:hidden">
        <button
          onClick={toggleDropdown}
          className="text-white focus:outline-none"
        >
          ☰
        </button>
        {showDropdown && (
          <div className="absolute top-16 right-4 bg-black p-4 rounded shadow text-white">
            <Link href="/login" className="block mb-2">
              Sign In
            </Link>
            <Link href="/" className="block mb-2">
              Home
            </Link>
            <Link href="/upload" className="block">
              Upload
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
