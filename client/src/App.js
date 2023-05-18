import React,{useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Product from './pages/Product'
import Signup from './pages/SIgnup'
import CustomerSignup from './pages/CustomerSignup'
import LogIn from './pages/LogIn'
import ServiceSIgnup from './pages/ServiceSIgnup'
import Cart from './pages/Cart'
import "./App.css";
import PetSitter from './pages/PetSitter'
import Signupindividual from './pages/Signupindividual'
import PersonList from './pages/PersonList'
import Profile from './pages/Profile'
import AdminUpload from './Components/Admin/AdminUpload'
import Notification from './Components/Notification/Notification'

import AdminRestock from './Components/Admin/AdminRestock'
import AdminOrderLsit from './Components/Admin/AdminOrderLsit'
import TermsAndPolicies from './Components/TermsAndPolicies/TermsAndPolicies'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return(
    <Router>
        <Routes>
            <Route path="/" element={<Homepage/>}  />
            <Route path="/Product/:query?" exact Component={Product}  />
            <Route path="/Signup" element={<Signup/>} />
            <Route path="/customerSignup" element={<CustomerSignup/>} />
            <Route path="/Login" element={<LogIn/>} />
            <Route path="/ServiceSIgnup" element={<ServiceSIgnup/>} />
            <Route path='/Cart' element={<Cart/>}/>
            <Route path='/Petsitter' element={<PetSitter/>}/>
            <Route path='/Signupindividual' element={<Signupindividual/>}/>
            <Route path='/PersonList' element={<PersonList/>}/>
            <Route path='/Profile' element={<Profile/>}/>
            <Route path='/Admin' element={<AdminUpload/>}/>
            <Route path='/Notification' element={<Notification/>}/>
            <Route path='/Admin/Restock' element={<AdminRestock/>}/>
            <Route path='/Admin/Orders' element={<AdminOrderLsit/>}/>
            <Route path='/TermsAndPolicies' element={<TermsAndPolicies/>}/>
        </Routes>
        <ToastContainer/>
    </Router>
  )
}

export default App
