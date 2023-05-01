import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [address, setAddress] = useState('123 Main St, Anytown USA');
  const [serviceProvider, setServiceProvider] = useState(false);
  const [pet, setPet] = useState('');

  const handleSave = () => {
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img className="profile-image" src="https://i.imgur.com/L4Kj0IM.jpg" alt="Profile" />
        </div>
        <div className="profile-info">
          <h2 className="profile-name">{name}</h2>
          <p className="profile-email">{email}</p>
          <p className="profile-address">{address}</p>
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-section">
          <h3 className="profile-section-header">Service Provider</h3>
          <div className="profile-section-content">
            <input type="checkbox" checked={serviceProvider} onChange={(e) => setServiceProvider(e.target.checked)} disabled={!editing} />
            <label htmlFor="serviceProvider">Do you want to work as a service provider?</label>
            {editing && serviceProvider && (
              <div className="profile-form-field">
                <label htmlFor="pet">Preferable pet:</label>
                <select id="pet" value={pet} onChange={(e) => setPet(e.target.value)}>
                  <option value="">Select an option</option>
                  <option value="cat">Cat</option>
                  <option value="dog">Dog</option>
                </select>
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