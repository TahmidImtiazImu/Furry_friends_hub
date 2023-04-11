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

const theme = {
  blue: {
    default: "#3f51b5",
    hover: "#283593"
  },
  pink: {
    default: "#e91e63",
    hover: "#ad1457"
  }
};
const Button = styled.button`
background-color: ${(props) => theme[props.theme].default};
color: white;
padding: 5px 15px;
border-radius: 5px;
outline: 0;
text-transform: uppercase;
margin: 10px 0px;
cursor: pointer;
box-shadow: 0px 2px 2px lightgray;
transition: ease background-color 250ms;
&:hover {
  background-color: ${(props) => theme[props.theme].hover};
}
&:disabled {
  cursor: default;
  opacity: 0.7;
}
`;

const StyledButton = styled.button`
  font-size: 12px;
`;

const Homepage = () => {

  const handleClick = () => {
    alert("You clicked me!"); 
  }  

  const navigate = useNavigate();

  const navigateSignUp = () => {
    navigate('/Signup');
  }
  const navigateProduct =() =>{
    navigate('/Product');
  }
  const toggleHover =() =>{
    this.setState({hover: !this.state.hover})
  }
  const[popup,setpop] = useState(false);
  return (
    <>
    {/* HEADERRRRRRRRRRRRRRRRRRRRR */}
    
    <nav className="navBar">
      {/* NAME OF THE WEBSITEEE */}
      <div className="website_name">
          <span>F</span>urry
          <span>F</span>riends
          <span>H</span>ub
      </div>

      {/* SERVICE LIST */}
      <div className="service">
        <ul>
          <li className="list"> 
          <a href onMouseEnter={()=>{setpop(true);}}  onClick={navigateProduct}><FaCat className="servicelist"/> </a>
           {popup && <Popup closepop={setpop}/>}
           </li>
          <li className="list"> <a href onClick={navigateProduct}><FaDog className="servicelist"/> </a></li>
          <li className="list"> <a href onClick={navigateProduct}> <GiRabbit className="servicelist"/> </a></li>
          <li className="list"> <a href onClick={navigateProduct}> <FaKiwiBird className="servicelist"/> </a></li>
          <li className="list"> <a href onClick={navigateProduct}> <BsFillHouseFill className="servicelist"/> </a></li>
          <li className="list"> <a href onClick={navigateProduct}> <FaWalking className="servicelist"/> </a></li>
        </ul>
     </div>

     {/* SIGNUP and CART */}
    <div className="signup_and_cart">
      <ul>
      <li className="list"> <div><input type="text" placeholder="Search here" className="input"/> 
      <span className="search_icon"><AiOutlineSearch/></span>  </div></li>
        <li className="list"><BsFillCartFill className="cart"/> </li>
        <li className="list"><StyledButton onClick={navigateSignUp}> <MdPeopleAlt/> </StyledButton></li>
      </ul>
      
    </div>
    </nav>


      {/* BODDDDDDDDDDDDDDDDYYYYYYYYYYYYYYYY */}
      <body className="body">
        <div className="all_images">
        <ul className="images">
          <li><img src={"/images/Cat.jpeg"} alt="React Image" className="pet_image"/></li>
          <li><img src={"/images/dog.jpg"} alt="React Image" className="pet_image"/></li>
          <li><img src={"/images/rabbit.webp"} alt="React Image" className="pet_image"/></li>
        </ul>
        <ul className="images2">
        <li><img src={"/images/bird.jpg"} alt="React Image" className="pet_image2"/></li>
        <li><img src={"/images/pet_sitter.jpg"} alt="React Image" className="pet_image2"/></li>
        </ul>
        </div>

        <ul className="body_writing">
        <ul className="delivery">
        <li className="list"> <a href><GrDeliver className="servicelist"/> </a></li>
        <li> <p> Delivry all over bangladesh. Fast delivery is ensured. </p></li> 
        </ul>
        <ul className="security">
        <li className="list"> <a href><MdOutlineSecurity className="servicelist"/> </a></li>
        <li> <p> Provide best security for you 
          and your product. </p></li> 
        </ul>
        <ul className="satisfied">
        <li className="list"> <a href><MdSentimentSatisfiedAlt className="servicelist"/> </a></li>
        <li> <p> Reliable and satisfiable services. Give ensurity of best product and will meet your need. </p></li> 
        </ul>
        </ul>
        
      </body>



      {/* FOOOOOOOOOOOOOOOOTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEERRRRRRRRRRRRR */}
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
          <li className="socialmedia_list"> <a href ><BsFacebook className="servicelist"/> </a></li>
          <li className="socialmedia_list"> <a href><BsInstagram className="servicelist"/> </a></li>
          <li className="socialmedia_list"> <a href> <BsWhatsapp className="servicelist"/> </a></li>
          <li className="socialmedia_list"> <a href> <BsTwitter className="servicelist"/> </a></li>
          <li className="socialmedia_list"> <a href> <BsYoutube className="servicelist"/> </a></li>
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
    </>

  )
}

export default Homepage;


