import React, { useContext, useState } from "react";
import men from '../assets/Men.webp';
import { Link, useNavigate } from "react-router-dom";
import { use } from "react";
import { useMutation } from "@tanstack/react-query";
import LoginService from "../services/Login";
import toast from "react-hot-toast";
import UserContext from "../context/userProvider";

function Login() {
    const [password, setPassword]=useState("");
    const [email, Setemail]=useState("");
    const {setAuthUser}=useContext(UserContext)
    const navigate=useNavigate()
    const mutation=useMutation({
        mutationFn:({email,password})=>LoginService({email,password}),
        onSuccess:(data)=>{
            console.log('d',data)
            toast.success(data.message)
            setAuthUser(data)
            navigate('/home');
         
        },
        onError:(data)=>{
            console.log(data)
        }
        
    })
    function handleSubmit(e)
    {
        e.preventDefault()
        console.log('email',email);
        console.log('password',password);
        mutation.mutate({email,password})

    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl">
        {/* Image Section */}
        <div className="hidden md:block w-1/2">
          <img
            src={men} // Replace with your image URL
            alt="Login Visual"
            className="h-full w-full object-cover rounded-l-lg"
          />
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome Back</h2>
          <p className="text-gray-600 mb-6">
            Login to access your account and explore our services.
          </p>
          <form>
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
                onChange={(e)=>Setemail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
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
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
