import React from 'react'
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import "./PopupAccount.css"

const PopupAccount = ({closepop}) => {
    const navigate = useNavigate();
    const navigateAccount =() =>{
        navigate('/Profile');
      }
      
      const navigateLogin =() =>{
        navigate('/LogIn');
      }

      const LogOut =() =>{
        alert("Logged Out!");
      }

    return (
    <div className="modalBackgroundAccount">
      <div className="modalContainerAccount">
        <ui>
            <li className="Account-Item" onClick={navigateAccount}>Account</li>
            <hr></hr>
            <li className="Account-Item" onClick={navigateLogin}>Log In</li>
            <hr></hr>
            <li className="Account-Item" onClick={LogOut}>Log Out</li>
        </ui>

      </div>
    </div>
  )
}

export default PopupAccount
