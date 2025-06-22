import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { assets } from '../../../frontend/src/assets/assets';
import { FormControl, MenuItem, Select } from '@mui/material';

const Orders = () => {
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/order/adminorders');
      if (response.data.success) {
        setData(response.data.data);
      } else {
        alert("Some problem occurred");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/order/updatestatus`, {
        status: newStatus,
        orderId : orderId
      });

      if (response.data.success) {
     const updated = data.map(order =>
  order._id === orderId ? { ...order, status: newStatus } : order
);
setData(updated);
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      alert("Error updating status: " + err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <p className='font-semibold text-3xl'>Orders</p>

      {data.length>0 ? (
        <div className='flex flex-col gap-4'>
          {data.map((value, index) => (
            <div key={index} className='grid grid-cols-3 md:grid-cols-6 p-3 items-center border-2 border-black'>
              <div className='flex gap-4 col-span-3 items-center'>
                <img src={assets.parcel_icon} alt="Parcel Icon" className='self-start' />
                <div className='itemnames flex flex-col gap-2'>
                  <p>
                    {value.items.map((item, i) => (
                      `${item.name} x${item.quantity}${i !== value.items.length - 1 ? ', ' : ''}`
                    ))}
                  </p>
                  <p className='font-semibold'>{value.name}</p>
                  <p>{value.address.street}, {value.address.city}</p>
                  <p>{value.address.state}, {value.address.zipcode}, {value.address.country}</p>
                  <p>{value.phone}</p>
                </div>
              </div>

              <p>Items: {value.items.length}</p>
              <p>₹{value.amount}</p>

              <FormControl fullWidth size="small" className='bg-[tomato]/20'>
                <Select
                  value={value.status}
                  onChange={(e) => handleStatusChange(value._id, e.target.value)}
                >
                  <MenuItem value="Food Processing">Food Processing</MenuItem>
                  <MenuItem value="Out For Delivery">Out For Delivery</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                </Select>
              </FormControl>
            </div>
          ))}
        </div>
      ) : (<p>There is no orders</p>)}
    </div>
  );
};

export default Orders;
