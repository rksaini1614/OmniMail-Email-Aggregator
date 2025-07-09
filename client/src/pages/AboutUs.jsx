import React from "react";

const AboutUs = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-2xl shadow-2xl p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-indigo-600 mb-6">
          About Us
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-center text-gray-600 mb-8">
          <strong>OmniMail</strong> is your all-in-one email dashboard. 
          We help you manage multiple inboxes effortlessly from a single place — clean, fast, and smart.
        </p>

        <div className="space-y-6 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
          <p>
            In a world flooded with notifications and fragmented inboxes, <strong>OmniMail </strong> 
            emerged with a simple goal: <strong>to simplify email management</strong>. Whether you're a creator juggling sponsorships, 
            a professional balancing work-life emails, or just someone tired of switching tabs — OmniMail brings everything to one screen.
          </p>

          <p>
            This web application is created using <strong>MERN (MongoDB, Express, React, Node.js) Stack,
            TailwindCSS, JWT (JsonWebToken), Google APIs (Gmail APIs like OAuth2).</strong>
          </p>

          <p>
            Created by a passionate developer — <strong>Ritik Saini</strong>, 
            an IT student pursuing his B.Tech degree from <strong>Delhi Technological University (DTU).</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
