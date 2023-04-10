import React,{useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Homepage from './Homepage'
import Product from './Product'


function App() {
  return(
    <Router>
        <Routes>
            <Route path="/" element={<Homepage/>}  />
            <Route path="/product" element={<Product/>}  />
        </Routes>
    </Router>
  )
}

export default App
