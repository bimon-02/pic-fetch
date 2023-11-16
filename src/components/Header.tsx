import Link from 'next/link';
import React from 'react'

const Header = () => {
  return (
    <header className="fixed w-full  top-0 flex items-center justify-between p-10 h-[90px] z-30">
      <span className="uppercase text-xl font-medium">Mark's Photography</span>
      {/* <div>Pic Fetch</div> */}
      <Link
        href="/login"
        className="bg-white p-2 rounded-3xl text-black hover:bg-opacity-90"
      >
        Sign In
      </Link>
      <Link
        href="/"
        className="bg-white p-2 rounded-3xl text-black hover:bg-opacity-90"
      >
        Home
      </Link>
    </header>
  );
}

export default Header