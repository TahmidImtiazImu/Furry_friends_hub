import React, { useState } from "react";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'
import './Cart.css'
import { BsDisplay } from "react-icons/bs";

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
                        <input type="text" placeholder="Name"/>
                    </div>
                    <div className="CartHorizon">
                        <div>Phone:</div>
                        <input type="text" placeholder="Phone"/>
                    </div>
                    <div className="CartHorizon">
                        <div>E-mail: </div>
                        <input type="text" placeholder="E-mail"/>
                    </div>
                </div>
            </div>
            <div className="Cartdivider"></div>
            <div className="CartItems">
                <p>Your Order:</p>
            </div>
        </div>

        {/* ---------------Footer----------------- */}
        <Footer/>
    </>
  )
}

export default Cart