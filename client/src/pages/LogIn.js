import React, { useState } from "react";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import './LogIn.css'

export const LogIn = () => {

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
          alert('Login successfully') ;
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
            <div className="signup-link">Don't have an account?</div>
            <div className="signup-link" onClick={navigateSignup}><a>Sign up</a></div>
            </div>
    </div>
  )
}

export default LogIn