import React, { useContext, useState } from "react";
import men from '../assets/Men.webp';
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import LoginService from "../services/Login";
import toast from "react-hot-toast";
import UserContext from "../context/userProvider";

function Login() {
    const [password, setPassword] = useState("");
    const [email, Setemail] = useState("");
    const { setAuthUser } = useContext(UserContext);
    const navigate = useNavigate();
    
    const mutation = useMutation({
        mutationFn: ({ email, password }) => LoginService({ email, password }),
        onSuccess: (data) => {
            toast.success(data.message);
            setAuthUser(data);
            navigate('/home');
        },
        onError: (data) => {
            toast.error(data.message);
        }
    });

    function handleSubmit(e) {
        e.preventDefault();
        mutation.mutate({ email, password });
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-5">
            <div className="bg-gray-800 shadow-2xl rounded-lg flex max-w-4xl w-full">
                {/* Image Section */}
                <div className="hidden md:block w-1/2 relative">
                    <img
                        src={men} // Replace with your image URL
                        alt="Login Visual"
                        className="h-full w-full object-cover rounded-l-lg"
                    />
                    <div className="absolute inset-0 bg-black opacity-50 rounded-l-lg"></div> {/* Overlay */}
                </div>

                {/* Login Form Section */}
                <div className="w-full md:w-1/2 p-8 text-gray-100">
                    <h2 className="text-4xl font-bold text-white text-center mb-4">Welcome Back</h2>
                    <p className="text-center mb-6 text-gray-300">Login to access your account and explore our services.</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium mb-2 text-white">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => Setemail(e.target.value)}
                                className="w-full p-4 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-lg font-medium mb-2 text-white">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-4 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                placeholder="Enter your password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-4 text-center text-gray-300">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
