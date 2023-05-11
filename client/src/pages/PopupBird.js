import {React, useContext} from 'react'
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import { GlobalContext } from '../Global';
import "./PopupBird.css"

const PopupBird = ({closepop}) => {
  const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail, globalType, setGlobalType } = useContext(GlobalContext);

    const navigate = useNavigate();
    const navigateProduct =() =>{
      setGlobalType('bird');
        navigate('/Product');
      }
  return (
    <div className="modalBackgroundbird">
      <div className="modalContainerbird">
        <ui>
            <li className="Bird_product" onClick={navigateProduct} >Bird Food</li>
            <hr></hr>
            <li className="Bird_product" onClick={navigateProduct}>Bird Care</li>
            <hr></hr>
            <li className="Bird_product" onClick={navigateProduct}>Bird Accessories</li>
        </ui>

      </div>
    </div>
  )
}

export default PopupBird
