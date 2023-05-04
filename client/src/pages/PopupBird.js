import React from 'react'
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import "./PopupBird.css"

const PopupBird = ({closepop}) => {
    const navigate = useNavigate();
    const navigateProduct =() =>{
        navigate('/Product');
      }
  return (
    <div className="modalBackgroundbird">
      <div className="modalContainerbird">
        <ui>
            <li className="Bird_product" onClick={navigateProduct} >Bird Food</li>
            <hr></hr>
            <li className="Bird_product" onClick={navigateProduct}>Bird Toy</li>
            <hr></hr>
            <li className="Bird_product" onClick={navigateProduct}>Bird Vitamin</li>
        </ui>

      </div>
    </div>
  )
}

export default PopupBird
