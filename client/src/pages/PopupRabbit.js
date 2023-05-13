import {React, useContext} from 'react'
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import { GlobalContext } from '../Global';
import "./PopupRabbit.css"

const PopupRabbit = ({closepop}) => {
  const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail, globalType, setGlobalType, globalSubtype, setGlobalSubtype } = useContext(GlobalContext);

    const navigate = useNavigate();
    const navigateProductfood =() =>{
      setGlobalType('rabbit');
      setGlobalSubtype('food');
        navigate('/Product');
      }
      const navigateProductcare =() =>{
        setGlobalType('rabbit');
        setGlobalSubtype('care');
          navigate('/Product');
        }
      const navigateProductaccessories =() =>{
          setGlobalType('rabbit');
          setGlobalSubtype('accessories');
            navigate('/Product');
          }
  return (
    <div className="modalBackgroundrabbit">
      <div className="modalContainerrabbit">
        <ui>
            <li className="Rabbit_product" onClick={navigateProductfood}>Rabbit Food</li>
            <hr></hr>
            <li className="Rabbit_product" onClick={navigateProductcare}>Rabbit Care</li>
            <hr></hr>
            <li className="Rabbit_product" onClick={navigateProductaccessories}>Rabbit Accessories</li>
        </ui>

      </div>
    </div>
  )
}

export default PopupRabbit
