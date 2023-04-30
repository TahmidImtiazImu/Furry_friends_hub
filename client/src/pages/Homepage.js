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
import Header from "./Header";
import Footer from "./Footer";



const Homepage = () => {

  // const handleClick = () => {
  //   alert("You clicked me!"); 
  // }  
  
  // const Card_homeimages = () =>{
  //   return (
  //   <div >
  //     <img src={"/images/Cat.jpeg"} alt="React Image" className="pet_image"/> 
  //         <button className="shopnow">Shop now</button>
  //   </div>
  //   )
  // }


  return (
    <>
    {/* HEADERRRRRRRRRRRRRRRRRRRRR */}
    
      <Header/>
     
      {/* BODDDDDDDDDDDDDDDDYYYYYYYYYYYYYYYY */}
      <body className="body">
      <div className="all_images">
        <ul>
        <ul className="images">
          <li><img src={"/images/Cat.jpeg"}  className="pet_image"/></li>
          <li><img src={"/images/dog.jpg"} alt="React Image" className="pet_image"/></li>
          <li><img src={"/images/rabbit.webp"} alt="React Image" className="pet_image"/></li>
        </ul>
        <ul className="images2">
        <li><img src={"/images/bird.jpg"} alt="React Image" className="pet_image2"/></li>
        <li><img src={"/images/pet_sitter.jpg"} alt="React Image" className="pet_image2"/></li>
        </ul>
        </ul>
      </div>

        <ul className="body_writing">
        <ul className="delivery">
        <li className="list"> <a href><GrDeliver className="_servicelist"/> </a></li>
        <li> <p> Delivry all over bangladesh. Fast delivery is ensured. </p></li> 
        </ul>
        <ul className="security">
        <li className="list"> <a href><MdOutlineSecurity className="_servicelist"/> </a></li>
        <li> <p> Provide best security for you 
          and your product. </p></li> 
        </ul>
        <ul className="satisfied">
        <li className="list"> <a href><MdSentimentSatisfiedAlt className="_servicelist"/> </a></li>
        <li> <p> Reliable and satisfiable services. Give ensurity of best product and will meet your need. </p></li> 
        </ul>
        </ul>
        
      </body>
      <Footer/>


      {/* FOOOOOOOOOOOOOOOOTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEERRRRRRRRRRRRR */}
      
    </>

  )
}

export default Homepage;