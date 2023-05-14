import {React, useContext, useEffect, useState} from 'react'
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { GlobalContext } from '../../Global';
import './CartItem.css'

function CartItem(props) {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(props.quantity);
  const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail, globalType, setGlobalType, globalSubtype, setGlobalSubtype } = useContext(GlobalContext);
  console.log("In cart Card: ID- " + props.id + " and quantity- " + quantity);
  useEffect(() => {
    async function fetchProduct() {
      console.log("fetching product for cart: ");
      const productID =  props.id;  //parseInt(props.id.slice(1)); // convert product ID to integer
      console.log("Product ID : " + productID);
      const response = await fetch(`/products/cart/${productID}`);
      const data = await response.json();
      setProduct(data);
    }

    fetchProduct();
  }, [props.id]);
  // console.log("Product fetched: name- " + product);
  const handleQuantityChange = async (newQuantity) => {
    console.log("Changing quantity");
    if (newQuantity < 1) {
      newQuantity = 1;
    }

    setQuantity(newQuantity);

    try {
      console.log("Updating quantity in the database");
      const response = await axios.put('/api/cart/update', {
        email: globalemail,
        id: props.id,
        quantity: newQuantity,
      });
      console.log(response.data);
      setQuantity(newQuantity);
    } catch (error) {
      console.error(error);
    }
  }

  const handleQuantityInput = async (event) => {
    let newQuantity = parseInt(event.target.value);

    if (isNaN(newQuantity)) {
      newQuantity = 1;
    }

    handleQuantityChange(newQuantity);
  }

  const handleDelete = async () => {
    try {
      console.log("Deleting item from the cart");
      const response = await axios.delete('/api/cart/delete', {
        data: {
          email: globalemail,
          id: props.id,
        }
      });
      console.log(response.data);
      // TODO: handle cart item deletion success
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
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
            <input className='inputquantity' type='text' value={quantity} onChange={handleQuantityInput}/>
            <FaPlus className='interactor' onClick={() => handleQuantityChange(quantity + 1)}/>
          </div>
          {product && <div className="cartproduct-price">{quantity * product.price} tk</div>}
          <FaTrash className='cartTrash' onClick={handleDelete}/>
        </div> 
        <div className='carthorizontalLine'></div>
      </div>
    </div>
  )
}

export default CartItem;
