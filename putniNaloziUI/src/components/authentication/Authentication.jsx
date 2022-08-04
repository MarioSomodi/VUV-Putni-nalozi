import { React, useState } from 'react';
import './authentication.css';
import { motion } from 'framer-motion';
import LoginForm from './Login/loginForm';
import SignUpForm from './SignUp/signupForm';

const backdropVariants = {
  expanded: {
    width: '233%',
    borderRadius: '20%',
    transform: 'rotate(60deg)',
    height: '1050px',
    zIndex: 999,
  },
  collapsed: {
    width: '160%',
    borderRadius: '50%',
    transform: 'rotate(60deg)',
    height: '505px',
    zIndex: 0,
  },
};

const expandingTransition = {
  type: 'spring',
  duration: 2.3,
  stiffness: 30,
};

export default function Authentication({ Success }) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState('signIn');

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1700);
  };

  const switchToSignUp = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive('signUp');
    }, 400);
  };
  const switchToSignIn = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive('signIn');
    }, 400);
  };

  return (
    <div>
      <div className='box'>
        <div className='topContainer'>
          <motion.div
            initial={false}
            animate={isExpanded ? 'expanded' : 'collapsed'}
            variants={backdropVariants}
            transition={expandingTransition}
            className='backdrop'
          />
          <div className='headerContainer'>
            <h2 className='headerText'>
              {active === 'signIn' ? 'Dobrodošli' : 'Kreirajte novi'}
            </h2>
            <h2 className='headerText'>
              {active === 'signIn' ? 'Nazad' : 'Korisnički račun'}
            </h2>
            <h5 className='smallText'>
              {active === 'signIn'
                ? 'Prijavite se kako bi nastavili!'
                : 'Nadamo se da će te uživati u našim uslugama!'}
            </h5>
          </div>
        </div>
        <div className='innerContainer'>
          {active === 'signIn' ? (
            <LoginForm switchToSignUp={switchToSignUp} Success={Success} />
          ) : (
            <SignUpForm switchToSignIn={switchToSignIn} />
          )}
        </div>
      </div>
    </div>
  );
}
