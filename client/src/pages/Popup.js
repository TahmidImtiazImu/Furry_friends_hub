import React from 'react'
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import "./Popup.css"

const Popup = ({closepop}) => {
    const navigate = useNavigate();
    const navigateProduct =() =>{
        navigate('/Product');
      }
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <ui>
            <li className="cat_product" onClick={navigateProduct}>Cat Food</li>
            <hr></hr>
            <li className="cat_product" onClick={navigateProduct}>Cat Toy</li>
            <hr></hr>
            <li className="cat_product" onClick={navigateProduct}>Cat Shampoo</li>
            <hr></hr>
            <li className="cat_product" onClick={navigateProduct}>Cat Dress</li>
            <hr></hr>
            <li className="cat_product" onClick={navigateProduct}>Cat Litter</li>
            <hr></hr>
            <li className="cat_product" onClick={navigateProduct}>Cat Bowl</li>
            <hr></hr>
            <li className="cat_product" onClick={navigateProduct}>Cat Perfume</li>            
        </ui>

      </div>
    </div>
  )
}

export default Popup
