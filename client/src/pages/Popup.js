import {React, useContext} from 'react'
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import "./Popup.css"
import { GlobalContext } from '../Global';


const Popup = ({closepop}) => {
  const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail, globalType, setGlobalType, globalSubtype, setGlobalSubtype } = useContext(GlobalContext);

    const navigate = useNavigate();
    const navigateProductfood =() =>{
        setGlobalType('cat');
        setGlobalSubtype('food');
        console.log("From popup menu: " + globalType);
        navigate('/Product');
    }

      const navigateProductcare =() =>{
        setGlobalType('cat');
        setGlobalSubtype('care');
        console.log("From popup menu: " + globalType);
        navigate('/Product');
    }

      const navigateProductaccessories =() =>{
        setGlobalType('cat');
        setGlobalSubtype('accessories');
        console.log("From popup menu: " + globalType);
        navigate('/Product');
    }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <ui>
            <li className="cat_product" onClick={navigateProductfood}>Cat Food</li>
            <hr></hr>
            <li className="cat_product" onClick={navigateProductcare}>Cat Care</li>
            <hr></hr>
            <li className="cat_product" onClick={navigateProductaccessories}>Cat Accessories</li>          
        </ui>

      </div>
    </div>
  )
}

export default Popup
