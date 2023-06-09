import {React,useContext} from 'react'
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import "./PopupAccount.css"
import { GlobalContext } from '../Global';
import { toast } from 'react-toastify';

const PopupAccount = ({closepop}) => {
  const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail } = useContext(GlobalContext);

  var isAdmin = false;
  if(globalemail == "ajahsanul19@gmail.com" || globalemail == "tahmidimtiaz11807048@gmail.com"){
    isAdmin = true;
  }  
  else{
    isAdmin = false;
  }

    const navigate = useNavigate();
    const navigateAccount =() =>{
        navigate('/Profile');
      }
    const navigateAdmin =() =>{
      navigate('/Admin');
    }
      
      const LogOut =() =>{
        // setglobalEmail('') ;
        setglobalEmail('');
        setglobalLoggedIn(false);
        toast.info("Logging Out");
        // navigate('./');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }

      const classString = isAdmin ? 'modalContainerAccountAdmin' : 'modalContainerAccount';
    return (
    <div className="modalBackgroundAccount">
      <div className={classString}>
        <ui>
            <li className="Account-Item" onClick={navigateAccount}>Account</li>
            <hr></hr>
            <li className="Account-Item" onClick={LogOut}>Log Out</li>
            {isAdmin && <div>
              <hr/>
              <li className="Account-Item" onClick={navigateAdmin}>Admin</li>
            </div>}
        </ui>

      </div>
    </div>
  )
}

export default PopupAccount
