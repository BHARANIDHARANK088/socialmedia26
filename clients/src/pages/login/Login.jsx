import React, { useRef, useContext } from 'react';
import "./login.css";

// 57
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
  // 58
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (event) => {
    event.preventDefault();
    // console.log(email.current.value);
    loginCall({email: email.current.value, password: password.current.value}, dispatch);
  }

  return (
    <div className="login">
       <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">CW Social</h3>
            <span className="loginDesc">
               Connect with friends and the world around you on Lamasocial.
            </span>
        </div>
        <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
               <input placeholder="Email" type="email" className="loginInput" ref={email} required/>
               <input placeholder="Password" type="password" className="loginInput" ref={password} required/>
               {/* <button className="loginButton">Log In</button> */}
               {/* 59 */}
               <button className="loginButton" type="submit" disabled={isFetching}>
                   {/* {isFetching ? (<CircularProgress color="white" size="20px"></CircularProgress>) : ( "Log In")} */}
                   Log In
                </button>
               <span className="loginForgot">Forgot Password?</span>
               <Link to="/register">
                <button className="loginRegisterButton">
                 {/* {isFetching ? ( */}
                   {/* <CircularProgress color="white" size="20px" /> */}
                 {/* ) : ( */}
                   "Create a New Account"
                 {/* )} */}
                 </button>
               </Link>
            </form>
        </div>
       </div>
    </div>
  )
}

export default Login;