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
import SearchBar from "../Components/SearchBar/SearchBar";
import { Link } from 'react-router-dom';
import DogSection from "./DogSection";
import BirdSection from "./BirdSection";


const Homepage = () => {

  const CatSection = () => {
    return (
      <div className="section left-section">
        <div className="section-content">
          <div className="section-image">
            <img src="/images/raiseacat.jpeg" alt="Raising a Cat" />
          </div>
          <div className="section-description">
            <h2>The Perfect Companion: Nurturing Your Cat's Well-being</h2>
            <p>
              Are you considering getting a cat as a pet? Cats make wonderful companions and can bring joy and comfort to your life. Here are some essential tips to help you in raising a cat:
            </p>
            <ul>
              <li>Provide a cozy and safe indoor environment for your cat.</li>
              <li>Feed your cat a balanced and nutritious diet suitable for its age and health.</li>
              <li>Keep your cat hydrated by providing fresh water at all times.</li>
              <li>Make sure to provide regular veterinary care, including vaccinations and check-ups.</li>
              <li>Offer plenty of toys and scratching posts to keep your cat mentally and physically stimulated.</li>
              <li>Establish a litter box and litter training routine for your cat's hygiene.</li>
              <li>Give your cat love, attention, and regular playtime to build a strong bond.</li>
            </ul>
            <p>
              By following these guidelines, you can ensure a happy and healthy life for your feline companion.
            </p>
          </div>
        </div>
      </div>
    );
  };



  return (
    <>
    {/* HEADERRRRRRRRRRRRRRRRRRRRR */}
    
      <Header/>
      <br></br> <br></br>
     
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
      <div className="section-wrapper">
          <CatSection />
          <DogSection/>
          <BirdSection/>
          {/* <DogSection />
          <BirdSection />
          <PetSittingSection /> */}
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
      {/* <SearchBar/> */}
      <Footer/>


      {/* FOOOOOOOOOOOOOOOOTTTTTTTTTTTTTTTTEEEEEEEEEEEEEEEEEERRRRRRRRRRRRR */}
      
    </>

  )
}

export default Homepage;