import React, { useState, useRef, useEffect  } from "react";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import axios from "axios"
import './uploadprofilepic.css'


const Uploadprofilepic = ({close}) => {

    const navigate = useNavigate();
    const popimagemodalbackground = `popimagemodalbackground  ${close ? 'show' : ''}`;
    const popupRef = useRef(null);
    const [file, setFile] = useState(null);
    const[baal,setbaal] = useState(true);
    var email = "mf@gmail.com";
    const handleFileInputChange = (e) => {
        setFile(e.target.files[0]);
      };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append("file", file);
    
        // Send a POST request to the Flask backend with the FormData object
        try {
          console.log('no erorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
          const response = await axios.post(`/Profile/${email}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(response.data);
        } catch (error) {
          console.error('eorrrrrrrrrroooooooorrrrrrrr');
        }
        window.location.reload();
      };  
    useEffect(() => {

        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
              close(false);
            }
          }
      
          document.addEventListener("mousedown", handleClickOutside);

        // Disable scrolling when the popup is open
        if (close) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
    
        // Re-enable scrolling when the component unmounts
        return () => {
          document.body.style.overflow = 'auto';
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [close], [popupRef]);
    
      if (!close) return null;
  return (

    <div className={popimagemodalbackground} onClick={close}>
      <div className='uploadpicturecontainer'>
        <h2 className='changeprofilepictureheader'> Change profile photo</h2>
        <div >
          <div className='uploadphoto'  onClick={handleFormSubmit}> Upload Photo </div>
          <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
        />
        </div>
        <div className="hr"></div> 
        <div className='removephoto'> Remove current photo </div>
        <div className="hr"></div> 
        <div className="PopProductCrossBtn" onClick={()=>setbaal(false)}>{baal && <div >Cancel</div>}
                {!baal && <div className="makeitgray" onMouseEnter={()=>close(false)}>Cancel</div>}</div>
      </div>
    </div>
  )
}

export default Uploadprofilepic
