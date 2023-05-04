import {React,useContext} from 'react'
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import "./PopupAccount.css"
import { GlobalContext } from '../Global';

const PopupAccount = ({closepop}) => {
  const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail } = useContext(GlobalContext);

    const navigate = useNavigate();
    const navigateAccount =() =>{
        navigate('/Profile');
      }
      
      const LogOut =() =>{
        // setglobalEmail('') ;
        window.location.reload();  
        setglobalLoggedIn(false) ;
        
        // navigate('./');
      }

    return (
    <div className="modalBackgroundAccount">
      <div className="modalContainerAccount">
        <ui>
            <li className="Account-Item" onClick={navigateAccount}>Account</li>
            <hr></hr>
            <li className="Account-Item" onClick={LogOut}>Log Out</li>
        </ui>

      </div>
    </div>
  )
}

export default PopupAccount
