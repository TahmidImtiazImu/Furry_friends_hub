// CustomerNotificationOrder.js

import {React, useState, useEffect} from 'react';
import { FaTrash } from 'react-icons/fa';
import './CustomerNotificationOrder.css'

const CustomerNotificationOrder = ({ order, status}) => {

    async function delete_notification() {
        try {
            const response = await fetch(`/Order/api/customer/${order.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ status: 'confirmed' }),
            });
      
            if (response.ok) {
              status(true);
            } else {
              console.log('Failed to update order status');
            }
            status(true);
            window.location.reload();
        } catch (error) {
            console.log(error);
            console.log('Failed to update order status due to an error');
          }
      
    }

  return (
    <div className='notification_card'>
      <div className="card-body">
        <h4 className="card-title">Transaction Number: {order.id}</h4>
        <h4 className="card-sub-title">Date: {order.created_date}</h4>
        <h5 className="card-subtitle mb-2 text-muted">Products:</h5>
        <ul className="list-group">
          {order.products}
        </ul>
        <h3 className='order-name'> Name: {order.Name}</h3>
        <h3 className='product-status'> Phone: {order.Phone}</h3>
        <h3 className='product-status'> Contact E-mail: {order.Contact_mail}</h3>
        <h3 className='product-status'> Address: {order.Address}</h3>
        <h3 className='product-status'> Special-Note: {order.Note}</h3>
        <h3 className='product-status'> Status: {order.status}</h3>
        <div className="delete-icon-customer-order">
            <FaTrash onClick={delete_notification}/>
        </div>
      </div>
    </div>
  );
};

export default CustomerNotificationOrder;
