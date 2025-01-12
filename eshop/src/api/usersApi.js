// src/api/userApi.js
import api from './api';

export const getUserProfile = async () => {
    try {
        const response = await api.get('/api/users/profile');
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};
// src/api/userApi.js
export const updateUser = async (userId, userData) => {
    try {
        const response = await api.put(`/api/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};
// src/api/userApi.js
export const deleteUser = async (userId) => {
    try {
        const response = await api.delete(`/api/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
