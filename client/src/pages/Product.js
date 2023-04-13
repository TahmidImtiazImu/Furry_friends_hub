import React, { useState } from "react";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'
import OneProduct from './OneProduct'
import SideBar from './SideBar'
import "./Product.css"
import ProductPopupInfo from "./productPopupInfo"

const Product = () => {

  const navigate = useNavigate();
  const[popuproduct,setpoproduct] = useState(false);

  const click = () => {
    // alert("clicked!!");
    setpoproduct(true);
  }

  return (
   <>
   {/* HEEEEEEEEEEEEAAADERRRRRRR */}

      <Header/>

  {/*PRODDDDDDDDDDDDDDDDDDDDDDDDDDDDUCTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT  */}
  <div className="productbody">
  <div className="product">
      <div className="sidebar">
        <SideBar/>
      </div>
      <div className="products">
       <ul>
        <li className="onerowproduct">
          <div onClick={click}><OneProduct/>{popuproduct && <ProductPopupInfo closepop = {setpoproduct}/>}</div>  <OneProduct/> <OneProduct/>
        </li>
        <li  className="onerowproduct">
          <OneProduct/> <OneProduct/> <OneProduct/>
        </li>
        <li  className="onerowproduct">
          <OneProduct/> <OneProduct/> <OneProduct/>
        </li>
        <li  className="onerowproduct">
          <OneProduct/> <OneProduct/> <OneProduct/>
        </li>
        <li  className="onerowproduct">
          <OneProduct/> <OneProduct/> <OneProduct/>
        </li>
       </ul>
      </div>
    </div>

  </div>
   
  {/* FOOOOOOOOOOOOOOOOOOOOTTTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEERRRRRR */}
    <Footer/>
  
   </>
  )
}

export default Product
