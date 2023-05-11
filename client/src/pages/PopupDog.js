import {React, useContext} from 'react'
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import { GlobalContext } from '../Global';
import "./Popupdog.css"

const PopupDog = ({closepop}) => {
  const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail, globalType, setGlobalType } = useContext(GlobalContext);

    const navigate = useNavigate();
    const navigateProduct =() =>{
      setGlobalType('dog');
        navigate('/Product');
      }
  return (
    <div className="modalBackgrounddog">
      <div className="modalContainerdog">
        <ui>
            <li className="Dog_product" onClick={navigateProduct}>Dog Food</li>
            <hr></hr>
            <li className="Dog_product" onClick={navigateProduct}>Dog care</li>
            <hr></hr>
            <li className="Dog_product" onClick={navigateProduct}>Dog Accessories</li>
        </ui>

      </div>
    </div>
  )
}

export default PopupDog
