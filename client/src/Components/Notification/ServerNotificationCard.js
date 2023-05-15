import React,{useState, useEffect, useContext} from 'react';
import './ServerNotificationCard.css';
import { FaTrash } from 'react-icons/fa';
import ContactNumberPopup from './ContactNumberPopup ';
import { GlobalContext } from '../../Global';

const ServerNotificationCard = ({ id,email,pet,service,timerange,petsize,area,message }) => {

    const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail } = useContext(GlobalContext);


    const [customerName, setCustomerName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    console.log(email) ;
  useEffect(() => {



  const fetchCustomerName = async () => {
    try {
      const response = await fetch(`/user/api/customer/${email}`);
      const data = await response.json();

      if (response.ok) {
        setCustomerName(data);
      } else {
        console.log('Failed to fetch customer name.');
      }
    } catch (error) {
      console.log(error);
      console.log('Failed to fetch customer name.');
    }
  };

    if(email) fetchCustomerName() ;

  }, [email]);  
  
  const handleReject = async () => {
    const notificationData = {
      id : id,
      customer_id: email,
      server_id: globalemail,
      pet_sitting : "YES",
      mobile : "NULL",
      confirmation : "NO",
      pet : pet,
      service : service,
      timerange : timerange,
      petsize : petsize,
      area : area,

    };

    try {
      const response = await fetch('/api/notifications/service/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notificationData)
      });

      if (response.ok) {
        alert('Notification sent!');
      } else {
        alert('Failed to send notification.');
      }
    } catch (error) {
      console.log(error);
      alert('Failed to send notification.');
    }
    window.location.reload();
  };


  const handleConfirm = () => {
    setShowPopup(true);
  };


  const handlePopupSubmit = async(contactNumber) => {
    const notificationData = {
        id : id,
        customer_id: email,
        server_id: globalemail,
        pet_sitting : "YES",
        mobile : contactNumber,
        confirmation : "YES",
        pet : pet,
        service : service,
        timerange : timerange,
        petsize : petsize,
        area : area,
      };
  
      try {
        const response = await fetch('/api/notifications/service/reject', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(notificationData)
        });
  
        if (response.ok) {
          alert('Notification sent!');
        } else {
          alert('Failed to send notification.');
        }
      } catch (error) {
        console.log(error);
        alert('Failed to send notification.');
      }
    setShowPopup(false);
    window.location.reload();
    // Perform further actions with the contact number
  };

  const handlePopupCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="notification-card">
      <div>
      <p>{customerName + "  wants too book you"}</p>
      <p> {"Pet: " + pet + ",          Service : " + service + ",        Timerange : " + timerange + ",         Petsize : " + petsize} </p>
      <p>{"Address : " + area}</p>
      <p></p>
      <button className="confirm-button" onClick={handleConfirm}>
        Confirm
      </button>
      <button className="reject-button" onClick={handleReject}>
        Reject
      </button>
      </div>
      {showPopup && (
        <ContactNumberPopup 
        onSubmit={handlePopupSubmit} 
        onCancel={handlePopupCancel} />
      )}
    </div>
  );
};

export default ServerNotificationCard;
