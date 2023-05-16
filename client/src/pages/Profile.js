import React, { useState ,useEffect,useContext} from 'react';
import './Profile.css';
import Uploadprofilepic from '../Components/Uploadprofilepic/Uploadprofilepic';
// import profilepic from "../../db/profile_picture/firstimage.jpg";
import axios from 'axios';
import { GlobalContext } from '../Global';
import Dialogue from './Dialogue';


const Profile = (props) => {

  const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail } = useContext(GlobalContext);

  console.log(globalemail+ "aaaaaaa") ;
  const [imagepopup, setimagepopup] = useState(false) ;
  const [editing, setEditing] = useState(false);
  const [password_editing, setpassword_editing] = useState(false);
  const [pictureBlob, setPictureBlob] = useState(null);
  const [name_data, setName] = useState('');
  const [save, setSave] = useState(false) ;
  const [passwordsave, setpasswordsave] = useState(false) ;
  const [serviceProvider, setServiceProvider] = useState(true);
  var service = false;
  const [missing_value, setmissing_value] = useState(false);
  const [changepass, setchangepass] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [preferablePets, setPreferablePets] = useState({
    dog: false,
    cat: false,
    bird: false,
    rabbit: false
  });

  const [preferableservices, setPreferableservices] = useState({
    housesitting: false,
    boarding: false,
    daycare: false,
    petwalking: false,
    pettraining: false
  });  

  const [preferableTimerange, setPreferableTimerange] = useState({
    first: false,
    second: false,
    third: false,
    forth: false,
    oneday: false,
    twoday: false,
    threeday: false,
    sevenday : false
  });  

  const [preferablePetsize, setPreferablePetsize] = useState({
    small: false,
    medium: false,
    large: false
  });  


  // const handleSave = () => {

  // };

  // const servicehandler = () =>{
  //   setservice(true) ;
  // }

  const handleEdit = () => {
    setEditing(true);
    setSave(false);
  };

  const changePassword = () => {
    setpassword_editing(true) ;
  };

  function savenewpass(newPassword) {
    // Make POST request to Flask API
    fetch('/change-password', {
      method: 'POST',
      body: JSON.stringify({
        email : globalemail,
        newPassword: newPassword
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error saving password!');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Display success message to user
      alert('Password changed successfully!');
    })
    .catch(error => {
      console.error(error);
      // Display error message to user
      alert('Error changing password!');
    });
  }
  
  const changePasswordcancelfalse = () => {
    setpassword_editing(false);
  }

  const changePasswordsavefalse = () => {
    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      alert("Please fill in all fields");
      return;
    }

    // check if new password and confirm password match
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    // call the svenewpass function and pass the password data
    savenewpass(passwords.newPassword);
    setpassword_editing(false) ;
  }
  

  const handlepass = () => {
    setchangepass(true);
  };
  
  const handleChange = (event) => {
    setPasswords({
      ...passwords,
      [event.target.name]: event.target.value,
    });
  };
  
  const handlePetCheckboxChange = (e) => {
    setPreferablePets({
      ...preferablePets,
      [e.target.name]: e.target.checked
    });
  }

  const handleServicesCheckboxChange = (e) => {
    setPreferableservices({
      ...preferableservices,
      [e.target.name]: e.target.checked
    });
  }  

  const handleTimerangeCheckboxChange = (e) => {
    setPreferableTimerange({
      ...preferableTimerange,
      [e.target.name]: e.target.checked
    });
  }  

  const handlePetsizeCheckboxChange = (e) => {
    setPreferablePetsize({
      ...preferablePetsize,
      [e.target.name]: e.target.checked
    });
  }  
  
  var email_id = globalemail;
  console.log("gloab email id" + globalemail) ;
  console.log(" email id " + email_id ) ;
  const [pictureUrl, setPictureUrl] = useState('');
  const [userData, setUserData] = useState({
    name : null,
    address :  null,
    pet_sitter : null,
    preferable_pet : null,
    preferable_services : null,
    preferable_timerange : null,
    preferable_petsize : null
  });
  useEffect(() => {
    Promise.all([
      fetch(`/Profile/${email_id}`).then(response => response.blob()),
      fetch(`/Profile/texts/${email_id}`).then(response => response.json())
    ])
      .then(([pictureBlob, data]) => {
        const pictureObjectURL = URL.createObjectURL(pictureBlob);
        setPictureUrl(pictureObjectURL);
        console.log("Checking console");
        console.log(pictureUrl.length);
        setUserData({name: data.name, address: data.address, pet_sitter : data.pet_sitter,preferable_pet: data.preferable_pet,
        preferable_services : data.preferable_services, preferable_timerange : data.preferable_timerange,
        preferable_petsize : data.preferable_petsize
        });
      })
      .catch(error => console.error(error));

}, [email_id,userData.pet_sitter]);
if (userData.pet_sitter == "YES") {
  service = true; console.log(service + "true") ;
} else {
  service = false; console.log(service + "false") ;
}


console.log(email_id);
// console.log("pet sitter"+userData.pet_sitter);
console.log("name"+userData.name);
console.log("address"+userData.address);
console.log("pet sitter" + userData.pet_sitter);

// var imgsource = pictureUrl;
// var imgsrc = pictureUrl;
if(pictureUrl.length == 0){
  // pictureUrl = "/images/service_provider.png";
  setPictureUrl("/images/service_provider.png");
}
console.log(pictureUrl.length);

const name = userData ? userData.name : "Unknown";
const address = userData ? userData.address : "Not Provided";
const petsitting = userData ? userData.pet_sitter : "NULL" ;
const pets = userData ? userData.preferable_pet: "NULL" ;
const petservices = userData ? userData.preferable_services : "NULL" ;
const pettimerange = userData ? userData.preferable_timerange : "NULL" ;
const petsizes = userData ? userData.preferable_petsize : "NULL" ;


function check_object(object) {
  return Object.values(object).some(value => value);
}

var pet_sitter;
function handleCloseDialog() {
  setmissing_value(false);
}
const handleSubmit = async  (e) =>{
  console.log("testing petsize" + preferablePetsize.small);
  
  if((serviceProvider)  &&( !check_object(preferablePets) || !check_object(preferablePetsize) || !check_object(preferableTimerange) || !check_object(preferableservices) ))
   {   setmissing_value(true);
    console.log("missing value" + missing_value);return;}
    else {setmissing_value(false);}  
  console.log("hello from form submit save");
  setEditing(false);
  setSave(true);
  e.preventDefault();
  console.log( 'service_provider'+serviceProvider);
  if(serviceProvider) pet_sitter = 'YES';
  else pet_sitter = 'NO' ;
  const formdata = {
    pet_sitter : pet_sitter,
    email: globalemail,
    selected: preferablePets,
    serviceselected: preferableservices,
    timerangeselectedValue: preferableTimerange,
    petsizeselectedValue: preferablePetsize
  };
  console.log(formdata + 'fromdata') ;
  console.log(globalemail) ;
  fetch('/Profile/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formdata)
  })
  .then(response => {
    if (response.ok) {
      // alert('Form submitted successfully!');
      console.log("form submitted successfully");
    } else {
      throw new Error('Form submission failed.');
    }
  })
  .catch(error => {
    console.error(error);
    console.log('Form submission failed.');
  });
  setPreferablePets({});
  setPreferablePetsize({});
  setPreferableTimerange({}) ;
  setPreferableservices({}) ;
  window.location.reload();
};  
  return (
    <div className="profile-page">

      {imagepopup && <Uploadprofilepic close={setimagepopup}/>}
      <div className="profile-header">
        <div className="profile-image-wrapper">
          
          <img className="profile-image" src={pictureUrl} alt="Profile" onClick={()=>{setimagepopup(true);}} />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{name}</h2>
          
          <p className="profile-email">{email_id}</p>
          <p className="profile-address">{address}</p>
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-section">
          <h2>About</h2>
          <p> I am there </p>
          <br/><br/><br/><br/>
          <div className='service-provider-edit'>
          <h3 className="profile-section-header">Service Provider</h3>
          {missing_value && ( <Dialogue className='missing_value_error_message' message="Please fill up every option." onClose={handleCloseDialog}/>)}
         <div className="profile-actions">
        {editing ? (
          <button className="profile-action-button" onClick={handleSubmit}>Save</button>
          ) : (
            <button className="profile-action-button" onClick={handleEdit}>Edit</button>
          )}
        </div>
        </div>
          <div className="profile-section-content">
           
           {service && (
            <div> 
                <div> Preferable Pet : {pets}</div>
                <div> Preferable services : {petservices} </div>
                <div> Preferable Timerange : {pettimerange} </div>
                <div> Preferable Petsize : {petsizes} </div>
            </div>
           ) }

           {editing && (
           <div className='service-provider-option'>
           <input type="checkbox" checked={serviceProvider} onChange={(e) => setServiceProvider(e.target.checked)} disabled={!editing} />
            <label htmlFor="serviceProvider">Do you want to work as a service provider?</label>            
           </div>            
           )}
           {!editing && !service && (
            <div>You are not a service provider!</div>
           )}

            {editing && serviceProvider && ( 
                <form onSubmit={handleSubmit}>

                    {/*preferabel pet  */}
              <div className="profile-form-field">
                <label htmlFor="pet">Preferable pet:</label>
                <div>
                  <input type="checkbox" name="dog" checked={preferablePets.dog} onChange={handlePetCheckboxChange} />
                  <label htmlFor="dog">Dog</label>
                </div>
                <div>
                  <input type="checkbox" name="cat" checked={preferablePets.cat} onChange={handlePetCheckboxChange} />
                  <label htmlFor="cat">Cat</label>
                </div>
                <div>
                  <input type="checkbox" name="bird" checked={preferablePets.bird} onChange={handlePetCheckboxChange} />
                  <label htmlFor="bird">Bird</label>
                </div>
                <div>
                  <input type="checkbox" name="rabbit" checked={preferablePets.rabbit} onChange={handlePetCheckboxChange} />
                  <label htmlFor="rabbit">Rabbit</label>
                </div>     
              </div> 
              
              {/* Preferable services */}
              <div className="profile-form-field">
                <label htmlFor="pet">Preferable Services:</label>
                <div>
                  <input type="checkbox" name="housesitting" checked={preferableservices.housesitting} onChange={handleServicesCheckboxChange } />
                  <label htmlFor="dog">House Sitting</label>
                </div>
                <div>
                  <input type="checkbox" name="boarding" checked={preferableservices.boarding} onChange={handleServicesCheckboxChange } />
                  <label htmlFor="cat">Boarding</label>
                </div>
                <div>
                  <input type="checkbox" name="daycare" checked={preferableservices.daycare} onChange={handleServicesCheckboxChange } />
                  <label htmlFor="bird">Day Care</label>
                </div>
                <div>
                  <input type="checkbox" name="petwalking" checked={preferableservices.petwalking} onChange={handleServicesCheckboxChange } />
                  <label htmlFor="rabbit">Pet Walking</label>
                </div>     
                <div>
                  <input type="checkbox" name="pettraining" checked={preferableservices.pettraining} onChange={handleServicesCheckboxChange } />
                  <label htmlFor="rabbit">Pet TRaining</label>
                </div>                    
              </div>

                {/* Preferable Time range  */}
                <div className="profile-form-field">
                <label htmlFor="pet">Preferable Timerange:</label>
                <div>
                  <input type="checkbox" name="first" checked={preferableTimerange.first} onChange={handleTimerangeCheckboxChange } />
                  <label htmlFor="dog">6am-12pm</label>
                </div>
                <div>
                  <input type="checkbox" name="second" checked={preferableTimerange.second} onChange={handleTimerangeCheckboxChange} />
                  <label htmlFor="cat">12pm-6pm</label>
                </div>
                <div>
                  <input type="checkbox" name="third" checked={preferableTimerange.third} onChange={handleTimerangeCheckboxChange } />
                  <label htmlFor="bird">6pm-12am</label>
                </div>
                <div>
                  <input type="checkbox" name="forth" checked={preferableTimerange.forth} onChange={handleTimerangeCheckboxChange } />
                  <label htmlFor="rabbit">12am-6am</label>
                </div>     
                <div>
                  <input type="checkbox" name="oneday" checked={preferableTimerange.oneday} onChange={handleTimerangeCheckboxChange} />
                  <label htmlFor="rabbit">1Day</label>
                </div>   
                <div>
                  <input type="checkbox" name="twoday" checked={preferableTimerange.twoday} onChange={handleTimerangeCheckboxChange} />
                  <label htmlFor="rabbit">2Day</label>
                </div>  
                <div>
                  <input type="checkbox" name="threeday" checked={preferableTimerange.threeday} onChange={handleTimerangeCheckboxChange} />
                  <label htmlFor="rabbit">3Day</label>
                </div>  
                <div>
                  <input type="checkbox" name="sevenday" checked={preferableTimerange.sevenday} onChange={handleTimerangeCheckboxChange} />
                  <label htmlFor="rabbit">7Day</label>
                </div>                   
              </div>      

                 {/*Preferable Pet size  */}
                 <div className="profile-form-field">
                <label htmlFor="pet">Preferable pet size:</label>
                <div>
                  <input type="checkbox" name="small" checked={preferablePetsize.dog} onChange={handlePetsizeCheckboxChange} />
                  <label htmlFor="dog">Small</label>
                </div>
                <div>
                  <input type="checkbox" name="medium" checked={preferablePetsize.cat} onChange={handlePetsizeCheckboxChange} />
                  <label htmlFor="cat">Medium</label>
                </div>
                <div>
                  <input type="checkbox" name="large" checked={preferablePetsize.bird} onChange={handlePetsizeCheckboxChange} />
                  <label htmlFor="bird">Large</label>
                </div>   
              </div>                  

                </form>   
             )}
          </div>
        </div>
        <div className="profile-section">
          <h3 className="profile-section-header" onClick={changePassword}>Change Password</h3>
          { password_editing && (<div className="profile-section-content">
             <div className="profile-form-field">
              <label htmlFor="currentPassword">Current Password:</label>
              <input type="password" id="currentPassword" name="currentPassword" value={passwords.currentPassword}
              onChange={handleChange} />
            </div>
            <div className="profile-form-field">
              <label htmlFor="newPassword">New Password:</label>
              <input type="password" id="newPassword" name="newPassword"    value={passwords.newPassword}
              onChange={handleChange}/>
            </div>
            <div className="profile-form-field">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword" name="confirmPassword"   value={passwords.confirmPassword}
              onChange={handleChange}/>
            </div>
            <br></br> 
            <div className='changepassword-save-cancel'>
                <button className='changepassword-cancel-button' onClick={changePasswordcancelfalse}> Cancel</button>
                <button className='changepassword-save-button' onClick={changePasswordsavefalse}> Save</button>
            </div>
          </div>)}
        </div>
      </div>

      </div>
      );
      };
      
      export default Profile;
