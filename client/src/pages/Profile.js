import React, { useState ,useEffect} from 'react';
import './Profile.css';
import Uploadprofilepic from '../Components/Uploadprofilepic/Uploadprofilepic';
// import profilepic from "../../db/profile_picture/firstimage.jpg";
import axios from 'axios';

const Profile = (props) => {

  const [imagepopup, setimagepopup] = useState(false) ;
  const [editing, setEditing] = useState(false);
  const [save, setSave] = useState(false) ;
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [address, setAddress] = useState('123 Main St, Anytown USA');
  const [serviceProvider, setServiceProvider] = useState(false);
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


  const handleSave = () => {
    setEditing(false);
    setSave(true);
  };

  const handleEdit = () => {
    setEditing(true);
    setSave(false);
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
  const [pictureUrl, setPictureUrl] = useState('');
  
  props.username = 'mf@gmail.com';
  useEffect(() => {
    axios.get(`/Profile/${props.username}`)
      .then(response => {
        const blob = new Blob([response.data], {type: 'image/jpg'});
        const url = URL.createObjectURL(blob);
        setPictureUrl(url);
      })
      .catch(error => console.error(error));
  },[props.username]);    
  
  var imgsource = {pictureUrl};
  const imgsrc = imgsource ? imgsource : "/images/service_provider.png";
  return (
    <div className="profile-page">

      {imagepopup && <Uploadprofilepic close={setimagepopup}/>}
      <div className="profile-header">
        <div className="profile-image-wrapper">
          
          <img className="profile-image" src={imgsrc} alt="Profile" onClick={()=>{setimagepopup(true);}} />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{name}</h2>
          <p className="profile-email">{email}</p>
          <p className="profile-address">{address}</p>
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-section">
          <h2>About</h2>
          <p>I am a Bitboxer! Checkout my next performance!!</p>
          <br/><br/><br/><br/>
          <h3 className="profile-section-header">Service Provider</h3>
          <div className="profile-section-content">
           
           {serviceProvider &&  (
            <div> 
                <div> Preferable Pet : Cat, Dog</div>
                <div> Preferable services : House siting, Day care</div>
                <div> Preferable Timerange : 12pm-6pm</div>
                <div> Preferable Petsize : Small</div>
            </div>
           ) }

           {editing && (
           <div className='service-provider-option'>
           <input type="checkbox" checked={serviceProvider} onChange={(e) => setServiceProvider(e.target.checked)} disabled={!editing} />
            <label htmlFor="serviceProvider">Do you want to work as a service provider?</label>            
           </div>            
           )}
           {!editing && !serviceProvider && (
            <div>You are not a service provider!</div>
           )}

            {editing && serviceProvider && ( 
                <div>

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

                </div>   
             )}
          </div>
        </div>
        <div className="profile-section">
          <h3 className="profile-section-header">Change Password</h3>
          <div className="profile-section-content">
            <div className="profile-form-field">
              <label htmlFor="currentPassword">Current Password:</label>
              <input type="password" id="currentPassword" name="currentPassword" disabled={!editing} />
            </div>
            <div className="profile-form-field">
              <label htmlFor="newPassword">New Password:</label>
              <input type="password" id="newPassword" name="newPassword" disabled={!editing} />
            </div>
            <div className="profile-form-field">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword" name="confirmPassword" disabled={!editing} />
            </div>
          </div>
        </div>
      </div>
      <div className="profile-actions">
        {editing ? (
          <button className="profile-action-button" onClick={handleSave}>Save</button>
          ) : (
            <button className="profile-action-button" onClick={handleEdit}>Edit</button>
          )}
        </div>
      </div>
      );
      };
      
      export default Profile;
