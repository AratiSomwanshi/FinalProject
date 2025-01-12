// src/ProductCard.js
import React from 'react';
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import { useCart } from './users/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <Card sx={{ 
            maxWidth: 345, 
            margin: 2, 
            backgroundColor: 'rgba(187, 214, 156, 0.68)',  // Set the background color here
            borderRadius: 2, // Optional: adding border radius for rounded corners
            boxShadow: 3 // Optional: add some shadow for better visual appeal
        }}>
            <CardMedia
                component="img"
                height="300"
                image={product.imageUrl || 'https://via.placeholder.com/150'}
                alt={product.productName}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
                <Typography variant="h6" color="text.primary">
                    {product.price.toFixed(2)}
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleAddToCart}
                    sx={{ mt: 2 }}
                >
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
