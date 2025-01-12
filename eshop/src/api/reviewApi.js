// src/api/reviewApi.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/admin/reviews';

// Get All Reviews
export const getAllReviews = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        // Add necessary headers, e.g., Authorization
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch reviews');
  }
};

// Delete Review
export const deleteReview = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        // Add necessary headers, e.g., Authorization
      },
    });
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete review');
  }
};
