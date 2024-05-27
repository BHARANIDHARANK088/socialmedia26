import React, { useContext, useRef } from 'react';
import "./register.css";
import { useHistory } from 'react-router-dom';
import { registerUser } from '../../apiRequest/userRequest';
import { AuthContext } from '../../context/AuthContext';
import { Link } from "react-router-dom";

const Register = () => {
  // 62
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const {user} = useContext(AuthContext);
  const history = useHistory();

  const handleClick = async (event) => {
    event.preventDefault();
    console.log(password);
    console.log(passwordAgain);
    if ( password.current.value !== passwordAgain.current.value )
    {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    }
    else
    {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      };

      try {
        await registerUser(user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }
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
               <input placeholder="Username" className="loginInput" ref={username}/>
               <input placeholder="Email" className="loginInput" type="email" ref={email}/>
               <input placeholder="Password" className="loginInput" type="password" ref={password}/>
               <input placeholder="Confirm password" className="loginInput" type="password" ref={passwordAgain}/>
               <button className="loginButton" type="submit">Sign Up</button>
               <Link to="/login" className="link">
                <button className="loginRegisterButton">
                   Log into Account
                </button>
               </Link>
            </form>
        </div>
       </div>
    </div>
  )
}

export default Register;