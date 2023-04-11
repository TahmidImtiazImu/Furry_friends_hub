import React from 'react'
import './SIgnup.css'

export const Card = (props) => {
  return (
    <div className='card'>
            <div className='card_body'>
                <img src= {props.img} 
                class='card_img'/>
                <h2 className='card_title'> {props.title} </h2>
            </div>
        </div>
  )
}

export default Card
