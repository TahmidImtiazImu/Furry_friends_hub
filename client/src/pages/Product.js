import React from 'react'
import Header from './Header'
import Footer from './Footer'
import OneProduct from './OneProduct'
import SideBar from './SideBar'
import "./Product.css"

const Product = () => {
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
