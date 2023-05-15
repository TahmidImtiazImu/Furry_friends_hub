import React, { useState, useRef, useEffect ,useContext } from "react";
import axios from "axios"
import withAuth from '../Authentication/withAuth';
import './AdminUpload.css'
import { Link } from "react-router-dom";

const options = [
  { value: 'cat', label: 'Cat' },
  { value: 'dog', label: 'Dog' },
  { value: 'bird', label: 'Bird' },
  { value: 'rabbit', label: 'Rabbit' }
];

const suboptions = [
  {value: 'food', label: 'Food'},
  {value: 'care', label: 'Care'},
  {value: 'accessories', label: 'Accessories'}
];

function AdminUpload() {
    const [pName, setPName] = useState('');
    const [pStock, setPStock] = useState(0);
    const [pPrice, setPPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [pID, setPID] = useState('');
    const [pDetail, setPDetail] = useState("");
    const [selectedOption, setSelectedOption] = useState('');
    const [subtype, setsubtype] = useState('');

  function handletypeChange(event) {
    setSelectedOption(event.target.value);
    console.log(selectedOption);
  }

  function handleSubtypechange(event) {
    setsubtype(event.target.value);
    console.log(subtype);
  }

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
              detail: pDetail,
              type: selectedOption,
              subtype: subtype
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
                required
            />
        </div>

        <div>
          <label htmlFor="limited-options-input">Select an option:</label>
          <select id="limited-options-input" value={selectedOption} onChange={handletypeChange} required>
            <option value="">--Select an option--</option>
            {options.map(option => (
              <option key={option.value} value={option.value} required>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="limited-suboptions-input">Select an option:</label>
          <select id="limited-suboptions-input" value={subtype} onChange={handleSubtypechange} required>
            <option value="">--Select an option--</option>
            {suboptions.map(option => (
              <option key={option.value} value={option.value} required>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className='AdminAlign'>
            Product Details:
            <textarea className='AdminTextArea' type="text" value={pDetail} onChange={(e) => setPDetail(e.target.value)} placeholder="Finish Your Sentences under 300 length" maxLength={300} required/>
        </div>

        <button className='AdminUploadBtn' type='submit'>Stock</button>
        <Link to="/Admin/Restock">ReStock</Link>
        <Link to="/Admin/Orders">Orders List</Link>

    </form>
  )
}

export default withAuth(AdminUpload); 