import React, { useState } from "react";
import './productPopupInfo.css'

export const productPopupInfo = ({closepop}) => {
  // const[popuproduct,setpoproduct] = useState(closepop);
  const click = () => {
    closepop(false);
  }

  return (
    <div>
      <div className='ProductInfo'>
       <div><p>ProductInfo</p></div> 
      <button className="productpopcancel" onMouseEnter={click}>x</button>
      
      </div>

    </div>
    
  )
}

export default productPopupInfo