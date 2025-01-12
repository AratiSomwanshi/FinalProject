import React, { useEffect, useState } from 'react';
import { useCart } from '../users/CartContext';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../api/userorderApi';
import Navbars from './Navbars';

const useUserContext = () => {
    return {
        userId: 8, 
        email: 'dya@gmail.com', 
        username: 'dya', 
        registrationDate: '2024-01-01', 
    };
};

const OrderPage = () => {
    const { cart, totalPrice } = useCart();
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState(null); 
    const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]); 
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const userContext = useUserContext();

    useEffect(() => {
        if (userContext) {
            setUserId(userContext.userId);
            setEmail(userContext.email);
            setUsername(userContext.username);
        }
    }, [userContext]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            alert('User ID is not set.');
            return;
        }

        try {
            const orderItems = cart.map(item => ({
                product: { id: item.id },
                quantity: item.quantity,
                price: item.price,
            }));

            await placeOrder(userId, orderItems, new Date(orderDate), email);
            alert('Order placed successfully!');
            navigate('/order-success');
        } catch (error) {
            console.error('Failed to place order:', error);
            alert('Failed to place order.');
        }
    };

    return (
        <>
            <Navbars />
            <Container 
                maxWidth="sm" 
                sx={{ 
                    backgroundColor: '#f4f4f9', 
                    borderRadius: 2,            
                    padding: 3,                
                    boxShadow: 3,              
                    mt: 4,                      
                }}
            >
                <Typography variant="h4" gutterBottom>Place Your Order</Typography>
                <form onSubmit={handleSubmit}>
                    {/* Username Display */}
                    <Typography variant="h6" gutterBottom>
                        Hello, {username}
                    </Typography>

                    {/* Email Pre-fill */}
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        required
                        margin="normal"
                        disabled
                    />

                    {/* Total Price Display */}
                    <Typography variant="h6" gutterBottom>
                        Total Price: {totalPrice.toFixed(2)}
                    </Typography>

                    {/* Place Order Button */}
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Place Order
                    </Button>
                </form>

                {/* Additional Information Display */}
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                        User ID: {userId} (This is auto-generated)
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Order Date: {orderDate}
                    </Typography>
                </Box>
            </Container>
        </>
    );
};

export default OrderPage;
