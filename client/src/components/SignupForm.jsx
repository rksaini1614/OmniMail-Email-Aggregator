import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HighlightText from './commoN/HighlightText';
import { EyeIcon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const SignupForm = () => {
  const { sendOtp,setSignupData,getUser } = useAppContext();
  const [formData, setFormData] = useState({
    firstName: "", 
    lastName: "", 
    email: "", 
    password: "", 
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const existingUser = await getUser(formData.email);

    if (existingUser) {
      toast.error("User already registered");
      navigate("/login");
      return;
    }
    else{
        try{
            const result = await sendOtp(formData.email);
            if(result){
                setSignupData(formData);
                navigate("/verify");
            }
        }
        catch(err){
            console.log("Signup Error : ",err.message);
        }
    }
 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-omni-color mb-6">
          Sign Up to <HighlightText text={"OmniMail"} />
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={type1}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <EyeIcon onClick={() => setType1(type1 === 'password' ? 'text' : 'password')}
              className="absolute right-3 top-1/3 transform cursor-pointer" />
            <p className="text-sm text-gray-500 mt-1">(Password must contain at least 6 characters)</p>
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type={type2}
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <EyeIcon onClick={() => setType2(type2 === 'password' ? 'text' : 'password')}
              className="absolute right-3 top-1/2 transform cursor-pointer" />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white 
            cursor-pointer font-semibold rounded-lg hover:bg-indigo-700 transition-all"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
