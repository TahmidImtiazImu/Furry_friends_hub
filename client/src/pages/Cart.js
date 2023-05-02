import React, { useState } from "react";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'
import './Cart.css'
import { BsDisplay } from "react-icons/bs";
import CartItem from "../Components/CartItem/CartItem";

function Cart() {
  return (
    <>
        {/* ----------------Header--------------- */}
        <Header/>

        {/* -------------Cart Body ----------------- */}
        <div className="CartBody">
            <div className="CartForm">
                <p>Your Information:</p>
                <div className="CartFormInfo">
                    <div className="CartHorizon">
                        <div>Name:</div>
                        <input className="inputarea" type="text" placeholder="Name"/>
                    </div>
                    <div className="CartHorizon phone">
                        <div>Phone:</div>
                        <input className="inputarea" type="text" placeholder="Phone"/>
                    </div>
                </div>
                <div className="CartHorizon">
                    <div>E-mail: </div>
                    <input className="inputarea" type="text" placeholder="E-mail"/>
                </div>
                <div className="CartHorizon">
                    <div>Street Address: </div>
                    <input className="inputarea" type="text" placeholder="Street Address"/>
                </div>
                <div className="CartHorizon">
                    <div>Post Office: </div>
                    <input className="inputarea" type="text" placeholder="Post Office"/>
                </div>
                <div className="CartHorizon">
                    <div>District: </div>
                    <input className="inputarea" type="text" placeholder="District"/>
                </div>
                <div className="CartHorizon">
                    <div>Post Code: </div>
                    <input className="inputarea" type="text" placeholder="Post Code"/>
                </div>
                <div className="areaMargin">
                    <div>Notes:</div>
                    <textarea className="textareaNotes" type="text" placeholder="Finish Your Sentences under 300 length" maxLength={300}/>
                </div>
            </div>
            <div className="Cartdivider"></div>
            <div className="CartItems">
                <p>Your Order:</p>
                <div className="individualcartItem">
                    <CartItem />
                    <CartItem/>
                    <CartItem/>
                    <CartItem/>
                    <CartItem/>
                    <CartItem/>
                    <CartItem/>
                    <CartItem/>
                </div>
                <p> Delivery Charge: 1600 tk</p>
                <button className="buynowbtn">Buy Now</button>
            </div>
        </div>

        {/* ---------------Footer----------------- */}
        <Footer/>
    </>
  )
}

export default Cart