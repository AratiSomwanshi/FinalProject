import api from './api'; // Import the Axios instance

// Auth API
export const registerUser = async (user) => {
  return api.post('/auth/register', user);
};

export const loginUser = async (credentials) => {
  return api.post('/auth/login', credentials);
};

// User-related API
export const getUserProfile = async (token) => {
  try {
    const response = await api.get('/api/admin/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId) => {
  const token = localStorage.getItem('token');
  try {
    const response = await api.get(`/api/admin/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async (token) => {
  try {
    const response = await api.get('/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



/// Category-related API
const CATEGORY_API_BASE_URL = '/api/admin/categories';

export const createCategory = async (categoryData) => {
  try {
    const response = await api.post(CATEGORY_API_BASE_URL, categoryData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create category: ' + (error.response?.data || error.message));
  }
};

export const getAllCategories = async () => {
  try {
    const response = await api.get(CATEGORY_API_BASE_URL);
    console.log('API Response:', response.data); // Log the response for debugging
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch categories: ' + (error.response?.data || error.message));
  }
};

export const deleteCategory = async (id) => {
  try {
    await api.delete(`${CATEGORY_API_BASE_URL}/${id}`);
  } catch (error) {
    throw new Error('Failed to delete category: ' + (error.response?.data || error.message));
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    const response = await api.get(`${CATEGORY_API_BASE_URL}/${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch category by ID: ' + (error.response?.data || error.message));
  }
};

export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await api.put(`${CATEGORY_API_BASE_URL}/${categoryId}`, categoryData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update category: ' + (error.response?.data || error.message));
  }
};