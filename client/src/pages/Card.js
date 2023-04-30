import React,{useState} from 'react'
import './SIgnup.css'
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
export const Card = ({title,img,singuppopup}) => {

    

    const navigate = useNavigate();

    const clickCustomer = () => {
        if(title == "Cutomer"){
            navigate('/customerSignup');
        }
        else {
            // alert("Service not yet available :(");
            singuppopup(true);
        }
        
    }
  return (
    <div className='card'>
            <div className='card_body'>
                <img src= {img}
                class='card_img'/>
                {/* <h2 className='card_title'> {props.title} </h2> */}
                <button className="card__btn" onClick={clickCustomer}> {title}</button>
            </div>
        </div>
  )
}

export default Card
