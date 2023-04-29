import React, { useState } from "react";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import {BsSearch,BsPeople} from 'react-icons/bs'
import styled from "styled-components";
import {FaCat, FaDog, FaKiwiBird,FaWalking} from "react-icons/fa"
import {GiRabbit} from "react-icons/gi"
import {MdPeopleAlt,MdOutlineSecurity,MdSentimentSatisfiedAlt} from "react-icons/md"
import {BsFillCartFill,BsFillHouseFill,BsFacebook,BsWhatsapp,BsInstagram,BsTwitter,BsYoutube} from "react-icons/bs"
import {AiOutlineSearch} from "react-icons/ai"
import {GrDeliver} from "react-icons/gr"
import Popup from "./Popup";
import PopupDog from "./PopupDog";
import PopupBird from "./PopupBird";
import PopupRabbit from "./PopupRabbit";
import CardImages from "./CardImages";

const Header = () => {
    const navigate = useNavigate();

    const navigateSignUp = () => {
      navigate('/Login');
    }
    const navigateProduct =() =>{
      navigate('/Product');
    }
    const navigateCart =() =>{
      navigate('/Cart');
    }
    const navigateHome=() =>{
      navigate('/');
    }
    const toggleHover =() =>{
      this.setState({hover: !this.state.hover})
    }
    const[popup,setpop] = useState(false);
    const[popupdog,setpopdog] = useState(false);
    const[popupbird,setpopbird] = useState(false);
    const[popuprabbit,setpoprabbit] = useState(false);
  return (
    <div>
    <nav className="navBar" onMouseLeave={()=>{setpop(false); setpopbird(false); setpopdog(false); setpoprabbit(false);}}>
      {/* NAME OF THE WEBSITEEE */}
      <div className="website_name" onClick={navigateHome}>
          <span>F</span>urry
          <span>F</span>riends
          <span>H</span>ub
      </div>

      {/* SERVICE LIST */}
      <div className="service">
        <ul>
          <li className="list"> 
          <a href onMouseEnter={()=>{setpop(true); setpopdog(false); setpopbird(false); setpoprabbit(false);}}  
          onClick={navigateProduct}><FaCat className="servicelist"/> </a>
           {popup && !popupdog && !popupbird && !popuprabbit && <Popup closepop={setpop}/>}
           </li>
          <li className="list" > <a href  onMouseEnter={()=>{setpop(false); setpopdog(true); setpopbird(false); setpoprabbit(false);}} 
          onClick={navigateProduct}><FaDog className="servicelist"/> </a>
           {!popup && popupdog && !popupbird && !popuprabbit && <PopupDog closepop={setpopdog}/>}
          </li>
          <li className="list"> <a href onMouseEnter={()=>{setpop(false); setpopdog(false); setpopbird(true); setpoprabbit(false);}}  
          onClick={navigateProduct}> <FaKiwiBird className="servicelist"/> </a>
           {!popup && !popupdog && popupbird && !popuprabbit && <PopupBird closepop={setpopbird}/>}
          </li>
          <li className="list"> <a href onMouseEnter={()=>{setpop(false); setpopdog(false); setpopbird(false); setpoprabbit(true);}}  
          onClick={navigateProduct}> <GiRabbit className="servicelist"/> </a>
           {!popup && !popupdog && !popupbird && popuprabbit && <PopupRabbit closepop={setpoprabbit}/>}
          </li>
          <li className="list"> <a href onClick={navigateProduct}> <BsFillHouseFill className="servicelist"/> </a></li>         
          <li className="list"> <a href onClick={navigateProduct}> <FaWalking className="servicelist"/> </a></li>
        </ul>
     </div>

     {/* SIGNUP and CART */}
    <div className="signup_and_cart">
      <ul>
      <li className="list"> <div className="searchbox"><input type="text" placeholder="Search here" className="input" /> 
     </div></li>
        <li className="list"> <div className="servicelist"> <BsFillCartFill className="cart" onClick={navigateCart}/> </div> </li>
        <li className="list"> <div className="servicelist"> <MdPeopleAlt  onClick={navigateSignUp}/></div>  </li>
      </ul>
    </div>
    </nav>
    </div>
  )
}

export default Header
