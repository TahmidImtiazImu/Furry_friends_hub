import React, { useState } from "react";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './PetSitter.css'

const PetSitter = () => {
  const [selected, setSelected] = useState("");

  const handleCheck = (event) => {
    setSelected(event.target.value);
  };
  const [serviceselected, servicesetSelected] = useState("");

  const servicehandleCheck = (event) => {
    servicesetSelected(event.target.value);
  };

  const [timerangeselectedValue, timerangesetSelectedValue] = useState('');

  const timerangehandleChange = (event) => {
    timerangesetSelectedValue(event.target.value);
  };

  const [petsizeselectedValue, petsizesetSelectedValue] = useState('');

  const petsizehandleChange = (event) => {
    petsizesetSelectedValue(event.target.value);
  };

  const navigate = useNavigate();

    const navigatePersonList =() =>{
        navigate('/PersonList');
      }

  return (
    <div>
      {/* HEADER */}
      <Header/>


     <div className='petsitterbody'>
     <ul>
      {/* info */}
      <li className='petsitting_info'>
        <div className='petsitting_container'>
        <ul>
          <li className='petsitting_info_list'> 
             <div className='what_is_pet_sitting'>  What is pet sitting ?</div> 
             <div>
              <p> Pet sitting is the act of temporarily taking care of another person's pet 
              for a given time frame. It commonly occurs at the pet owner's home, but may also
              occur at the provider's home or at a pet sitting place of business or organization.
              Pet sitting is a more personal and individualized arrangement for care compared 
              to boarding or kenneling. Specialized training is usually not required for pet sitting.</p>  </div>
           </li>
          <li className='petsitting_info_list'> 
          <img src={"/images/pet_sitting.jpg"} alt="React Image" className="pet_sitter_image"/>
          </li>
        </ul>
        </div>
      </li>


      {/* Form */}
      <li className='pet_sitting_form'>
        <div className='form_container'> 
        
        {/* Checkbox for pet service */}
       <div className="services_for">
        <div> Services for : </div>
       <div className="checkbox-container">
       <label>
        <input
          type="checkbox"
          value="cat"
          checked={selected === "cat"}
          onChange={handleCheck}
        />
        Cat
      </label>
      <label>
        <input
          type="checkbox"
          value="dog"
          checked={selected === "dog"}
          onChange={handleCheck}
        />
        Dog
      </label>
      <label>
        <input
          type="checkbox"
          value="rabbit"
          checked={selected === "rabbit"}
          onChange={handleCheck}
        />
        Rabbit
      </label>
      <label>
        <input
          type="checkbox"
          value="bird"
          checked={selected === "bird"}
          onChange={handleCheck}
        />
        Bird
      </label>
      </div>
        </div> 

       <br></br> <br></br>
         
        <div >  What service do you want ? </div>
        {/* checkbox for what services */}

        <div className="service_checkbox_container">

        <label>
        <input
          type="checkbox"
          value="house_sitting"
          checked={serviceselected === "house_sitting"}
          onChange={servicehandleCheck}
        />
        House Sitting
      </label>
      <label>
        <input
          type="checkbox"
          value="boarding"
          checked={serviceselected === "boarding"}
          onChange={servicehandleCheck}
        />
        Boarding
      </label>
      <label>
        <input
          type="checkbox"
          value="day_care"
          checked={serviceselected === "day_care"}
          onChange={servicehandleCheck}
        />
        Day Care
      </label>
      <label>
        <input
          type="checkbox"
          value="pet_walking"
          checked={serviceselected === "pet_walking"}
          onChange={servicehandleCheck}
        />
        Pet Walking
      </label>
      <label>
        <input
          type="checkbox"
          value="pet_training"
          checked={serviceselected === "pet_training"}
          onChange={servicehandleCheck}
        />
        Pet Training
      </label>
        </div>
        
        <br></br> <br></br>

        {/* Other things to be selected */}
        <div className="option">
          {/* Area */}
            <div className="area">
               <div> Area </div>
               <div> <input></input> </div>
            </div>

            {/* time range */}
            <div className="time_range">
              <div> Time Range</div>
              <div>
              <select value={timerangeselectedValue} onChange={timerangehandleChange}>
                <option value="">Select an option</option>
                <option value="6am-12pm">6am-12pm</option>
                <option value="12pm-6pm">12pm-6pm</option>
                <option value="6pm-12pm">6pm-12pm</option>
                <option value="12pm-6am">12pm-6am</option>
                <option value="1 day">1 day</option>
                <option value="2 days">2 days</option>
                <option value="3 days">3 days</option>
                <option value="7 days">7 days</option>
                </select>                         
              </div>
            </div>

            {/* Pet size */}
            <div className="pet_size">
              <div> Pet size</div>
              <div> 
              <select value={petsizeselectedValue} onChange={petsizehandleChange}>
                <option value="">Select an option</option>
                <option value="1 month">1 month</option>
                <option value="2 months">2 months</option>
                <option value="3 months">3 months</option>
                <option value="4-6 months">4-6 months</option>
                <option value="1 year">1 year</option>
                <option value="2 yearss">2 years</option>
                <option value="3 years">3 years</option>
                <option value="Above 3 years">Above 3 years</option>
                </select>                
              </div>
            </div>
        </div>
        <div > 

         </div>

         
         <br></br> <br></br>
         {/*Search button  */}
        <div className="search" > <button className="serach_button" onClick={navigatePersonList}> Search</button> </div>
        </div>
      </li>
     </ul>
      </div> 


     {/* FOOTER */}
     <Footer/>
    </div>
  )
}

export default PetSitter
