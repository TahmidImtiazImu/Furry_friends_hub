import React, { useState } from "react";
import './CustomerSignup.css'

export const CustomerSignup = () => {
    const [agreement, setAgreement] = useState(false);

    const handleChange = (event) => {
        setAgreement(event.target.checked);
    }

    const signUp = () => {
        alert("SUccessfully Signed Up!")
    }

  return (
    <div className="customersignWhole">
        <h1>Sign Up as a Customer</h1>
        <div className="CustomerSignBorder">
            <div className='CustomerSign'>
                <div className='customernameinput'>
                    *Name: <input type="text" placeholder="Name" className="inputName"/>
                </div>
                <div className = 'customermailinput'> 
                    *E-mail: <input type="text" placeholder="Email" className="inputmail"/>
                </div>
                <div className = 'customerpassinput'> 
                    *Password: <input type="text" placeholder="Password" className="inputpass"/>
                </div>
                <div className = 'customerrepassinput'> 
                    *Confirm Passwoed: <input type="text" placeholder="Password" className="inputpass2"/>
                </div>
                <p className='customeragree'>
                    <input type='checkbox' name="agreement" onChange={handleChange}/> I agree to the <a href='#'>Terms of use</a> and <a href='#'>Privacy Policy</a>.
                </p>
                <div className="customersignwhole">
                    <button className='customersigned' onClick={signUp} disabled={!agreement}>SIgn Up</button> <a className="customerlearn" href='#'>Learn more</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CustomerSignup