import React, { useState } from "react";
import './productPopupInfo.css'

export const productPopupInfo = ({closepop}) => {
  // const[popuproduct,setpoproduct] = useState(closepop);
  return (
    <div>
      <div className='ProductInfo'>productPopupInfo
      <div>
      <button className='productpopcancel' onClick={()=>closepop(false)}>X</button>
      </div>
      </div>

    </div>
    
  )
}

export default productPopupInfo