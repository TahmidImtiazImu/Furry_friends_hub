import React, { useState, useRef, useEffect ,useContext } from "react";
import axios from "axios"
import withAuth from '../Authentication/withAuth';
import './AdminRestock.css';

function AdminRestock() {
    const [ID, setID] = useState('');
    const [stock, setStock] = useState(0);

    const updateProducts = async (event) => {
      event.preventDefault();
      console.log("Updating stock of- " + ID + " and stock- " + stock);
    
      try {
        const response = await axios.post('/Admin/restock', { ID, stock });
        console.log(response.data);
        alert("Product stock updated");
      } catch (error) {
        console.error(error);
      }
    };
    

      return (
        <form onSubmit={updateProducts}>
          <div className='restocking-id'>
            <div>Product ID: </div>
            <input type='text' value={ID} onChange={(e) => setID(e.target.value)} placeholder='Product ID' required/>
          </div>
          <div className="restocking-stock">
            <div>New stock: </div>
            <input type='numeric' value={stock} onChange={(e) => setStock(e.target.value)} required/>
          </div>
          <button type="submit" className="restockin-button">ReStock</button>
        </form>
      )      
}

export default withAuth(AdminRestock); 