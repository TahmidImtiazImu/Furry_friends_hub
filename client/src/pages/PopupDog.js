import React from 'react'
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import "./Popupdog.css"

const PopupDog = ({closepop}) => {
    const navigate = useNavigate();
    const navigateProduct =() =>{
        navigate('/Product');
      }
  return (
    <div className="modalBackgrounddog">
      <div className="modalContainerdog">
        <ui>
            <li className="Dog_product" onClick={navigateProduct}>Dog Food</li>
            <hr></hr>
            <li className="Dog_product" onClick={navigateProduct}>Dog Toy</li>
            <hr></hr>
            <li className="Dog_product" onClick={navigateProduct}>Dog Shampoo</li>
            <hr></hr>
            <li className="Dog_product" onClick={navigateProduct}>Dog Dress</li>
            <hr></hr>
            <li className="Dog_product" onClick={navigateProduct}>Dog Bowl</li>
            <li className="titleCloseBtndog">
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

export default PopupDog
