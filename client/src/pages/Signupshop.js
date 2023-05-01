import React, { useState } from 'react';
import './Signupshop.css'

const Signupshop = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [shopName, setShopName] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data
  };

  return (
    <div className='signup-form'>
<div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <label>
              Name:
              <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              Password:
              <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <label>
              Confirm Password:
              <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </label>
            <div className="checkbox-group">
            </div>
              <label>
                Shop Name:
                <input type="text" name="shopName" value={shopName} onChange={(e) => setShopName(e.target.value)} required />
              </label>
            
            <label>
              <input type="checkbox" name="terms" checked={termsChecked} onChange={(e) => setTermsChecked(e.target.checked)} />
              I agree to the <a href="https://example.com/terms-and-policies" target="_blank" rel="noopener noreferrer">terms and policies</a>
            </label>
            <button type="submit" disabled={!termsChecked}>Signup</button>
          </form>
        </div>
    </div>
  )
}

export default Signupshop
