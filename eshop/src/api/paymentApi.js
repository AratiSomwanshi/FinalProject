// src/api/paymentApi.js


import axios from 'axios';


const BASE_URL = 'http://localhost:8080/api/user/payments'; // Adjust the URL if necessary


export const initiatePayment = async (orderId, paymentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/initiate`, paymentData, {
      params: { orderId },
    });
    return response.data;
  } catch (error) {
  
    console.error('Error initiating payment:', error);
    throw error;
  }
};

// Function to retry a payment
export const retryPayment = async (paymentId, paymentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/${paymentId}/retry`, paymentData);
    return response.data;
  } catch (error) {
    
    console.error('Error retrying payment:', error);
    throw error;
  }
};
