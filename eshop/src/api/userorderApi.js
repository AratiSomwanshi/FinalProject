// src/api/userorderApi.js

import axios from 'axios';


const API_BASE_URL = 'http://localhost:8080/user/orders'; // Update with your actual API base URL


const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to place an order
export const placeOrder = async (userId, orderItems, orderDate, email) => {
    try {
        const response = await apiClient.post('/place', {
            userId,
            orderItems,
            orderDate,
            email,
        });
        return response.data;
    } catch (error) {
        console.error('Error placing order:', error);
        throw error;
    }
};

// Function to track an order
export const trackOrder = async (orderId) => {
    try {
        const response = await apiClient.get(`/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error tracking order:', error);
        throw error;
    }
};

// Function to update order status
export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await apiClient.put(`/${orderId}/status`, null, {
            params: {
                status,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};
