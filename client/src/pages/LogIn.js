import React, { useState,useContext } from "react";
import {Routes, Route, useNavigate, Navigate, Link} from 'react-router-dom';
import './LogIn.css'
import { GlobalContext } from '../Global';


export const LogIn = () => {
    
    const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail } = useContext(GlobalContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Submit form data
      
      // alert('hello there');
      // const { email, password } = this.state;
      fetch('/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.verified) {
          // Login successful
          console.log("Login successful");
          // alert('Login successfully') ;
          setglobalLoggedIn(true); 
          setglobalEmail(email);
          navigate('/');
        } else {
          // Login failed
          console.log("Login failed");
          alert('Login failed');
        }
      })
      .catch(error => console.error(error));
    };
    function navigateSignup(){
        navigate("/Signupindividual");
    }
  return (
    <div className="loginWhole">
        <div className="login-form">
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <label>
                Email:
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                Password:
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <div className="login-button-div">
                    <button type="submit">Log in</button>
                </div>
            </form>
            <div className="signup-link">Don't have an account? </div>
            <Link className="signup-link" to="/Signupindividual">Sign up</Link>
            {/* <div className="signup-link" onClick={navigateSignup}><a>Sign up</a></div> */}
            </div>
    </div>
  )
}

export default LogIn