import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Typography, Paper, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllCategories, deleteCategory } from '../../api/apiCalls'; 
import AdminNavbar from '../AdminNavbar';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        setError('Error fetching categories: ' + (error.message || 'Unknown error'));
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      setError('Error deleting category: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <>
      <AdminNavbar />
      <Box sx={{ backgroundColor: 'rgba(222, 240, 218, 0.68)', minHeight: '100vh', padding: '2rem' }}>
        <Container>
          <Typography variant="h4" gutterBottom>Category List</Typography>
          <Button
            component={Link}
            to="/categoryform" 
            variant="contained"
            color="primary"
            style={{ marginBottom: '16px' }}
          >
            Add New Category
          </Button>
          {error && <Typography color="error">{error}</Typography>}
          <TableContainer component={Paper} sx={{ backgroundColor: '#2E3B55' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'white', border: '1px solid #ddd' }}>ID</TableCell>
                  <TableCell sx={{ color: 'white', border: '1px solid #ddd' }}>Name</TableCell>
                  <TableCell sx={{ color: 'white', border: '1px solid #ddd' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(categories) && categories.length > 0 ? (
                  categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell sx={{ color: 'white', border: '1px solid #ddd' }}>{category.id}</TableCell>
                      <TableCell sx={{ color: 'white', border: '1px solid #ddd' }}>{category.categoryName}</TableCell>
                      <TableCell sx={{ color: 'white', border: '1px solid #ddd' }}>
                        <Button
                          component={Link}
                          to={`/update/${category.id}`}
                          variant="outlined"
                          color="primary"
                          style={{ marginRight: '8px' }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(category.id)}
                          variant="outlined"
                          color="error"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} sx={{ color: 'white', textAlign: 'center', border: '1px solid #ddd' }}>
                      No categories available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </>
  );
};

export default CategoryList;
