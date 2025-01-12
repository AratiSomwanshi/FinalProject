import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/admin/orders';

// Update Order
export const updateOrder = async (id, updatedOrder) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedOrder, {
      headers: {
        'Content-Type': 'application/json',
        // Add necessary headers, e.g., Authorization
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update order');
  }
};

// Delete Order
export const deleteOrder = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        // Add necessary headers, e.g., Authorization
      },
    });
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete order');
  }
};

// Confirm Order
export const confirmOrder = async (id) => {
  try {
    const response = await axios.post(`${BASE_URL}/${id}/confirm`, null, {
      headers: {
        'Content-Type': 'application/json',
        // Add necessary headers, e.g., Authorization
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to confirm order');
  }
};

// Mark Order as Pending
export const markOrderAsPending = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}/status`, null, {
      params: { status: 'PENDING' },
      headers: {
        'Content-Type': 'application/json',
        // Add necessary headers, e.g., Authorization
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to mark order as pending');
  }
};

// Mark Order as Shipped
export const markOrderAsShipped = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}/status`, null, {
      params: { status: 'SHIPPED' },
      headers: {
        'Content-Type': 'application/json',
        // Add necessary headers, e.g., Authorization
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to mark order as shipped');
  }
};

// Mark Order as Delivered
export const markOrderAsDelivered = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}/status`, null, {
      params: { status: 'DELIVERED' },
      headers: {
        'Content-Type': 'application/json',
        // Add necessary headers, e.g., Authorization
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to mark order as delivered');
  }
};

// Mark Order as Cancelled
export const markOrderAsCancelled = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}/status`, null, {
      params: { status: 'CANCELLED' },
      headers: {
        'Content-Type': 'application/json',
        // Add necessary headers, e.g., Authorization
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to mark order as cancelled');
  }
};
