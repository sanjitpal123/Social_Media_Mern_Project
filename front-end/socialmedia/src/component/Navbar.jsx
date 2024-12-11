import React, { useContext } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import UserContext from "../context/userProvider";

function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-gradient-to-r from-gray-900 top-[-1] to-black fixed w-full z-[1] p-4 shadow-xl">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Side: Social Media Name */}
        <div className="text-white text-2xl font-bold italic hover:text-gray-300 transition-all duration-300 ease-in-out cursor-pointer">
          <span className="transform hover:scale-105">MySocialMedia</span>
        </div>

        {/* Center: Search Bar */}
        <div className="relative flex-grow max-w-xs md:max-w-lg">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-4 rounded-full border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 hover:border-gray-400"
          />
          <button className="absolute right-2 top-2 text-gray-300 p-2 hover:text-gray-500 transition-all duration-200">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Right Side: Login User's Profile Picture */}
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-white text-lg font-medium hover:text-gray-400 transition-all duration-300 cursor-pointer">
              {user.name}
            </span>
            <img
              src={user.profilePicture}
              alt="User Profile"
              className="h-14 w-14 rounded-full border-2 border-white shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
