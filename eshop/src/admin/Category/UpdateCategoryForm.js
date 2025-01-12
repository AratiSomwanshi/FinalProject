import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { updateCategory, getCategoryById, getAllCategories } from '../../api/apiCalls';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar';
import backgroundImage from '../../images/bsp4.jpg'; 

const UpdateCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response);
      } catch (error) {
        setError('Failed to fetch categories.');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      if (selectedCategoryId) {
        try {
          const response = await getCategoryById(selectedCategoryId);
          setCategoryName(response.categoryName || '');
          setError('');
        } catch (error) {
          setError('Failed to fetch category.');
        }
      }
    };
    fetchCategory();
  }, [selectedCategoryId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateCategory(selectedCategoryId, { categoryName });
      setSuccessMessage('Category updated successfully!');
      setError('');
      navigate('/categorylist');
    } catch (error) {
      setError('Failed to update category.');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <AdminNavbar />
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          padding: '10rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container sx={{ backgroundColor: 'rgba(229, 252, 252, 0.64)', width: 500, border: '2px solid goldenrod', padding: '2rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ color: 'black' }}>
            Update Category
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="category-select-label">Select Category</InputLabel>
              <Select
                labelId="category-select-label"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.categoryName} (ID: {category.id})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Category Name"
              variant="outlined"
              fullWidth
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              margin="normal"
              required
              sx={{ marginBottom: '1rem' }}
            />
            {error && <Typography color="error">{error}</Typography>}
            {successMessage && <Typography color="primary">{successMessage}</Typography>}

            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Update Category
            </Button>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default UpdateCategoryForm;
