import React, { useState } from "react";
import toast from "react-hot-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-600 mb-4">
          Contact Us
        </h1>
        <p className="text-sm sm:text-base text-gray-600 text-center mb-10">
          Got a question, feedback, or just want to say hi? We’d love to hear from you.
        </p>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={changeHandler}
              required
              placeholder="Your Name"
              className="w-full border border-gray-300 p-3 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              required
              placeholder="Your Email"
              className="w-full border border-gray-300 p-3 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={changeHandler}
              required
              placeholder="Your Message"
              className="w-full border border-gray-300 p-3 rounded-md min-h-[120px] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <div className="flex justify-center sm:justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md 
              hover:bg-indigo-700 transition-all w-full sm:w-fit font-medium
              cursor-pointer"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
