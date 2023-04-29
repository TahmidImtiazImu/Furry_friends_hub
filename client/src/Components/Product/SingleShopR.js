import React, { useState } from "react";
import { FaPlus, FaMinus, FaCartPlus } from 'react-icons/fa';
import './singleShopCart.css'

function SingleShopR(props) {
  const [Quantity, setQuantity] = useState('0');
  function addquantity(){
    if(Quantity < 100){
      setQuantity(Number(Quantity) + 1);
    }
  }
  function minusquantity(){
    if(Quantity > 0){
        setQuantity(Number(Quantity) - 1);
    }
  }
  return (
    <>
        <div className='perShop'>
            <div>{props.shop_name}</div>
            <div><FaMinus className='decrementitem' onClick={minusquantity}/>
            <input className='inputQuantity' type='text' value={Quantity}/>
            <FaPlus className='additem' onClick={addquantity}/>
            </div>
            <div className='totalpriceShop'>
                180 tk
            </div>
            <div  className='addtocart'>
                <FaCartPlus/>
            </div>
        </div>
    </>
  )
}

export default SingleShopR