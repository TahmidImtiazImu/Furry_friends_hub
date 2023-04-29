import React, { useState } from "react";
import './ProductModal.css'
import SingleShopCart from './SingleShopR'
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<ProductModal />);
// export const singleShopCart = (props)=> {
//     // alert(props.shop_name);
//     return (
//         <h1>
//         {props.shop_name}
//         </h1>
//     )
// }

export const ProductModal= ({closepop}) => { 
    var title = "Cat Food"
    const[baal,setbaal] = useState(true);
    function check() {
        // alert("checking!");
        // <div onMouseEnter={()=> closepop(false)}/>
        setbaal(false)
    }
  return (
    <div className="popModalBackground">
        <div className="ProductModalInfo">
            <div className="PopProductCross">
                <button  onClick={check}>{baal && <div className="makeitgray">X</div>}{!baal && <div className="makeitgray" onMouseEnter={()=>closepop(false)}>X</div>}</button>
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