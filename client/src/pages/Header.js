import React, { useState,useContext  } from "react";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import {BsSearch,BsPeople} from 'react-icons/bs'
import styled from "styled-components";
import {FaCat, FaDog, FaKiwiBird,FaWalking} from "react-icons/fa"
import {GiRabbit} from "react-icons/gi"
import {MdPeopleAlt,MdOutlineSecurity,MdSentimentSatisfiedAlt} from "react-icons/md"
import {BsFillCartFill,BsFillHouseFill,BsFacebook,BsWhatsapp,BsInstagram,BsTwitter,BsYoutube} from "react-icons/bs"
import {IoNotificationsSharp} from "react-icons/io5"
import {AiOutlineSearch} from "react-icons/ai"
import {GrDeliver} from "react-icons/gr"
import Popup from "./Popup";
import PopupDog from "./PopupDog";
import PopupBird from "./PopupBird";
import PopupRabbit from "./PopupRabbit";
import CardImages from "./CardImages";
import PopupAccount from "./PopupAccount";
import SearchBar from "../Components/SearchBar/SearchBar";
import { GlobalContext } from '../Global';

const Header = () => {
  const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail, globalType, setGlobalType, globalSubtype, setGlobalSubtype } = useContext(GlobalContext);
    const navigate = useNavigate();
    

    const navigateSignUp = () => {
      navigate('/Login');
    }
    const navigateProductCat = () => {
      setGlobalType('cat');
      setGlobalSubtype('all');
      console.log(globalType);
      navigate({
        pathname: '/Product',
      });
    }
    const navigateProductDog =() =>{
      setGlobalType('dog');
      setGlobalSubtype('all');
      console.log(globalType);
      navigate({
        pathname: '/Product',
      });
    }
    const navigateProductBird =() =>{
      setGlobalType('bird');
      setGlobalSubtype('all');
      console.log(globalType);
      navigate({
        pathname: '/Product',
      });
    }
    const navigateProductRabbit =() =>{
      setGlobalType('rabbit');
      setGlobalSubtype('all');
      console.log(globalType);
      navigate({
        pathname: '/Product',
      });
    }
    const navigateProductAll =() =>{
      setGlobalType('all');
      setGlobalSubtype('all');
      console.log(globalType);
      navigate({
        pathname: '/Product',
      });
    }
    const navigateCart =() =>{
      navigate('/Cart');
    }
    const navigateHome=() =>{
      navigate('/');
    }
    const navigatepetsitting=() =>{
      navigate('/Petsitter');
    }

    const navigatenotification=()=>{
      navigate('/Notification') ;
    }
    const toggleHover =() =>{
      this.setState({hover: !this.state.hover})
    }
    const[popup,setpop] = useState(false);
    const[popupdog,setpopdog] = useState(false);
    const[popupbird,setpopbird] = useState(false);
    const[popuprabbit,setpoprabbit] = useState(false);
    const[popaccount,setpopaccount] = useState(false);

  return (
    <div>
    <nav className="navBar" onMouseLeave={()=>{setpop(false); setpopbird(false); setpopdog(false); setpoprabbit(false); setpopaccount(false);}}>
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
          <a href onMouseEnter={()=>{setpop(true); setpopdog(false); setpopbird(false); setpoprabbit(false); setpopaccount(false);}}  
          onClick={navigateProductCat}><FaCat className="servicelist"/> </a>
           {popup && !popupdog && !popupbird && !popuprabbit && !popaccount && <Popup closepop={setpop}/>}
           </li>
          <li className="list" > <a href  onMouseEnter={()=>{setpop(false); setpopdog(true); setpopbird(false); setpoprabbit(false); setpopaccount(false);}} 
          onClick={navigateProductDog}><FaDog className="servicelist"/> </a>
           {!popup && popupdog && !popupbird && !popuprabbit && !popaccount && <PopupDog closepop={setpopdog}/>}
          </li>
          <li className="list"> <a href onMouseEnter={()=>{setpop(false); setpopdog(false); setpopbird(true); setpoprabbit(false); setpopaccount(false);}}  
          onClick={navigateProductBird}> <FaKiwiBird className="servicelist"/> </a>
           {!popup && !popupdog && popupbird && !popuprabbit && !popaccount && <PopupBird closepop={setpopbird}/>}
          </li>
          <li className="list"> <a href onMouseEnter={()=>{setpop(false); setpopdog(false); setpopbird(false); setpoprabbit(true); setpopaccount(false);}}  
          onClick={navigateProductRabbit}> <GiRabbit className="servicelist"/> </a>
           {!popup && !popupdog && !popupbird && popuprabbit && !popaccount && <PopupRabbit closepop={setpoprabbit}/>}
          </li>
          <li className="list"> <a href onClick={navigateProductAll}> <BsFillHouseFill className="servicelist"/> </a></li>         
          <li className="list"> <a href onClick={navigatepetsitting}> <FaWalking className="servicelist"/> </a></li>
        </ul>
     </div>

     {/* Searchbar */}
     <div className="headersearch"><SearchBar/></div>

     {/* SIGNUP and CART */}
    <div className="signup_and_cart">
      <ul>
        <li classname='list'> <div className="servicelist"> <IoNotificationsSharp onClick={navigatenotification}/> </div> </li>
        <li className="list"> <div className="servicelist"> <BsFillCartFill className="cart" onClick={navigateCart}/> </div> </li>
        <li className="list"> <div className="servicelist"> 
        {globalloggedIn && < MdPeopleAlt  
        onMouseEnter={()=>{  setpop(false); setpopdog(false); setpopbird(false); setpoprabbit(false); setpopaccount(true);}}/>  }
        {!globalloggedIn && <div className="notloggedin" onClick={navigateSignUp}> LogIn </div>}
        </div> 
         {!popup && !popupdog && !popupbird && !popuprabbit && popaccount && <PopupAccount/>}
        </li>
      </ul>
    </div>
    </nav>
    </div>
  )
}

export default Header
