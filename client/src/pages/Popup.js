import React from 'react'
import "./Popup.css"

const Popup = ({closepop}) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <ui>
            <li className="cat_product">Cat Food</li>
            <hr></hr>
            <li className="cat_product">Cat Toy</li>
            <hr></hr>
            <li className="cat_product">Cat Shampoo</li>
            <hr></hr>
            <li className="cat_product">Cat Dress</li>
            <hr></hr>
            <li className="cat_product">Cat Litter</li>
            <hr></hr>
            <li className="cat_product">Cat Bowl</li>
            <hr></hr>
            <li className="cat_product">Cat Perfume</li>            
            <li className="titleCloseBtn">
               <button
                onClick={() => {
                closepop(false);}}>close
               </button>
            </li>
        </ui>

      </div>
    </div>
  )
}

export default Popup
