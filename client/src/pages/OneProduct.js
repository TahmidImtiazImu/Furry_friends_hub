import React, { useState } from "react";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import "./OneProduct.css"
import ProductPopupInfo from "./productPopupInfo"

const OneProduct = (props) => {
  const navigate = useNavigate();
  const[popuproduct,setpoproduct] = useState(false);

  const click = () => {
    // alert("clicked!!");
    setpoproduct(true);
  }

  return ( 

    <div className="oneproduct" >
      {/* {popuproduct && <ProductPopupInfo/>} */}
        <div className="stock">
         Stock: {props.stock}
        </div>
        <div>
          <img className="productimage" src={props.image}></img>
        </div>
        <div>
          {props.name}
        </div>
        <div>
            {props.price} tk
        </div>

    </div>
  )
}

export default OneProduct
