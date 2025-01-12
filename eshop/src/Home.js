import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getAllProducts } from './api/productApi'; 
import Grid from '@mui/material/Grid';
import Navbar from './components/NavBar'; 

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <Navbar /> 
            <Grid container spacing={0}  style={{
                    backgroundColor: 'rgba(222, 240, 218, 0.68)', 
                    padding: '0.1rem', 
                    borderRadius: '8px', 
                }}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id}>
                        <ProductCard
                            product={product}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Home;
