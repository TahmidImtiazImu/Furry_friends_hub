import React from 'react'
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import {AiOutlineDown} from "react-icons/ai"
import "./SideBar.css"

const SideBar = () => {
    const navigate = useNavigate();
    const navigateProduct =() =>{
        navigate('/');
      }
  return (

      <div className="sidebar">
        <ui>
            <li className="sidebar_oneelement"> <div  onClick={navigateProduct} className="sidberelementname">Cat</div> 
             <AiOutlineDown className="sidebararrow"/>
             </li>
            <hr></hr>
            <li className="sidebar_oneelement"> <div onClick={navigateProduct}  className="sidberelementname">Dog</div> 
             <AiOutlineDown className="sidebararrow"/></li>
            <hr></hr>
            <li  className="sidebar_oneelement"><div onClick={navigateProduct}  className="sidberelementname">Bird</div> 
             <AiOutlineDown className="sidebararrow"/></li>
            <hr></hr>
            <li className="sidebar_oneelement"> <div  onClick={navigateProduct}  className="sidberelementname">Rabbit</div> 
            <AiOutlineDown className="sidebararrow"/></li>
            <hr></hr>
            <li   className="sidebar_oneelement"> <div onClick={navigateProduct} className="sidberelementname">Shop</div> 
            <AiOutlineDown className="sidebararrow"/></li>           
        </ui>
    </div>
  )
}

export default SideBar
