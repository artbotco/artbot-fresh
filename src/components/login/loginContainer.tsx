import './modal.css';
// import LoginForm from './loginForm';
// import SignUpForm from './signupForm';
// import RecoverForm from './recoverForm';
import { useState } from 'react';

const LoginContainer = () => {
  const [active, setActive] = useState('login');

  return (
    <>
      {/* {active === 'login' ? (
        <LoginForm
          toSignup={() => setActive('signup')}
          toRecover={() => setActive('recover')}
        />
      ) : active === 'signup' ? (
        <SignUpForm backToLogin={() => setActive('login')} />
      ) : (
        <RecoverForm backToLogin={() => setActive('login')} />
      )} */}
    </>
  );
};

export default LoginContainer;
