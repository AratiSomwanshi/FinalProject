import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Snackbar } from '@mui/material';
import { initiatePayment, retryPayment } from '../api/paymentApi';
import Alert from '@mui/material/Alert';

const Payment = () => {
  const [orderId, setOrderId] = useState('');
  const [paymentData, setPaymentData] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackSeverity, setFeedbackSeverity] = useState('info');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleInitiatePayment = async () => {
    try {
      await initiatePayment(orderId, { paymentData });
      setFeedbackMessage('Payment initiated successfully!');
      setFeedbackSeverity('success');
    } catch (error) {
      setFeedbackMessage('Failed to initiate payment. Please try again.');
      setFeedbackSeverity('error');
    }
    setOpenSnackbar(true);
  };

  const handleRetryPayment = async () => {
    try {
      await retryPayment(paymentId, { paymentData });
      setFeedbackMessage('Payment retry successful!');
      setFeedbackSeverity('success');
    } catch (error) {
      setFeedbackMessage('Failed to retry payment. Please try again.');
      setFeedbackSeverity('error');
    }
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Payment Form</Typography>
      
      <TextField
        label="Order ID"
        fullWidth
        margin="normal"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      
      <TextField
        label="Payment Data"
        fullWidth
        margin="normal"
        value={paymentData}
        onChange={(e) => setPaymentData(e.target.value)}
      />
      
      <Button variant="contained" color="primary" onClick={handleInitiatePayment} fullWidth>
        Initiate Payment
      </Button>

      <TextField
        label="Payment ID (for retry)"
        fullWidth
        margin="normal"
        value={paymentId}
        onChange={(e) => setPaymentId(e.target.value)}
      />

      <Button variant="contained" color="secondary" onClick={handleRetryPayment} fullWidth>
        Retry Payment
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={feedbackSeverity}>
          {feedbackMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Payment;
