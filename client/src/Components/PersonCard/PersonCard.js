import React, {useContext, useState, useEffect} from 'react';
import "./PersonCard.css"
import { GlobalContext } from '../../Global';

const PersonCard = (props) => {
    const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail } = useContext(GlobalContext);

    const [customerName, setCustomerName] = useState('');
    const [serviceproviderName, setServiceproviderName] = useState('');

   var timerange =props.timerange;

  if(props.timerange == "first") {timerange = "6am-12pm"}
  if(props.timerange == "second") {timerange = "6am-12pm"}
  if(props.timerange == "third") {timerange = "12pm-6pm"}
  if(props.timerange == "forth") {timerange = "6pm-12am"}
  const sendNotification = async () => {
    const notificationData = {
      customer_id: globalemail,
      server_id: props.email,
      pet_sitting : "YES",
      mobile : "NULL",
      confirmation : "NULL",
      pet : props.pet,
      service : props.service,
      timerange : timerange,
      petsize : props.petsize,
      area : props.area
    };

    try {
      const response = await fetch('/api/notifications', {
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
  };

  return (
    <div>
        <div className="person-card">
            <img className="person-image" src={props.img} alt={props.name} />
                <div className="person-info">
                    <p className="person-name">{props.name}</p>
                    <p className="person-email">{props.email}</p>
                    <p className="person-address">{props.location}</p>
                </div>
            <button className="request-button" onClick={sendNotification}>Request</button>
        </div>
        <div className='SimpleLine'></div>
    </div>
  );
};

export default PersonCard;
