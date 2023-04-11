import React from 'react'
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import "./PopupRabbit.css"

const PopupRabbit = ({closepop}) => {
    const navigate = useNavigate();
    const navigateProduct =() =>{
        navigate('/Product');
      }
  return (
    <div className="modalBackgroundrabbit">
      <div className="modalContainerrabbit">
        <ui>
            <li className="Rabbit_product" onClick={navigateProduct}>Rabbit Food</li>
            <hr></hr>
            <li className="Rabbit_product" onClick={navigateProduct}>Rabbit Toy</li>
            <hr></hr>
            <li className="Rabbit_product" onClick={navigateProduct}>Rabbit Vitamin</li>
            <li className="titleCloseBtnrabbit">
               <button
                onClick={() => {
                closepop(false);}}>close
               </button>
            </li>
        </ui>

      </div>
    </div>
  )
}

export default PopupRabbit
