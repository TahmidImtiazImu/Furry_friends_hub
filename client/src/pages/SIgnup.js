import React, { useState } from 'react';
import Card from './Card'
import './SIgnup.css'

const joinClick = () => {
    alert("Successfully joined!");
}

export const SIgnup = () => {

  
  return (
   <div>
        <div>
        <div className='header_title'>
            <h1>signup</h1>
        </div>
        <div className='wrapper'>
                <Card 
                
                img = "./images/customer.jpg"
                title = "Cutomer"
                 path = "/customerSignup" 
                />
                <Card 
                img = "./images/service_provider.png"
                title = "Service provider" 
                />
        </div>
        <div className='choices'>
            <p>
                Already have an account? <a className='movetologin' href='/LogIn'>Log In</a>
            </p>
        </div>
    </div>
   </div>
    
  )
}
export default SIgnup