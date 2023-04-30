import React, { useState } from 'react';
import Card from './Card'
import './SIgnup.css'
import Popupsignup from "../Components/signupmodal/Popupsignup";

const joinClick = () => {
    alert("Successfully joined!");
}

export const SIgnup = () => {

    const [showPopup, setShowPopup] = useState(false);
  
  return (
   <div>
       {showPopup && <Popupsignup singuppopup={setShowPopup}/> } <div>
        <div className='header_title'>
            <h1>signup</h1>
        </div>
        <div className='wrapper'>
                <Card 
                
                img = "./images/customer.jpg"
                title = "Cutomer"
                 path = "/customerSignup" 
                singuppopup={setShowPopup}/>
                <Card 
                img = "./images/service_provider.png"
                title = "Service provider" 
                singuppopup={setShowPopup}/>
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