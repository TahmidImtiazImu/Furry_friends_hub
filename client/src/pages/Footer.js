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

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer_box">
          <div className="footer_div">
           <ul>
            <li> ABOUT US</li>
            <li> <p>This is the best e-commerce site for your
              preferable choice for cat or preferable choice for any 
              pet accessories. Also you can get pet sitting services
              from here.
            </p>
            </li>
            <ul className="footer_social_media">
          <li className="socialmedia_list"> <a href ><BsFacebook className="socialservicelist"/> </a></li>
          <li className="socialmedia_list"> <a href><BsInstagram className="socialservicelist"/> </a></li>
          <li className="socialmedia_list"> <a href> <BsWhatsapp className="socialservicelist"/> </a></li>
          <li className="socialmedia_list"> <a href> <BsTwitter className="socialservicelist"/> </a></li>
          <li className="socialmedia_list"> <a href> <BsYoutube className="socialservicelist"/> </a></li>
            </ul>
            </ul>
          </div>
          <div className="footer_div"> 
           <ul> <p>Recent News</p>
            <li> Services </li>
            <li> Get in touch </li>
           </ul>
          </div>
          <div className="footer_div"> 
           <ul> <p>Contact Us</p>
            <li> Phone : </li>
            <li> 017******** </li>
            <li> Email : </li>
            <li> furryhub@gmail.com </li>
           </ul>
          </div>
        </div>
        <hr classname="horizontal_line"></hr>
        <div >
          <p className="copyright">COPYRIGHT 2023 Furry Friends Hub | SITE DEVELOPED BY Imu and Jobayer</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
