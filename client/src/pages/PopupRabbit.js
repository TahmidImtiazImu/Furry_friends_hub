import {React, useContext} from 'react'
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import { GlobalContext } from '../Global';
import "./PopupRabbit.css"

const PopupRabbit = ({closepop}) => {
  const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail, globalType, setGlobalType } = useContext(GlobalContext);

    const navigate = useNavigate();
    const navigateProduct =() =>{
      setGlobalType('rabbit');
        navigate('/Product');
      }
  return (
    <div className="modalBackgroundrabbit">
      <div className="modalContainerrabbit">
        <ui>
            <li className="Rabbit_product" onClick={navigateProduct}>Rabbit Food</li>
            <hr></hr>
            <li className="Rabbit_product" onClick={navigateProduct}>Rabbit Care</li>
            <hr></hr>
            <li className="Rabbit_product" onClick={navigateProduct}>Rabbit Accessories</li>
        </ui>

      </div>
    </div>
  )
}

export default PopupRabbit
