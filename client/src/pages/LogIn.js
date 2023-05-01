import React, { useState } from "react";
import './LogIn.css'

export const LogIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Submit form data
    };
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
            <div className="signup-link"><a href="/Signupindividual">Sign up</a></div>
            </div>
    </div>
  )
}

export default LogIn