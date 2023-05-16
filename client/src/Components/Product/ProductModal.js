import React, { useState, useRef, useEffect, useContext } from "react";
import { GlobalContext } from '../../Global';
import "./ProductModal.css";

const ProductModal = ({id, title, image, price, stock, about, closepop }) => {
  const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail, globalType, setGlobalType, globalSubtype, setGlobalSubtype } = useContext(GlobalContext);
  const popModalBackgroundclass = `popModalBackground ${closepop ? 'show' : ''}`;
  const [baal, setbaal] = useState(true);
  const popupRef = useRef(null);
  console.log("title in modal: " + title + " id of product: " + id);

  function check() {
    closepop(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closepop(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    // Disable scrolling when the popup is open
    if (closepop) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closepop, popupRef]);

  if (!closepop) return null;

  const handleAddToCart = () => {
    if(globalloggedIn){
      addToCart(globalemail, id);
      alert("Product added to cart!");
    }
    else{
      alert("Please Sign In before any purchase!");
    }
   
  }

  const addToCart = (email, productId) => {
    // alert("Inside add to cart!");
    fetch('/add-to-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `email=${email}&product_id=${productId}`
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Product added to cart!')
        } else {
          console.error('Failed to add product to cart')
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }
  

  return (
    <div className={popModalBackgroundclass} onClick={closepop}>
      <div className="modal" ref={popupRef}>
        {/* <div className="PopProductCross">
          <button className="PopProductCrossBtn" onClick={check}>
            <div className="makeitgray">X</div>
          </button>
        </div> */}
        <h2>{title}</h2>
        <div className="image-wrapper">
          <img src={image} alt="product image" />
        </div>
        <p>Price: {price} tk</p>
        <p>Stock: {stock}</p>
        <p>{about}</p>
        <div className="add-to-cart-container">
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
