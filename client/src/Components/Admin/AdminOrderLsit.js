import React, { useState, useEffect } from "react";
import axios from "axios";
import withAuth from "../Authentication/withAuth";
import "./AdminOrderList.css";

function AdminOrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/orders/${id}`);
      setOrders(orders.filter(order => order.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  const handleShipment = async (id) => {
    try {
      await axios.put(`/api/orders/${id}/shipment`, { status: 'Shipped' });
      const updatedOrder = orders.find(order => order.id === id);
      updatedOrder.status = 'Shipped';
      setOrders([...orders]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Orders</h1>
      {orders.map(order => (
        <div className="card" key={order.id}>
          <div className="card-body">
            <h5 className="card-title">Order ID: {order.id}</h5>
            <p>Date: {order.date}</p>
            <p className="card-text">Email: {order.email}</p>
            <p className="card-text">Products: {order.products}</p>
            <p className="card-text">Total Price: {order.total_price}</p>
            <p className="card-text">Status: {order.status}</p>
            <p className="card-text">Name: {order.Name}</p>
            <p className="card-text">Phone: {order.Phone}</p>
            <p className="card-text">Contact Email: {order.Contact_mail}</p>
            <p className="card-text">Address: {order.Address}</p>
            <p className="card-text">Note: {order.Note}</p>
            <div className="button-group">
              <button className="btn btn-success" onClick={() => handleShipment(order.id)}>Shipment</button>
              <button className="btn btn-danger" onClick={() => handleDelete(order.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default withAuth(AdminOrderList);
