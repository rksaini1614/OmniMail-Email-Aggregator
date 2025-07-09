import React from 'react';  
import Navbar from "../components/common/Navbar";
import Loader from '../components/common/Spinner';
import HeroSection from '../components/HeroSection';
import Instructions from '../components/Instructions';


const Home = () => {

  //const navigate = useNavigate();

  return (
    <div className='relative'>
      {/* <Loader/> */}

      <HeroSection/>
      <Instructions/>
    </div>
  )
}

export default Home;