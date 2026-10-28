import Link from "next/link";
import React from "react";

const Switcher = () => {
  return (
    <div className="flex justify-center items-center gap-4 px-2 py-5">
      <Link
        href="/"
        className="bg-black text-white font-bold py-2 px-4 rounded-2xl cursor-pointer hover:bg-amber-700 outline-0 "
      >
        Music Player
      </Link>
      <Link
        href="/calculator"
        className="bg-black text-white font-bold py-2 px-4 rounded-2xl cursor-pointer hover:bg-amber-700 outline-0"
      >
        Calculator
      </Link>
    </div>
  );
};

export default Switcher;
