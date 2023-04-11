import React from 'react'
import Card from './Card'

const joinClick = () => {
    alert("Successfully joined!");
}

export const signup = () => {
  return (
    <div>
        <div className='header_title'>
            <h1>signup</h1>
        </div>
        <div className='wrapper'>
                <Card 
                img = "./images/customer.jpg"
                title = "Cutomer"/>
                <Card 
                img = "./images/service_provider.png"
                title = "Service provider"/>
        </div>
        <div className='confirm_button'>
            <button onClick={joinClick}>Join As Customer</button>
        </div>
    </div>
    
  )
}
export default signup