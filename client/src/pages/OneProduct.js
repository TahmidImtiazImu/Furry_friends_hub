import React, { useState, useEffect } from "react";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import "./OneProduct.css"
import ProductPopupInfo from "./productPopupInfo"

const OneProduct = (props) => {
  const navigate = useNavigate();
  const[popuproduct,setpoproduct] = useState(false);
  const [stockout, setStockout] = useState(false);

  const click = () => {
    // alert("clicked!!");
    setpoproduct(true);
  }

  useEffect(() => {
    console.log("from oneproduct: " + props.stock);
    if(props.stock == '0'){
      setStockout(true);
    }
    else{
      setStockout(false);
    }
  }, [props.stock]);

  return ( 

    <div className="oneproduct" >
      {/* {popuproduct && <ProductPopupInfo/>} */}
        {!stockout &&
            <div className="stock">
              Stock: {props.stock}
            </div>      
        }
        {stockout &&
          <div className="stock-out">
          Out-of-Stock!
        </div> 
        }

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