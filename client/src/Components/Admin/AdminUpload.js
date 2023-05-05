import React, { useState, useRef, useEffect ,useContext } from "react";
import axios from "axios"
import withAuth from '../Authentication/withAuth';
import './AdminUpload.css'

function AdminUpload() {
    const [pName, setPName] = useState('');
    const [pStock, setPStock] = useState(0);
    const [pPrice, setPPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [pID, setPID] = useState('');
    const [pDetail, setPDetail] = useState("");

    const handleFileInputChange = (e) => {
        setFile(e.target.files[0]);
      };

      const handleImgSubmit = async  (e) => {
        e.preventDefault();
    
        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append("file", file);
        try {
            console.log('admin 1----')
            const response = await axios.post(`/Admin/${pID}`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            console.log(response.data);
          } catch (error) {
            console.error('Admin Error!!');
          }
      };

      const handleTextSubmit = async  (e) =>{
        e.preventDefault();

        fetch('/Admin/texts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ID: pID,
              product_name: pName,
              price: pPrice,
              stock : pStock,
              detail: pDetail
            })
          })
            .then(response => response.json())
            .then(data => console.log(data))
      };

      const handleSubmit = async  (e) => {
        handleTextSubmit(e);
        console.log("product texts uploaded")
        handleImgSubmit(e);
        console.log("product image uploaded");

        alert("Product Restocked");
      };

  return (
    <form className='AdminUpload' onSubmit={handleSubmit}>
        <h2>Product Warehousing</h2>
        <div>
            Product ID:
            <input className='AdminAlign' type='text' value={pID} name='productID' onChange={(e) => setPID(e.target.value)} required/>
        </div>
        <div>
            Product Name:
            <input className='AdminAlign' type='text' value={pName} name='productName' onChange={(e) => setPName(e.target.value)} required/>
        </div>
        <div>
            Product Stock:
            <input className='AdminAlign' type='number' value ={pStock}  name='productStock' onChange={(e) => setPStock(e.target.value)} required/>
        </div>
        <div>
            Product Price:
            <input className='AdminAlign' type='number' value ={pPrice}  name='productPrice' onChange={(e) => setPPrice(e.target.value)} required/>
        </div>

        <div className='AdminAlign'>
            Product image:
            <input
                id="productImg"
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
            />
        </div>

        <div className='AdminAlign'>
            Product Details:
            <textarea className='AdminTextArea' type="text" value={pDetail} onChange={(e) => setPDetail(e.target.value)} placeholder="Finish Your Sentences under 300 length" maxLength={300}/>
        </div>

        <button className='AdminUploadBtn' type='submit'>ReStock</button>

    </form>
  )
}

export default withAuth(AdminUpload); 