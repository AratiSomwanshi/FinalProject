import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import { getAllProducts } from '../api/productApi';
import Grid from '@mui/material/Grid';
import Navbars from './Navbars';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const UserPanel = () => {
    const [products, setProducts] = useState([]);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Fetch products when the component loads
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts(); // Fetch all products from API
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div style={{ backgroundColor: 'rgba(197, 224, 197, 0.64)', minHeight: '100vh' }}>
            <Navbars /> {/* Navbar with cart icon */}
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
            {/* Snackbar for success/error messages */}
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={6000} 
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default UserPanel;
