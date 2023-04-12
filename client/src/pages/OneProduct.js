import React from 'react'
import "./OneProduct.css"

const OneProduct = () => {
  return ( 

    <div className="oneproduct">
        <div className="stock">
         Stock:3
        </div>
        <div>
          <img className="productimage" src="/images/cat_food.jpg"></img>
        </div>
        <div>
          Cat food
        </div>
        <div>
            180tk
        </div>

    </div>
  )
}

export default OneProduct
