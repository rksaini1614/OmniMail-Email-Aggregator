import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Verfication from './pages/Verification'
import Dashboard from "./pages/Dashboard"
import PrivateRoute from "./components/PrivateRoute"
import Settings from './pages/Settings'
import Inbox from './pages/Inbox'
import MyProfile from './pages/MyProfile'
import Navbar from './components/common/Navbar'
import { useAppContext } from './context/AppContext'
import Footer from './components/common/Footer'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import axios from 'axios'




// if backend gives 401 error
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

function App() {

  const {user} = useAppContext();
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<Verfication/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/contact" element={<ContactUs/>}/>

        <Route path="/dashboard/*" element={user ? <Dashboard/> : <Navigate to="/login/"/>}>
          <Route index element={<MyProfile/>}/>
          <Route path="my-profile" element={<MyProfile/>}/>
          <Route path="inbox" element={<Inbox/>}/>
          <Route path="settings" element={<Settings/>}/>
        </Route>
      </Routes>

      <Footer/>
    </>
  )
}

export default App
