import { createContext, useContext } from "react"
import App from "../App";
import { authApis, userApis } from "../services/apis";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext();

export const AppProvider = ( {children}) => {

    
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [otpEmail, setOtpEmail] = useState("");
    const [signupData, setSignupData] = useState({});
    const navigate = useNavigate();


    const login = async(email,password) => {
        try{

            console.log( "email and pass : ",email,password);
            const response = await axios.post(authApis.LOGIN_API, {email,password});

            console.log("Res data:",response.data);
            if(response.data.success){
                const {token,user} = response.data;
                localStorage.setItem('token', token);
                setUser(user);
                setLoading(false);
                toast.success("Login successful");
                return true;
            }
            else{
                toast.error("Login failed: " + response.data.message);
                setLoading(false);
                return false;
            } 
        }
        catch(error){
            toast.error("Error logging in:", error);
            setLoading(false);
            return false; 
        }
    }

    const getUser = async (email) => {
    try {
        const res = await axios.get(`${userApis.GET_USER_API}`,{params : {email}});

        if (res.data && res.data.user) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error in getUser:", error.message);
        return false;
    }
    };

    const sendOtp = async (email) => {
        try {
            setLoading(true);
            const res = await axios.post(authApis.SENDOTP_API, { email: email });
            if (res.data.success) {
                toast.success("OTP sent to email");
                setOtpEmail(email);
                return true;
            } else {
                toast.error(res.data.message);
                return false;
            }
        } catch (err) {
            console.error("Error sending OTP:", err.message);
            toast.error("Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const verifyOtpAndSignup = async (otp) => {
        const {firstName, lastName, email, password, confirmPassword } = signupData;
        try {
            setLoading(true);
            const res = await axios.post(authApis.SIGNUP_API, {
                firstName,
                lastName,
                email: otpEmail || email,
                password,
                confirmPassword,
                otp,
                });
            if (res.data.success) {
                toast.success("Signup successful!");
            } else {
                toast.error(res.data.message);
            }
        }
        catch (err) {
            console.error("Error during verification:", err.message);
            toast.error("Error during verification");
        } 
        finally {
            setLoading(false);
        }
    };


    const getUserProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("No token found. Please login.");
                return null;
            }

            const response = await axios.get(userApis.GET_USER_PROFILE_API,{
                withCredentials: true,
                headers: {
        Authorization: `Bearer ${token}`,
      },
            });

            console.log("Response :",response);

            if (response.data.success) {
                setUser(response.data.user);
                return response.data.user;
            } else {
                toast.error("Failed to fetch user profile");
                return null;
            }
        } catch (error) {
            console.error("Error fetching profile:", error.message);
            toast.error("Error fetching profile");
            return null;
        }
    };


    const removeLinkedEmail = async (email) => {
        try {
            const response = await axios.delete(userApis.REMOVE_LINKED_EMAIL_API, {
            data: { email }, 
            withCredentials: true,
            headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
            });

            if (response.data.success) {
                toast.success("Email removed successfully");
                await getUserProfile();
            } else {
                toast.error("Failed to remove email");
            }
        } catch (error) {
            console.error("Error removing linked email:", error.message);
            toast.error("Error removing linked email");
        }
    };

    const deleteUserAccount = async () => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete your account? This cannot be undone.");

            if (!confirmDelete) return;

            const res = await axios.delete(userApis.DELETE_USER_API, {
                withCredentials: true,
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (res.data.success) {
                toast.success("Account deleted");
                setUser(null);
                localStorage.removeItem("token");
                navigate("/");
            } else {
                toast.error("Failed to delete account");
            }
        } catch (error) {
            console.error("Error deleting account:", error.message);
            toast.error("Something went wrong");
        }
    };



    const value = {
        login,
        user,setUser,
        loading, setLoading,
        otpEmail, setOtpEmail,
        sendOtp, verifyOtpAndSignup,
        signupData,setSignupData,getUser,
        getUserProfile,
        removeLinkedEmail,deleteUserAccount
    }


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);
