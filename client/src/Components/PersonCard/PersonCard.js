import React from 'react';
import "./PersonCard.css"

const PersonCard = (props) => {

    function notified() {
        alert("Notification Sent!");
    }

  return (
    <div>
        <div className="person-card">
            <img className="person-image" src={props.img} alt={props.name} />
                <div className="person-info">
                    <p className="person-name">{props.name}</p>
                    <p className="person-email">{props.email}</p>
                    <p className="person-address">{props.location}</p>
                </div>
            <button className="request-button" onClick={notified}>Request</button>
        </div>
        <div className='SimpleLine'></div>
    </div>
  );
};

export default PersonCard;
