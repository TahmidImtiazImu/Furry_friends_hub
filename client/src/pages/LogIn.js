import React, { useState } from "react";
import './LogIn.css'

export const LogIn = () => {

    const logIn = () => {
        alert("SUccessfully Logged In!")
    }

  return (
    <div className="loginWhole">
        <h1>Log In</h1>
        <div className="loginBorder">
            <div className='login'>
                <div className = 'loginmail'> 
                    E-mail: <input type="text" placeholder="Email" className="inputmail"/>
                </div>
                <div className = 'cloginpass'> 
                    Password: <input type="text" placeholder="Password" className="inputpass"/>
                </div>
                <div className="customersignwhole">
                    <button className='LoggedIn' onClick={logIn}>Log In</button> 
                    <p className="logintosigup">
                        Create An account <a className="movetosignup" href='/Signup'>Sign Up</a>
                    </p>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default LogIn