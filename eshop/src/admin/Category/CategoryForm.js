import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { createCategory } from '../../api/apiCalls'; 
import AdminNavbar from '../AdminNavbar';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../images/nature.jpg';

const CategoryForm = ({ refreshCategories }) => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!categoryName.trim()) {
      setError('Category name cannot be empty');
      return;
    }

    setLoading(true); 
    try {
      const response = await createCategory({ categoryName });
      setSuccessMessage(response.message);
      setCategoryName(''); 
      setError(''); 
      
     
      refreshCategories();

      navigate('/categorylist');  
    } catch (error) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false); 
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
        <Container maxWidth="sm">
          <Box
            sx={{
              mt: 4,
              border: '2px solid goldenrod',
              backgroundColor: 'rgba(197, 224, 197, 0.64)', 
              color: 'black', 
              padding: '2rem', 
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', 
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ color: 'black' }}>
              Create a New Category
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
              <TextField
                label="Category Name"
                variant="outlined"
                fullWidth
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                margin="normal"
                required
                disabled={loading} 
                sx={{ marginBottom: '1rem' }}
              />
              {error && <Alert severity="error">{error}</Alert>}
              {successMessage && <Alert severity="success">{successMessage}</Alert>}
              {loading && <CircularProgress sx={{ mt: 2 }} />}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading} 
                sx={{ mt: 2 }}
              >
                {loading ? 'Creating...' : 'Create Category'}
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CategoryForm;
