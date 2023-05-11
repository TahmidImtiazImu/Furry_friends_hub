import {React, useContext} from 'react'
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import "./Popup.css"
import { GlobalContext } from '../Global';


const Popup = ({closepop}) => {
  const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail, globalType, setGlobalType } = useContext(GlobalContext);

    const navigate = useNavigate();
    const navigateProduct =() =>{
        setGlobalType('cat');
        console.log("From popup menu: " + globalType);
        navigate('/Product');
      }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <ui>
            <li className="cat_product" onClick={navigateProduct}>Cat Food</li>
            <hr></hr>
            <li className="cat_product" onClick={navigateProduct}>Cat Care</li>
            <hr></hr>
            <li className="cat_product" onClick={navigateProduct}>Cat Accessories</li>          
        </ui>

      </div>
    </div>
  )
}

export default Popup
