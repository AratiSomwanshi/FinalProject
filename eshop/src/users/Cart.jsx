import React from 'react';
import { useCart } from '../users/CartContext';
import { Button, IconButton, Grid, Typography, Card, CardContent, CardMedia, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbars from './Navbars';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
    const navigate = useNavigate();

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity > 0) {
            updateQuantity(productId, newQuantity);
        }
    };

    const handleBuyNow = () => {
        navigate('/order');
    };

    return (
        <>
            <Navbars />
            <div style={{ padding: '20px', backgroundColor: 'rgba(197, 224, 197, 0.64)', minHeight: '100vh' }}>
                <Typography variant="h4" gutterBottom>Your Cart</Typography>
                <Grid container spacing={2}>
                    {cart.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={2} key={product.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="340"
                                    image={product.imageUrl || 'https://via.placeholder.com/150'}
                                    alt={product.productName}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5">{product.productName}</Typography>
                                    <Typography variant="body2">{product.description}</Typography>
                                    <Typography variant="h6">{product.price.toFixed(2)}</Typography>
                                    <Typography variant="body2">Quantity: {product.quantity}</Typography>
                                    <CardActions>
                                        <Button 
                                            onClick={() => handleQuantityChange(product.id, product.quantity - 1)} 
                                            disabled={product.quantity === 1}
                                        >
                                            -
                                        </Button>
                                        <Button>{product.quantity}</Button>
                                        <Button onClick={() => handleQuantityChange(product.id, product.quantity + 1)}>
                                            +
                                        </Button>
                                    </CardActions>
                                </CardContent>
                                <CardActions>
                                    <IconButton onClick={() => removeFromCart(product.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Typography variant="h5" gutterBottom>Total Price: {totalPrice.toFixed(2)}</Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleBuyNow}
                    sx={{ mt: 2 }}
                >
                    Buy Now
                </Button>
            </div>
        </>
    );
};

export default Cart;
