import React, { useState } from 'react';
import './Signupindividual.css'
import {Routes, Route, useNavigate, Navigate, Link} from 'react-router-dom';

const Signupindividual= () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async  (e) => {
    e.preventDefault();
    // Submit form data

    if (password !== confirmPassword) {
      alert('Password and password confirmation must be the same');
      return;
    }
    const response = await fetch('/images/service_provider.png');
    const blob = await response.blob();

    fetch('/Signupindividual', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password : password,
        address: address,
        picture_data : blob
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))

      // //alert-----------
      // alert("Signedup successfully!");
      navigate("/Login");
  };

  return (
    <div className='signup-form'>
<div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <label>
              Name:
              <input className='signupName' type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              Email:
              <input className='signupEmail' type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              Password:
              <input className='signupPass' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <label>
              Confirm Password:
              <input className='signupConfirm' type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </label>
            <div className="checkbox-group">
            </div>
              <label>
                Address:
                <input className='signupAddress' type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </label>
            
            <label>
              <input type="checkbox" name="terms" checked={termsChecked} onChange={(e) => setTermsChecked(e.target.checked)} />
              I agree to the <Link to="/TermsAndPolicies" target="_blank" rel="noopener noreferrer">terms and policies</Link>
            </label>
            <button type="submit" disabled={!termsChecked}>Signup</button>
            <p>
                Already have an account? <Link className='movetologin' to='/LogIn'>Log In</Link>
            </p>
          </form>
        </div>
    </div>
  )
}

export default Signupindividual
