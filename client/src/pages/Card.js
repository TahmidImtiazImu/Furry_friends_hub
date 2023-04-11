import React from 'react'
import './SIgnup.css'
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
export const Card = (props) => {
    const navigate = useNavigate();

    const clickCustomer = () => {
        if(props.title == "Cutomer"){
            navigate('/customerSignup');
        }
        else {
            alert("Service not yet available :(");
        }
        
    }
  return (
    <div className='card'>
            <div className='card_body'>
                <img src= {props.img} 
                class='card_img'/>
                {/* <h2 className='card_title'> {props.title} </h2> */}
                <button className="card__btn" onClick={clickCustomer}>{props.title}</button>
            </div>
        </div>
  )
}

export default Card
