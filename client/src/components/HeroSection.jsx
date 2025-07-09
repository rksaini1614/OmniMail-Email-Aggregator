import React from "react";
import { useNavigate } from "react-router-dom";
import TypewriterHero from "./TypewritterHero";

const HeroSection = () => {

    const navigate = useNavigate();
    return (

        <div className="h-[580px] flex flex-col items-center justify-center px-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 border border-gray-500/30 rounded-full bg-gray-300/15 pl-4 p-1 text-sm text-gray-800 max-w-full">
            <p>Introducing OmniMail – Smarter, Sleeker, Faster.</p>
            <div className="flex items-center cursor-pointer gap-2 bg-white border border-gray-500/30 rounded-2xl px-3 py-1 whitespace-nowrap"
            onClick={() => {navigate("/signup"),scrollTo(0,0)}}>
            <p>Explore</p>
            <svg
                width="12"
                height="9"
                viewBox="0 0 12 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5"
                stroke="#6B7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </svg>
            </div>
        </div>

        {/* Heading */}
        <div className="text-7xl sm:text-5xl md:text-6xl font-bold max-w-4xl">
            <TypewriterHero/>
        </div>

        {/* Subtext */}
        <p className="max-w-xl text-center mt-6 px-4 text-gray-600">
            OmniMail lets you connect multiple accounts and manage your emails effortlessly in one place. Say goodbye to switching tabs, and hello to unified communication.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button className="px-7 py-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-medium cursor-pointer
            " onClick={() => {navigate("/signup"),scrollTo(0,0)}}>
            Get Started
            </button>
            <button className="group border border-indigo-500 rounded text-indigo-600 px-7 py-2.5 flex items-center gap-2 font-medium cursor-pointer
            hover:bg-indigo-200 hover:text-white"
            onClick={() => {navigate("/login"),scrollTo(0,0)}}>
            Learn more
            
            </button>
        </div>
    </div>
  );
};

export default HeroSection;
