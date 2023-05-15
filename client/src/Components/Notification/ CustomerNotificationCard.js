import React,{useState, useEffect} from 'react';
import './CustomerNotificationCard.css';
import { FaTrash } from 'react-icons/fa';


const CustomerNotificationCard = ({id,mobile, confirmation ,serviceprovider_id, message }) => {
    const [serviceproviderName, setserviceproviderName] = useState('');
    const email = serviceprovider_id ;
    console.log("erorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    console.log(id);
    console.log(serviceprovider_id);
    console.log(email) ;
    console.log(mobile) ;
  useEffect(() => {
  const fetchserviceproviderName = async () => {
    try {
      const response = await fetch(`/user/api/server/${email}`);
      const data = await response.json();

      if (response.ok) {
        setserviceproviderName(data);
      } else {
        console.log('Failed to fetch serviceprovider name.');
      }
    } catch (error) {
      console.log(error);
      console.log('Failed to fetch serviceprovider name.');
    }
  };

    if(email) fetchserviceproviderName() ;

  }, [email]);    
  var msg = "";
  
  if(confirmation === "NO") msg =serviceproviderName + " rejected your proposal"
  if(confirmation === "YES") msg = serviceproviderName + " confirmed your proposal, contact number : " + mobile ;

  const delete_notification = async () => {
    const notificationData = {
      id : id,
    };

    try {
      const response = await fetch(`/api/cusotmerdelete/notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notificationData)
      });

      if (response.ok) {
        alert('notification deleted!');
      } else {
        alert('Failed to customer delete notification.');
      }
    } catch (error) {
      console.log(error);
      alert('Failed to customer delete notification.');
    }
    window.location.reload();
  };
  return (
    <div className="notification-card">
      <p>{msg}</p>
      <div className="delete-icon-customer">
        <FaTrash onClick={delete_notification}/>
      </div>
    </div>
  );
};

export default CustomerNotificationCard;
