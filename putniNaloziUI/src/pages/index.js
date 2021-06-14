import React, { useState } from 'react';
import Topbar from '../components/Topbar';
import Navbar from '../components/Navbar';
import HomeSection from '../components/HomeSection';
import PutniNaloziS from '../components/PutniNaloziSection';
import NewPutniNalog from '../components/NewPutniNalogSection';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Router>
        <Topbar isOpen={isOpen} toggle={toggle} />
        <Navbar toggle={toggle} />
        <Switch>
          <Route path='/' exact component={HomeSection} />
          <Route path='/putniNalozi' exact component={PutniNaloziS} />
          <Route path='/putniNalog/novi' exact component={NewPutniNalog} />
        </Switch>
      </Router>
    </>
  );
};

export default Home;
