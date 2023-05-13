import {React, useContext} from 'react'
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import { GlobalContext } from '../Global';
import "./Popupdog.css"

const PopupDog = ({closepop}) => {
  const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail, globalType, setGlobalType, globalSubtype, setGlobalSubtype } = useContext(GlobalContext);

    const navigate = useNavigate();
    const navigateProductfood =() =>{
      setGlobalType('dog');
      setGlobalSubtype('food')
        navigate('/Product');
      }
    const navigateProductcare =() =>{
        setGlobalType('dog');
        setGlobalSubtype('care');
          navigate('/Product');
      }

    const navigateProductaccessories =() =>{
        setGlobalType('dog');
        setGlobalSubtype('accessories');
          navigate('/Product');
      }

  return (
    <div className="modalBackgrounddog">
      <div className="modalContainerdog">
        <ui>
            <li className="Dog_product" onClick={navigateProductfood}>Dog Food</li>
            <hr></hr>
            <li className="Dog_product" onClick={navigateProductcare}>Dog care</li>
            <hr></hr>
            <li className="Dog_product" onClick={navigateProductaccessories}>Dog Accessories</li>
        </ui>

      </div>
    </div>
  )
}

export default PopupDog
