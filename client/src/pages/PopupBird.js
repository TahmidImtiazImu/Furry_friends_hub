import {React, useContext} from 'react'
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import { GlobalContext } from '../Global';
import "./PopupBird.css"

const PopupBird = ({closepop}) => {
  const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail, globalType, setGlobalType, globalSubtype, setGlobalSubtype } = useContext(GlobalContext);

    const navigate = useNavigate();
    const navigateProductfood =() =>{
      setGlobalType('bird');
      setGlobalSubtype('food');
        navigate('/Product');
      }
    const navigateProductcare =() =>{
        setGlobalType('bird');
        setGlobalSubtype('care');
          navigate('/Product');
      }

    const navigateProductaccessories =() =>{
          setGlobalType('bird');
          setGlobalSubtype('accessories');
            navigate('/Product');
      }
  return (
    <div className="modalBackgroundbird">
      <div className="modalContainerbird">
        <ui>
            <li className="Bird_product" onClick={navigateProductfood} >Bird Food</li>
            <hr></hr>
            <li className="Bird_product" onClick={navigateProductcare}>Bird Care</li>
            <hr></hr>
            <li className="Bird_product" onClick={navigateProductaccessories}>Bird Accessories</li>
        </ui>

      </div>
    </div>
  )
}

export default PopupBird
