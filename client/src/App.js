import React,{useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Product from './pages/Product'
import Signup from './pages/Signup'
import "./App.css";

function App() {
  return(
    <Router>
        <Routes>
            <Route path="/" element={<Homepage/>}  />
            <Route path="/product" element={<Product/>}  />
            <Route path="/Signup" element={<Signup/>} />
        </Routes>
    </Router>
  )
}

export default App
