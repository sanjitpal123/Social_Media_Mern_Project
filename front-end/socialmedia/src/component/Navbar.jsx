import React, { useContext } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"; // Import new search icon from Heroicons
import UserContext from "../context/userProvider"; // Assuming the user context is set up to hold auth data

function Navbar() {
 
   const {user}=useContext(UserContext)
  return (
    <div className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Side: Social Media Name */}
        <div className="text-white text-2xl font-bold italic">
          <span className="hover:text-blue-300 transition-all">MySocialMedia</span>
        </div>

        {/* Center: Search Bar */}
        <div className="relative flex-grow max-w-xs md:max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 rounded-full border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="absolute right-1 top-1 text-blue-700 p-2 hover:text-blue-500">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Right Side: Login User's Profile Picture */}
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-white">{user.name}</span> {/* User name or email */}
            <img
              src={user.profilePicture} // Assuming the user object has a 'profilePicture' field
              alt="User Profile"
              className="h-10 w-10 rounded-full border-2 border-white"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
