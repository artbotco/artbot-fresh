import React, { useState } from 'react';
import './modal.scss';
import { useNavigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { loginUser } from '../../redux/reducers/auth.duck';
import { login } from '../../services/util';
import jwt_decode from 'jwt-decode';

const LoginForm = (props: any) => {
  const [username, setUsername] = useState({
    value: '',
    touch: false,
    error: false,
  });
  const [password, setPassword] = useState({
    value: '',
    touch: false,
    error: false,
  });
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState({
    message: '',
    error: false,
    general: false,
  });
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const submitHandler = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    let loginResponse = await login({
      username: username.value,
      password: password.value,
    });
    if (loginResponse.code === 'ABT0000') {
      props.login(
        jwt_decode(loginResponse.data.userToken),
        loginResponse.data.userToken
      );
      navigate('/');
    } else {
      setLoading(false);
      setMessage({
        message: loginResponse.message,
        error: true,
        general: true,
      });
    }
  };
  return <></>;
  // return (
  //   <>
  //     <div>Log In</div>
  //     <form onSubmit={submitHandler}>
  //       <div className="form-container">
  //         {/* icon here */}
  //         <div className="form-item">
  //           <label htmlFor="username">Username:</label>
  //           <input
  //             required
  //             type="text"
  //             value={username.value}
  //             onChange={(e) =>
  //               setUsername({
  //                 value: e.target.value,
  //                 touch: true,
  //                 error: e.target.value ? false : true,
  //               })
  //             }
  //             className="form-control login-form__input"
  //             placeholder="Username"
  //           />
  //         </div>
  //       </div>
  //       <div className="form-container">
  //         {/* icon here */}
  //         <div className="form-item">
  //           <label htmlFor="password">Password:</label>
  //           <input
  //             required
  //             type="password"
  //             value={password.value}
  //             onChange={(e) =>
  //               setPassword({
  //                 value: e.target.value,
  //                 touch: true,
  //                 error: e.target.value ? false : true,
  //               })
  //             }
  //             className="form-control login-form__input"
  //             placeholder="Password"
  //           />
  //         </div>
  //       </div>
  //       <div className="form-container">
  //         <div className="form-item">{/* icon here */}</div>
  //         <div className="form-item">
  //           <label htmlFor="remember">Remember me:</label>
  //           <input
  //             type="checkbox"
  //             id="remember"
  //             checked={remember}
  //             onChange={(event) => setRemember(event.target.checked)}
  //             style={{ marginTop: '8px' }}
  //           />
  //         </div>
  //       </div>
  //       {loading && <div>Loading...</div>}
  //       {message?.value && (
  //         <div
  //           style={{
  //             color: message.error ? 'red' : 'green',
  //             marginTop: '16px',
  //           }}
  //         >
  //           {message?.value}
  //         </div>
  //       )}
  //       <button type="submit" style={{ marginTop: '16px' }}>
  //         Log In
  //       </button>
  //     </form>
  //     <button onClick={props.toSignup}>Sign Up</button>
  //     <button onClick={props.toRecover}>Recover</button>
  //   </>
  // );
};

const mapDispatchToProps = (dispatch: any) => ({
  login: (data: any, token: any) => dispatch(loginUser(data, token)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
