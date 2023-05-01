import React from 'react'
import './CartItem.css'
import Items from './Items'

function CartItem(props) {
  return (
    <div className='marginwhole'>
        {props.shopName}:
        <div className="cartproductheader">
            <div className='margin-Right'>Product</div>
            <div className='margin-Right'>Quantity</div>
            <div className='margin-Right'>Price</div>
            <div className='margin-Right'></div>
        </div>
        <div>
            <Items serialId="1" ProductName="Cat Food" quantity="1"/>
            <div className='carthorizontalLine'></div>
        </div>
    </div>
  )
}

export default CartItem