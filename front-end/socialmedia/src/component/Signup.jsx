import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Register from "../services/Register";

function Signup() {
    
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [fullname, setFullname]=useState("");
    const[username, setUsername]=useState("");
    const navigate=useNavigate()
    const mutation=useMutation({
        mutationFn:({email,password,fullname,username})=>Register({email,password,fullname,username}),
        onSuccess:(data)=>{
            toast.success(data.message)
            navigate('/login')


        },
        onError:(data)=>{
            console.log(data)
            toast.error(data.response.data.message);
        }
    })
    function handleSubmit(e)
    {
        e.preventDefault();
        mutation.mutate({fullname,email,username,password});
        setEmail("");
        setFullname("");
        setPassword("");
        setUsername("");
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg flex max-w-4xl">
        {/* Image Section */}
        <div className="hidden md:block w-1/2">
          <img
            src="https://static.vecteezy.com/system/resources/previews/024/785/837/non_2x/3d-male-character-working-on-a-laptop-free-png.png" // Replace with your image URL
            alt="Signup Visual"
            className="h-full w-full object-cover rounded-l-lg"
          />
        </div>

        {/* Signup Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Create an Account
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Fill in the details to sign up for your account.
          </p>
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-gray-700 font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullname}
                onChange={(e)=>setFullname(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>
            {/* Username */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Choose a username"
              />
            </div>
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Sign Up
              
            </button>
          </form>
          <p className="mt-4 text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
