// src/api/cartApi.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cart'; // Update to your backend URL

export const getCartItems = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error; // Rethrow the error for further handling
    }
};

export const addCartItem = async (cartId, productId, quantity) => {
    try {
        const response = await axios.post(`${API_URL}/add`, {
            cartId,
            productId,
            quantity
        });
        return response.data;
    } catch (error) {
        console.error('Error adding cart item:', error);
        throw error;
    }
};

export const updateCartItem = async (cartItemId, quantity) => {
    try {
        const response = await axios.put(`${API_URL}/update`, {
            cartItemId,
            quantity
        });
        return response.data;
    } catch (error) {
        console.error('Error updating cart item:', error);
        throw error; // Rethrow the error for further handling
    }
};

export const removeCartItem = async (cartItemId) => {
    try {
        await axios.delete(`${API_URL}/remove`, {
            params: { cartItemId }
        });
    } catch (error) {
        console.error('Error removing cart item:', error);
        throw error; // Rethrow the error for further handling
    }
};
