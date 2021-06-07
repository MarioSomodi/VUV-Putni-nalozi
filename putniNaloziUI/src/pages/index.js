import React, { useState } from 'react';
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import HomeSection from '../components/HomeSection';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Topbar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HomeSection />
    </>
  );
};

export default Home;
