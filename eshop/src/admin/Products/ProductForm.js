import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../AdminNavbar';
import { getProductById, createOrUpdateProduct, getAllCategories } from '../../api/productApi'; 
import backgroundImage from '../../images/nature.jpg';
const ProductForm = () => {
  const [product, setProduct] = useState({
    productName: '',
    description: '',
    price: '',
    imageUrl: '',
    stock: '',
    categoryId: '', 
  });

  const [categories, setCategories] = useState([]); 
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

 
  useEffect(() => {
    if (id) {
      fetchProductById(id); 
    }
    fetchCategories(); 
  }, [id]);

  
  const fetchProductById = async (productId) => {
    try {
      const data = await getProductById(productId);
      setProduct({
        productName: data.productName,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
        stock: data.stock,
        categoryId: data.category.id, 
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Error fetching product details.');
    }
  };

 
  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      if (Array.isArray(data)) {
        setCategories(data); 
      } else {
        console.error('Fetched data is not an array:', data);
        setError('Failed to load categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(`Failed to load categories: ${error.message}`); 
    }
  };


  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrUpdateProduct(product); 
      navigate('/products'); 
    } catch (error) {
      console.error('Error saving product:', error);
      setError('Failed to save product.');
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
        <Container
          sx={{
            backgroundColor: 'rgba(254, 255, 254, 0.78)', 
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: 3,
            border: '1px solid #ddd', 
            width: '100%',
            maxWidth: '600px',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              textAlign: 'center',
              color: '#333',
            }}
          >
            {id ? 'Edit Product' : 'Create Product'}
          </Typography>

          {error && <Typography color="error" sx={{ textAlign: 'center' }}>{error}</Typography>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Product Name"
              name="productName"
              variant="outlined"
              fullWidth
              value={product.productName}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ marginBottom: '1rem', borderColor: '#ddd' }}
            />
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              fullWidth
              value={product.description}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ marginBottom: '1rem', borderColor: '#ddd' }}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              variant="outlined"
              fullWidth
              value={product.price}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ marginBottom: '1rem', borderColor: '#ddd' }}
            />
            <TextField
              label="Image URL"
              name="imageUrl"
              variant="outlined"
              fullWidth
              value={product.imageUrl}
              onChange={handleChange}
              margin="normal"
              sx={{ marginBottom: '1rem', borderColor: '#ddd' }}
            />
            <TextField
              label="Stock"
              name="stock"
              type="number"
              variant="outlined"
              fullWidth
              value={product.stock}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ marginBottom: '1rem', borderColor: '#ddd' }}
            />

            {/* Category Dropdown */}
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                name="categoryId" 
                value={product.categoryId}
                onChange={handleChange}
                variant="outlined"
                sx={{ marginBottom: '1rem' }}
              >
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.categoryName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No categories available</MenuItem>
                )}
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.2rem',
                borderRadius: '4px',
                marginTop: '1.5rem',
                boxShadow: 2,
              }}
            >
              {id ? 'Update Product' : 'Create Product'}
            </Button>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default ProductForm;
