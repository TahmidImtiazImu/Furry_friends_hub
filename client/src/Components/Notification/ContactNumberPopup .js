import React, { useState } from 'react';
import './Contacnumberpopup.css';

const ContactNumberPopup = ({ onSubmit, onCancel }) => {
  const [contactNumber, setContactNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(contactNumber);
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h3>Give your contact number</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Enter your contact number"
          />
          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactNumberPopup;
