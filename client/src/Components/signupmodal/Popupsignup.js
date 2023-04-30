import React from 'react'
import "./Popupsignup.css"
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';


const Popupsignup = ({singuppopup}) => {
  const navigate = useNavigate();
  function navigateshop(){
    navigate('/Signupshop');
  }
  function navigateindividual(){
   
    navigate('/Signupindividual');
  }

  return (
    
<div className='popopback'>
<div className="popup">
    <div className='signuppopupclose'> <button onClick={()=>singuppopup(false)}>X</button></div>  
    <h3>Sign up as:</h3>
    <div className='signupbuttonspace'>
    <button onClick={navigateshop} >Shop</button>
    <button onClick={navigateindividual}>Pet Sitter</button>
    </div>
  </div>
</div>
    
  )
}

export default Popupsignup
