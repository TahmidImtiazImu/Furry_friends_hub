import React, { useState, useRef, useEffect  } from "react";
import './ProductModal.css'
import SingleShopCart from './SingleShopR'

export const ProductModal= ({closepop}) => { 
    const popModalBackgroundclass = `popModalBackground ${closepop ? 'show' : ''}`;
    var title = "Cat Food"
    const[baal,setbaal] = useState(true);
    const popupRef = useRef(null);
    function check() {
        setbaal(false)
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
      }, [closepop], [popupRef]);
    
      if (!closepop) return null;

  return (
    <div className= {popModalBackgroundclass}>
        <div className="ProductModalInfo" ref={popupRef}>
            <div className="PopProductCross">
                <button  className="PopProductCrossBtn" onClick={check}>{baal && <div className="makeitgray">X</div>}
                {!baal && <div className="makeitgray" onMouseEnter={()=>closepop(false)}>X</div>}</button>
            </div>
            <div className="popProductTitle">{title}</div>
            <div className='PopModalcontent'>
                <div>
                    <div className="popupproductheader">
                        <div>Shop Name</div>
                        <div>Quantity</div>
                        <div>price</div>
                        <div>     </div>
                    </div>
                    <div className="addcartpopup">
                        <SingleShopCart shop_name = "Shop 1"/>
                        <SingleShopCart shop_name = "Shop 2"/>
                        <SingleShopCart shop_name = "Shop 3"/>
                        <SingleShopCart shop_name = "Shop 4"/>
                        <SingleShopCart shop_name = "Shop 5"/>
                        <SingleShopCart shop_name = "Shop 6"/>
                        <SingleShopCart shop_name = "Shop 7"/>
                        <SingleShopCart shop_name = "Shop 8"/>
                        <SingleShopCart shop_name = "Shop 9"/>
                    </div>
                    <div style={{ flex: 1, backgroundColor: "cyan", height: "1px", marginTop: "10px"  }}/>
                    <div className="finalproductresult">
                        <div>     

                        </div>
                        <div>Total:

                        </div>
                        <div>1620 tk

                        </div>
                        <div>     </div>
                    </div>
                    <div className="BuyNowfrompopup">
                    <button className="BuyNowfrompopupBtn">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductModal