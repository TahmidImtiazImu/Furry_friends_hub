import React, { useState, useEffect, useContext } from "react";
import { saveAs } from "file-saver";
import { pdf, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "./Cart.css";
import CartItem from "../Components/CartItem/CartItem";
import { GlobalContext } from "../Global";
import { toast } from "react-toastify";

function Cart() {
    const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail, globalType, setGlobalType, globalSubtype, setGlobalSubtype } = useContext(GlobalContext);
    const [cartItems, setCartItems] = useState([]);
    const [Name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [contactmail, setContactmail] = useState('');
    const [address, setAddress] = useState('');
    const [note, setNote] = useState('');

    const handlename = (e) => {
      const newInput = e.target.value;
      setName(newInput);
    }

    const handlephone = (e) => {
      const newInput = e.target.value;
      setPhone(newInput);
    }

    const handlemail = (e) => {
      const newInput = e.target.value;
      setContactmail(newInput);
    }

    const handleaddress = (e) => {
      const newInput = e.target.value;
      setAddress(newInput);
    }

    const handlenote = (e) => {
      const newInput = e.target.value;
      setNote(newInput);
    }

    useEffect(() => {
      async function fetchData() {
        const response = await axios.get(`/api/cart/${globalemail}`);
        const cartItemsWithProductInfo = await Promise.all(
          response.data.map(async (item) => {
            const productResponse = await axios.get(`/products/cart/${item.item}`);
            const productData = productResponse.data;
            return {
              ...item,
              name: productData.name,
              price: productData.price,
              stock: productData.stock
            };
          })
        );
        setCartItems(cartItemsWithProductInfo);
      }
      fetchData();
    }, [globalemail]);   

    // const [prices, setPrices] = useState([]);

    // const handlePriceFetched = (newPrice) => {
    //     const index = prices.findIndex((p) => p.id === newPrice.id);
    //     if (index === -1) {
    //       // id does not exist in the array, add a new object
    //       setPrices([...prices, newPrice]);
    //     } else {
    //       // id already exists in the array, update the price of the object
    //       const updatedPrices = [...prices];
    //       updatedPrices[index].price = newPrice.price;
    //       setPrices(updatedPrices);
    //     }
    // };
  
    async function getTotalPrice() {
      let total = 0;
      for (const item of cartItems) {
        const response = await axios.get(`/cart/products/${globalemail}/${item.item}`);
        console.log("Printing retrieved quantity for total: " + response.data);
        total += response.data * item.price;
        item.quantity = parseInt(response.data);
        console.log("Changing quantity retrieved: " + item.quantity);
      }
      return total;
    }

    const [totalPrice, setTotalPrice] = useState(0);
    const [toggle, setToggle] = useState(0);

    useEffect(() => {
      console.log("Toggle State : " + toggle);
      getTotalPrice().then(price => setTotalPrice(price));
    }, [cartItems, toggle]);

    function checkcart(){
      if(cartItems.length > 0){
        return true;
      }
      return false;
    }


  // Function to generate the PDF receipt
  const generateReceipt = async () => {
    const doc = (
      <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Receipt</Text>
          <View style={styles.info}>
            <Text>Name: {Name}</Text>
            <Text>Phone: {phone}</Text>
            <Text>E-mail: {contactmail}</Text>
            <Text>Address: {address}</Text>
            <Text>Special Note: {note}</Text>
          </View>
          <View>
            <Text style={styles.productName}>Products:</Text>
            {cartItems.map(item => (
              <Text key={item.item} style={styles.productQuantity}>
                {item.name} - {item.quantity}
              </Text>
            ))}
          </View>
          <Text style={styles.totalPrice}>Total Price: {totalPrice} tk</Text>
        </View>
      </Page>
    </Document>
    );

    const asPdf = pdf();
    asPdf.updateContainer(doc);
    const blob = await asPdf.toBlob();
    saveAs(blob, "receipt.pdf");
    console.log("Receipt downloaded");
  };

    function logCartItems() {
        if(Name == '' || phone==''||contactmail==''||address==''){
          toast.error("please Fill up your information");
        }
        else if (cartItems.length > 0) {
          // cartItems.map(item => console.log(item.item));
          handleBuyNow();
        }
      }
  // Define a function to handle the Buy Now button click  
  const handleBuyNow = async () => {
    // const orderData = cartItems.map((item) => ({
    //   item: item.item,
    //   quantity: item.quantity,
    //   name: item.name,
    // }));

    const response = await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: globalemail, cartItems: cartItems, price: totalPrice, 
        status: "processing", name: Name, phone: phone, contact: contactmail, address: address, note: note}),
    });

    if (response.ok) {
      // handle success
      cartItems.map(item => {
        deleteItem(item.item);
      });
      generateReceipt();
      toast.success("Product order on Process");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      // handle error
      toast.error("Transaction failed!");
    }
  };

  async function deleteItem(Id) {
    try {
      console.log("Deleting item from the cart");
      const response = await axios.delete('/api/cart/delete', {
        data: {
          email: globalemail,
          id: Id,
        }
      });
      console.log(response.data);
      // TODO: handle cart item deletion success
    } catch (error) {
      console.error(error);
    }
  }

  // Styles for the PDF receipt
  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: 11,
      paddingTop: 30,
      paddingLeft: 60,
      paddingRight: 60,
      lineHeight: 1.5,
      flexDirection: "column",
      backgroundColor: "#f2f2f2",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      backgroundColor: "white",
      borderRadius: 5,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
      marginBottom: 30,
      textTransform: "uppercase",
    },
    info: {
      marginBottom: 10,
    },
    productName: {
      fontSize: 12,
      marginBottom: 5,
    },
    productQuantity: {
      fontSize: 10,
      marginLeft: 10,
    },
    totalPrice: {
      fontSize: 14,
      fontWeight: "bold",
      marginTop: 20,
    },
  });  

    return (
    <>
        {/* ----------------Header--------------- */}
        <Header/>
        <br></br> <br></br>

        {/* -------------Cart Body ----------------- */}
        <div className="CartBody">
            <div className="CartForm">
                <p>Your Information:</p>
                <div className="CartFormInfo">
                    <div className="CartHorizon">
                        <div>Name:</div>
                        <input className="inputarea" type="text" placeholder="Name" onChange={handlename} required/>
                    </div>
                    <div className="CartHorizon phone">
                        <div>Phone:</div>
                        <input className="inputarea" type="text" placeholder="Phone" onChange={handlephone} required/>
                    </div>
                </div>
                <div className="CartHorizon">
                    <div>E-mail: </div>
                    <input className="inputarea" type="text" placeholder="E-mail" onChange={handlemail} required/>
                </div>
                <div className="CartHorizon">
                    <div>Street Address: </div>
                    <input className="inputarea" type="text" placeholder="Street Address"/>
                </div>
                <div className="CartHorizon">
                    <div>Post Office: </div>
                    <input className="inputarea" type="text" placeholder="Post Office"/>
                </div>
                <div className="CartHorizon">
                    <div>District: </div>
                    <input className="inputarea" type="text" placeholder="District" onChange={handleaddress} required/>
                </div>
                <div className="CartHorizon">
                    <div>Post Code: </div>
                    <input className="inputarea" type="text" placeholder="Post Code"/>
                </div>
                <div className="areaMargin">
                    <div>Notes:</div>
                    <textarea className="textareaNotes" type="text" placeholder="Finish Your Sentences under 300 length" maxLength={300} onChange={handlenote}/>
                </div>
            </div>
            <div className="Cartdivider"></div>
            <div className="CartItems">
                <p>Items in your Cart: {!checkcart() && <div>Cart is empty</div>}</p>
                <div className="individualcartItem">
                    {/* Loop through cartItems array and render CartItem component */}
                    {cartItems.map(item => (
                        <CartItem id={item.item} quantity={item.quantity} name = {item.name} price={item.price} stock={item.stock} trigger = {setToggle}/>
                    ))}
                </div>
                <hr /> {/* Add horizontal line here */}
                <p> Total: {totalPrice} tk</p>
                <p> Delivery Charge: 40 tk</p>
                <button type="submit" className="buynowbtn" onClick={logCartItems}>Buy Now</button>
            </div>
        </div>

        {/* ---------------Footer----------------- */}
        <Footer/>
    </>
  )
}

export default Cart