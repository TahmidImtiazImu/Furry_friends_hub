import React, { useState } from "react";
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
function clickMe() {
  alert("You clicked me!");
}
const Homepage = () => {
  return (
    <>
     styled.button`color = white`
    </>

  )
}

export default Homepage
{/* <header className='header'>  */}
{/* <div >
  <div>
    Button
  </div>
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