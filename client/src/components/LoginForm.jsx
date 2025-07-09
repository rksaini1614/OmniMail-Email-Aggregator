import { useState } from "react";
import { EyeIcon } from "lucide-react"; // Ensure you have @heroicons/react installed
import React from "react";
import HighlightText from "./common/highlightText";
import {useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";



const LoginForm = () => {

    const [type, setType] = useState("password");
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const {getUser,login, setLoading} = useAppContext();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("Login submitted:", form);
        console.log("getuser se pehle :")
        const userDetails = await getUser(form.email);
        console.log("getuser k baad :");
        console.log("user :",userDetails);
        if(!userDetails){
            console.log("nahi mila");
            toast.error("User is not register!");
            //navigate("/signup");
            setLoading(false);
        }else{
            console.log("login m error")
            const success = await login(form.email,form.password)
                
            if(success) {
                navigate("/");
            }
        }
        
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-6">Login to <HighlightText text={"OmniMail"} /></h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
                </label>
                <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                required
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
                </label>
                <input
                type= {type}
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <EyeIcon onClick={() => {
                type === 'password' ? setType('text') : setType('password');
            }} className='absolute right-3 top-1/2 transform cursor-pointer' />
            </div>

            <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white 
                cursor-pointer font-semibold rounded-lg hover:bg-indigo-700 transition-all"
            >
                Login
            </button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <a href="/signup" className="text-indigo-600 hover:underline">
                Sign Up
            </a>
            </div>
        </div>
        </div>
    )
};

export default LoginForm;
