import React, { useState, useEffect } from "react";
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
  const [product, setProduct] = useState(null);
  useEffect(() => {
    if (!popuproduct) {
      setProduct(null);
    }
  }, [popuproduct]);

  const click = (Rname, Rstock, Rprice, Rimage, Rabout) => {
    setProduct({
      name: Rname,
      stock: Rstock,
      price: Rprice,
      image: Rimage,
      about: Rabout,
    });
    setpoproduct(true);
  };

  const oneProduct = (name, stock, price, image, about) => {
    const clickHandler = () => {
      click(name, stock, price, image, about);
    };
  
    return (
      <div onClick={clickHandler}>
        <OneProduct name={name} stock={stock} price={price} image={image} />
      </div>
    );
  };
  
  const singleProduct = () => {
    return oneProduct("Cat Food", "3", 180, "/images/cat_food.jpg", "about");
  };
  
  return (
   <>
    {/* pop window showed to whole screen */}
   {popuproduct && <ProductModal title = {product.name} image = {product.image} price = {product.price} stock = {product.stock} about = {product.about} closepop = {setpoproduct}/>}

   {/* pop window hidden */}
   {
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
                {singleProduct()}  {singleProduct()} {singleProduct()}
              </li>
              <li  className="onerowproduct">
                {singleProduct()}  {singleProduct()} {singleProduct()}
              </li>
              <li  className="onerowproduct">
                {singleProduct()}  {singleProduct()} {singleProduct()}
              </li>
              <li  className="onerowproduct">
                {singleProduct()}  {singleProduct()} {singleProduct()}
              </li>
              <li  className="onerowproduct">
                {singleProduct()}  {singleProduct()} {singleProduct()}
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