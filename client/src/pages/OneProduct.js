import React, { useState } from "react";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import "./OneProduct.css"
import ProductPopupInfo from "./productPopupInfo"

const OneProduct = () => {
  const navigate = useNavigate();
  const[popuproduct,setpoproduct] = useState(false);

  const click = () => {
    // alert("clicked!!");
    setpoproduct(true);
  }

  return ( 

    <div className="oneproduct" onClick={click}>
      {popuproduct && <ProductPopupInfo/>}
        <div className="stock">
         Stock:3
        </div>
        <div>
          <img className="productimage" src="/images/cat_food.jpg"></img>
        </div>
        <div>
          Cat food
        </div>
        <div>
            180tk
        </div>

    </div>
  )
}

export default OneProduct
