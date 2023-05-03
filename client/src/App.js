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


function App() {
  return(
    <Router>
        <Routes>
            <Route path="/" element={<Homepage/>}  />
            <Route path="/Product" element={<Product/>}  />
            <Route path="/Signup" element={<Signup/>} />
            <Route path="/customerSignup" element={<CustomerSignup/>} />
            <Route path="/Login" element={<LogIn/>} />
            <Route path="/ServiceSIgnup" element={<ServiceSIgnup/>} />
            <Route path='/Cart' element={<Cart/>}/>
            <Route path='/Petsitter' element={<PetSitter/>}/>
            <Route path='/Signupindividual' element={<Signupindividual/>}/>
            <Route path='/PersonList' element={<PersonList/>}/>
            <Route path='/Profile' element={<Profile/>}/>
            <Route path='/Profile' element={<Profile/>}/>

        </Routes>
    </Router>
  )
}

export default App
