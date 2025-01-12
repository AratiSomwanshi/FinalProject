// src/users/OrderSuccess.js

import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Order Placed Successfully!</Typography>
            <Typography variant="body1" gutterBottom>Your order has been placed. Thank you for shopping with us.</Typography>
            <Button variant="contained" color="primary" onClick={handleBackToHome}>
                Back to Home
            </Button>
        </Container>
    );
};

export default OrderSuccess;
