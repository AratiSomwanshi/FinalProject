import React, { useState, useEffect } from 'react';
import { getAllProducts, deleteProduct } from '../../api/productApi';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleOpenDialog = (id) => {
    setProductToDelete(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setProductToDelete(null);
    setErrorMessage('');
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) {
      console.error('No product selected for deletion');
      return;
    }

    try {
      await deleteProduct(productToDelete);
      fetchProducts(); 
    } catch (error) {
      console.error('Error deleting product:', error);
      setErrorMessage('Failed to delete product.');
    } finally {
      handleCloseDialog();
    }
  };

  return (
    <>
      <AdminNavbar />
      <Box sx={{ backgroundColor: '#f4f6f9', minHeight: '100vh', paddingBottom: '2rem' }}>
        <Container sx={{ paddingTop: '2rem' }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: '2rem' }}>
            Product Table
          </Typography>
          <Button component={Link} to="/products/new" variant="contained" color="primary" sx={{ marginBottom: '16px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>
            Create New Product
          </Button>
          <TableContainer component={Paper} sx={{ backgroundColor: '#2E3B55', marginTop: '2rem' }}>
            <Table sx={{ minWidth: 650 }} aria-label="product table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'white', border: '1px solid #ddd' }}>Name</TableCell>
                  <TableCell sx={{ color: 'white', border: '1px solid #ddd' }}>Description</TableCell>
                  <TableCell sx={{ color: 'white', border: '1px solid #ddd' }}>Price (INR)</TableCell>
                  <TableCell sx={{ color: 'white', border: '1px solid #ddd' }}>Stock</TableCell>
                  <TableCell sx={{ color: 'white', border: '1px solid #ddd' }}>Image</TableCell>
                  <TableCell sx={{ color: 'white', border: '1px solid #ddd' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell sx={{ color: 'white', border: '1px solid #ddd' }}>{product.productName}</TableCell>
                    <TableCell sx={{ color: 'white', border: '1px solid #ddd' }}>{product.description}</TableCell>
                    <TableCell sx={{ color: 'white', border: '1px solid #ddd' }}>₹{product.price}</TableCell>
                    <TableCell sx={{ color: 'white', border: '1px solid #ddd' }}>{product.stock}</TableCell>
                    <TableCell sx={{ border: '1px solid #ddd' }}>
                      <img src={product.imageUrl || 'default-image-url'} alt={product.productName} width={50} />
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #ddd' }}>
                      <Button component={Link} to={`/products/edit/${product.id}`} variant="contained" color="primary" sx={{ marginRight: '8px' }}>
                        Edit
                      </Button>
                      <Button onClick={() => handleOpenDialog(product.id)} variant="contained" color="secondary">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductTable;
