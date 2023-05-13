import React, { useState, useEffect, useContext } from "react";
import {Routes, Route, useNavigate, Navigate, useLocation, useParams} from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'
import OneProduct from './OneProduct'
import SideBar from './SideBar'
import "./Product.css"
import ProductPopupInfo from "./productPopupInfo"
import ProductModal from "../Components/Product/ProductModal";
import { GlobalContext } from '../Global';

const Product = () => {
  const {query} = useParams();
  const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail, globalType, setGlobalType, globalSubtype, setGlobalSubtype } = useContext(GlobalContext);

  const navigate = useNavigate();
  const[popuproduct,setpoproduct] = useState(false);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  // const productType = useLocation();
  // if (productType && productType.type) {
  //   const data = productType.type;
  //   console.log(data.type);
  // } else {
  //   console.log('productType is null or undefined');
  // }

  const type = globalType;
  const subtype = globalSubtype;
  console.log("Printing query: " + query);
  var pathroute = `/Product/all`;
  if(query){
    pathroute = `/Product/search/${query}`
  }
  console.log("changing pathroute: " + pathroute);
  useEffect(() => {
    fetch(pathroute)
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
      console.log(products + "Hello------");
    if (!popuproduct) {
      setProduct(null);
    }
  }, [popuproduct, pathroute], []);

  const click = (Rid, newName, Rstock, Rprice, Rimage, Rabout) => {
    const newProduct = {
      id: Rid,
      name: newName,
      stock: Rstock,
      price: Rprice,
      image: Rimage,
      about: Rabout,
    };
    setProduct(newProduct);
    console.log("nameonclick: " + newName);
    console.log("productname: " + newProduct.name);
    console.log("Stonks: " + Rstock);
    if(Rstock != '0'){
      setpoproduct(true);
    }
    else{
      setpoproduct(false);
      console.log("Stock Out!!!");
    }
    // setpoproduct(true);
  };

  const oneProduct = (id, name, stock, price, image, about, type, subtype) => {
    const clickHandler = () => {
      click(id, name,stock, price, image, about);
      console.log("direct name: " + name);
    };
  
    return (
      <div>
        {checkType(type) && checksubType(subtype) && <div className="wrapproductcard" onClick={clickHandler}>
          <OneProduct name={name} stock={stock} price={price} image={image} />
        </div>}
      </div>
    );
  };
  
  // const singleProduct = () => {
  //   return oneProduct("Cat Food", "3", 180, "/images/cat_food.jpg", "about");
  // };

  function checkType(Ptypes){
    console.log("In product page: " + Ptypes);
    if(type == "all"){
      return true;
    }
    else if(Ptypes == type){
      return true;
    }
    else{
      return false;
    }
  }

function checksubType(Ptypes){
    console.log("In product page sub : " + Ptypes);
    if(subtype == "all"){
      return true;
    }
    else if(Ptypes == subtype){
      return true;
    }
    else{
      return false;
    }
}
  
  return (
   <>
    {/* pop window showed to whole screen */}
   {popuproduct && <ProductModal id={product.id} title = {product.name} image = {product.image} price = {product.price} stock = {product.stock} about = {product.about} closepop = {setpoproduct}/>}

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
            {/* //////////////////cards in a loop///////////////////// */}
              {products.map((singleproduct) => (
                oneProduct(singleproduct.id, singleproduct.name, singleproduct.stock, singleproduct.price,`data:image/jpg;base64,${singleproduct.image}`, singleproduct.about, singleproduct.type, singleproduct.subtype)
              ))}
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