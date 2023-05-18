import React, {useContext, useState, useEffect} from 'react';
import ServerNotificationCard from './ServerNotificationCard';
import CustomerNotificationCard from './ CustomerNotificationCard';
import './Notification.css';
import { GlobalContext } from '../../Global';
import CustomerNotificationOrder from './CustomerNotificationOrder';


const Notification = () => {
  const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail } = useContext(GlobalContext);
  const [customerName, setCustomerName] = useState([]);
  const [serviceproviderName, setServiceproviderName] = useState([]);
  const [orders, setOrders] = useState([]);
  const [statu, setStatu] = useState(false);
  // const [status, setStatus] = useEffect(false);

  useEffect(() => {
    const fetchServiceproviderName = async () => {
      try {
        const response = await fetch(`/Notification/api/server/${globalemail}`);
        const data = await response.json();
  
        if (response.ok) {
          setServiceproviderName(data);
        } else {
          console.log('Failed to fetch Serviceprovider name.');
        }
      } catch (error) {
        console.log(error);
        console.log('Failed to fetch Serviceprovider name.');
      }
    }; 


  const fetchCustomerName = async () => {
    try {
      const response = await fetch(`/Notification/api/customer/${globalemail}`);
      const data = await response.json();

      if (response.ok) {
        setCustomerName(data);
      } else {
        console.log('Failed to fetch customer name.');
      }
    } catch (error) {
      console.log(error);
      console.log('Failed to fetch customer name.');
    }
  };

  const fetchOrderState =async () => {
      console.log("Fetching order info:  ======");

      try{
        const response = await fetch(`/Order/api/customer/${globalemail}`);
        const data = await response.json();

        if(response.ok) {
          console.log("Setting orders");
          setOrders(data);
          data.map(order => (console.log(order.id)));
        }
        else {
          console.log('Failes to fetch order list');
        }
      }catch (error) {
        console.log(error);
        console.log('Failed to fetchorder list for an error');
      }
  };

    if(globalemail) fetchServiceproviderName();
    if(globalemail) fetchCustomerName() ;
    if(globalemail && !statu) fetchOrderState();

  }, [globalemail, statu]);


if(statu){
  setStatu(false);
}
   
console.log("Hi from notification js")
// console.log( {serviceproviderName} + "service provider name")
  const serverNotifications = [
    {
      id: 1,
      message: "User wants to book you"
    },
    {
      id: 2,
      message: "User wants to book you"
    },
    // Add more server notifications as needed
  ];

  const customerNotifications = [
    {
      id: 1,
      message: "User confirmed/rejected your proposal"
    },
    {
      id: 2,
      message: "User confirmed/rejected your proposal"
    },
    // Add more customer notifications as needed
  ];

  return (
    <div>
      
      <div className="notification-container">
        <h3> Request </h3>
        {serviceproviderName.map(notification => (
          <ServerNotificationCard 
          id={notification.id}
          email={notification.customer_id}
          pet={notification.pet}
          service={notification.service}
          timerange={notification.timerange}
          petsize={notification.petsize}
          area={notification.area}
           message={"User wants to book you"} />
        ))}
      </div>
      <div className='notification-container'>
        <h3>Orders</h3>
        {orders.map(order =>(
            <CustomerNotificationOrder key={order.id} order={order} status={setStatu}/>
        ))}
      </div>
      <div className="notification-container">
        <h3> Notifications </h3>
        {customerName.map(notification => (
          <CustomerNotificationCard 
          id={notification.id}
          confirmation = {notification.confirmation}
          email={notification.customer_id}
          serviceprovider_id = {notification.serviceprovider_id} 
          mobile ={notification.mobile}
          message={"User confirmed/rejected your proposal"} />
        ))}
      </div>
    </div>
  );
};

export default Notification;
