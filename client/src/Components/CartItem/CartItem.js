import {React, useContext, useEffect, useState} from 'react'
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { GlobalContext } from '../../Global';
import './CartItem.css'

function CartItem(props) {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(props.quantity);
  const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail, globalType, setGlobalType, globalSubtype, setGlobalSubtype } = useContext(GlobalContext);
  console.log("In cart Card: ID- " + props.id + " and quantity- " + quantity);
  const productID = props.id;
  console.log("Product ID : " + productID);
  useEffect(() => {
    async function fetchProduct() {
      console.log("fetching product for cart: ")
      const response = await fetch(`/api/product/${productID}`);
      const data = await response.json();
      setProduct(data);
    }

    fetchProduct();
  }, [props.id]);

  function handleQuantityChange(newQuantity) {
    if (newQuantity < 1) {
      newQuantity = 1;
    }

    setQuantity(newQuantity);
  }

  function handleQuantityInput(event) {
    let newQuantity = parseInt(event.target.value);

    if (isNaN(newQuantity)) {
      newQuantity = 1;
    }

    handleQuantityChange(newQuantity);
  }

  return (
    <div className='marginwhole'>
      <div className="cartproductheader">
        <div className='margin-Right'>Product</div>
        <div className='margin-Right'>Quantity</div>
        <div className='margin-Right'>Price</div>
        <div className='margin-Right'>  </div>
      </div>
      <div>
        {/* items info row */}
        <div className="cartproduct">
          {product && <div className="cartproduct-id">{product.name}</div>}
          <div className="cartproduct-quantity">
            <FaMinus className='interactor' onClick={() => handleQuantityChange(quantity - 1)}/>
            <input className='inputquantity' type='text' value={quantity} readOnly/>
            <FaPlus className='interactor' onClick={() => handleQuantityChange(quantity + 1)}/>
          </div>
          <div className="cartproduct-price">180 tk</div>
          <FaTrash className='cartTrash'/>
        </div> 
        <div className='carthorizontalLine'></div>
      </div>
    </div>
  )
}

export default CartItem;
