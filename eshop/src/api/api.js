import axios from 'axios';

const API_URL = 'http://localhost:8080/';

// Create an Axios instance
const api = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            // Make sure to wrap the token in the correct Authorization header format
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
