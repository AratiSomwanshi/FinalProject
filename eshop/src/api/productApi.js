import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';  // Your backend API URL

// Fetch all products
export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw new Error('Failed to fetch products');
  }
};

// Get a product by ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID: ", error);
    throw new Error(`Failed to fetch product with ID: ${id}`);
  }
};

// Create or update a product
export const createOrUpdateProduct = async (product) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('Unauthorized');
  }

  const userRole = JSON.parse(atob(token.split('.')[1])).role; // Decoding JWT to check role
  if (userRole !== 'ADMIN') {
    throw new Error('Forbidden: You do not have the required permissions');
  }

  try {
    const response = product.id
      ? await axios.put(`${API_URL}/${product.id}`, product, {
          headers: { Authorization: `Bearer ${token}` }
        })
      : await axios.post(API_URL, product, {
          headers: { Authorization: `Bearer ${token}` }
        });

    return response.data;
  } catch (error) {
    console.error("Error creating/updating product: ", error);
    throw new Error('Failed to create or update product');
  }
};

// Delete a product by ID
export const deleteProduct = async (id) => {
  const token = localStorage.getItem('token');  // Get the token from localStorage

  if (!token) {
    throw new Error('Unauthorized: No token provided');
  }

  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Ensure Authorization header is added
      },
    });

    // If you need to handle the response data, you can do so here
    console.log(response.data);
  } catch (error) {
    console.error('Error deleting product:', error.response || error.message);
    throw new Error(`Failed to delete product with ID: ${id}`);
  }
};
// Search products by name
export const searchProductsByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/search`, { params: { name } });
    return response.data;
  } catch (error) {
    console.error("Error searching products: ", error);
    throw new Error('Failed to search products');
  }
};

// Fetch categories
export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error('Failed to fetch categories');
  }
};