import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authApis } from "../services/apis";
import Loader from "../components/common/Spinner";

const VerifyOtp = () => {
  const {signupData, sendOtp,setSignupData} = useAppContext();
  const [userOtp, setUserOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Send OTP when page loads
  useEffect(() => {
    if(!signupData.email){
        toast.error("No signup data found. Please signup again");
        navigate("/signup");
    }
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);

    try{
        const res = await axios.post(authApis.SIGNUP_API,
            {
                ...signupData,
                otp : userOtp
            }
        );

        if(res.data.success) {
            toast.success("Signup Successfull!");
            setSignupData({});
            navigate("/login");
        }
        else{
            toast.error(res.data.message || "OTP verification failed")
        }
    }
    catch(err){
        toast.error("Error verifying OTP :",err.message);
    }
    finally{
        setLoading(false);
    }
  }

 const resendOtp = async() => {
    await sendOtp(signupData.email);
 }

  return !loading ? (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4 text-center">Verify OTP</h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Enter the OTP sent to your email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={userOtp}
            onChange={(e) => setUserOtp(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter OTP"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <button
          onClick={resendOtp}
          className="mt-4 text-sm text-indigo-600 hover:underline"
        >
          Resend OTP
        </button>
      </div>
    </div>
  ): (
    <Loader/>
  )
};

export default VerifyOtp;
