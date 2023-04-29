import React, { useState } from "react";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'
import OneProduct from './OneProduct'
import SideBar from './SideBar'
import "./Product.css"
import ProductPopupInfo from "./productPopupInfo"
import ProductModal from "../Components/Product/ProductModal";

const Product = () => {

  const navigate = useNavigate();
  const[popuproduct,setpoproduct] = useState(false);

  function click(){
    // alert("clicked!!");
    setpoproduct(true);
  }

  const oneProduct = ()=> {
    return(
      <div onClick={()=> setpoproduct(true)}>
          <OneProduct/>
      </div>
    );
  }

  return (
   <>
    {/* pop window showed to whole screen */}
   {popuproduct && <ProductModal closepop = {setpoproduct}/>}

   {/* pop window hidden */}
   {!popuproduct && 
    <div>
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
                {oneProduct()}  {oneProduct()} {oneProduct()}
              </li>
              <li  className="onerowproduct">
                {oneProduct()}  {oneProduct()} {oneProduct()}
              </li>
              <li  className="onerowproduct">
                {oneProduct()}  {oneProduct()} {oneProduct()}
              </li>
              <li  className="onerowproduct">
                {oneProduct()}  {oneProduct()} {oneProduct()}
              </li>
              <li  className="onerowproduct">
                {oneProduct()}  {oneProduct()} {oneProduct()}
              </li>
            </ul>
            </div>
          </div>
        </div>
        
        {/* FOOOOOOOOOOOOOOOOOOOOTTTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEERRRRRR */}
          <Footer/>
    </div>}
   </>
  )
}

export default Product
