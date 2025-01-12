// src/api/adminapi.js

import api from './api';


const ADMIN_API_URL = '/api/admin';

// Fetch user by ID
export const getUserById = async (userId) => {
    try {
        const response = await api.get(`${ADMIN_API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user by ID: ${error.message}`);
    }
};

// Fetch user profile (needs token in local storage)
export const getUserProfile = async () => {
    try {
        const response = await api.get(`${ADMIN_API_URL}/profile`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user profile: ${error.message}`);
    }
};

// Fetch all users (needs token in local storage)
export const getAllUsers = async () => {
    try {
        const response = await api.get(`${ADMIN_API_URL}/users`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching all users: ${error.message}`);
    }
};
