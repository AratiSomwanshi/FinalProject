import React, { useState } from 'react';
import { 
  updateOrder, 
  deleteOrder, 
  confirmOrder, 
  markOrderAsPending, 
  markOrderAsShipped, 
  markOrderAsDelivered, 
  markOrderAsCancelled 
} from '../api/orderApi';
import AdminNavbar from './AdminNavbar'; // Assuming you have a Navbar component

const OrderManagement = () => {
  const [orderId, setOrderId] = useState('');
  const [orders, setOrders] = useState([]); // Assuming you want to manage a list of orders

  // Handle order update
  const handleUpdateOrder = async () => {
    try {
      const updatedOrder = await updateOrder(orderId, { orderId });
      console.log('Order updated:', updatedOrder);
      // You may want to update the state to reflect the change in your orders list
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handle delete order
  const handleDeleteOrder = async () => {
    try {
      await deleteOrder(orderId);
      console.log('Order deleted');
      // Remove the order from the state after deletion (assuming the order list is available)
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handle confirm order
  const handleConfirmOrder = async () => {
    try {
      const confirmedOrder = await confirmOrder(orderId);
      console.log('Order confirmed:', confirmedOrder);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handle change order status to pending
  const handleMarkOrderAsPending = async () => {
    try {
      const updatedOrder = await markOrderAsPending(orderId);
      console.log('Order marked as pending:', updatedOrder);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handle change order status to shipped
  const handleMarkOrderAsShipped = async () => {
    try {
      const updatedOrder = await markOrderAsShipped(orderId);
      console.log('Order marked as shipped:', updatedOrder);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handle change order status to delivered
  const handleMarkOrderAsDelivered = async () => {
    try {
      const updatedOrder = await markOrderAsDelivered(orderId);
      console.log('Order marked as delivered:', updatedOrder);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handle change order status to cancelled
  const handleMarkOrderAsCancelled = async () => {
    try {
      const updatedOrder = await markOrderAsCancelled(orderId);
      console.log('Order marked as cancelled:', updatedOrder);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div style={{ margin: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Order Management</h2>

        {/* Order Input */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="orderId">Enter Order ID</label>
          <input
            type="text"
            id="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Order ID"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button onClick={handleUpdateOrder} disabled={!orderId} style={buttonStyle}>Update Order</button>
          <button onClick={handleDeleteOrder} disabled={!orderId} style={buttonStyle}>Delete Order</button>
          <button onClick={handleConfirmOrder} disabled={!orderId} style={buttonStyle}>Confirm Order</button>
          <button onClick={handleMarkOrderAsPending} disabled={!orderId} style={buttonStyle}>Mark as Pending</button>
          <button onClick={handleMarkOrderAsShipped} disabled={!orderId} style={buttonStyle}>Mark as Shipped</button>
          <button onClick={handleMarkOrderAsDelivered} disabled={!orderId} style={buttonStyle}>Mark as Delivered</button>
          <button onClick={handleMarkOrderAsCancelled} disabled={!orderId} style={buttonStyle}>Mark as Cancelled</button>
        </div>

        {/* Orders Table */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Render the list of orders here */}
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.status}</td>
                <td>
                  <button style={actionButtonStyle}>View</button>
                  <button style={{ ...actionButtonStyle, marginLeft: '10px' }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Custom styles
const buttonStyle = {
  padding: '10px 20px',
  fontSize: '14px',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '4px',
  transition: 'background-color 0.3s ease',
};

const actionButtonStyle = {
  padding: '5px 10px',
  fontSize: '12px',
  cursor: 'pointer',
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: '#f4f4f4',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
  textAlign: 'left',
};

const thStyle = {
  padding: '12px',
  backgroundColor: '#f2f2f2',
};

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #ddd',
};

export default OrderManagement;
