import React, { useState, useRef, useEffect } from "react";
import "./ProductModal.css";

const ProductModal = ({title, image, price, stock, about, closepop }) => {
  const popModalBackgroundclass = `popModalBackground ${closepop ? 'show' : ''}`;
  var title = "Cat Food";
  const [baal, setbaal] = useState(true);
  const popupRef = useRef(null);

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
          <img src={image} alt="Cat Food" />
        </div>
        <p>Price: {price} tk</p>
        <p>Stock: {stock}</p>
        <p>{about}</p>
        <div className="add-to-cart-container">
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
