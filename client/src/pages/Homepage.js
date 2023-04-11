import React, { useState } from "react";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import {BsSearch} from 'react-icons/bs'
import styled from "styled-components";
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
  background-color: black;
  font-size: 12px;
  color: white;
`;

const Homepage = () => {

  const handleClick = () => {
    alert("You clicked me!"); 
  }  

  const navigate = useNavigate();

  const navigateSignUp = () => {
    navigate('/Signup');
  }

  return (
    <>
    <header className='header'>  
      <div >
      <StyledButton onClick={navigateSignUp}>Sign up</StyledButton>
      </div>
      </header>
      <body>
        <div>
          Body
        </div>
      </body>
      <footer>
        <div>
          Footer
        </div>
      </footer>
    </>

  )
}

export default Homepage;

{/* <header className='header'>  
      <div >
        <button type="button" onClick={handleClick}>
          SignUp
        </button>
      </div>
      </header>
      <body>
        <div>
          Body
        </div>
      </body>
      <footer>
        <div>
          Footer
        </div>
      </footer> */}
