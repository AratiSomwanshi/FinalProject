import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import axios from 'axios';
import backgroundImage from '../images/po.jpg';
const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', formData);
      const { token, role } = response.data;

      // Store token and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Redirect based on the user's role
      if (role === 'ADMIN') {
        navigate('/adminpanel'); // Redirect to Admin Panel
      } else if (role === 'USER') {
        navigate('/userpanel'); // Redirect to User Panel
      } else {
        setError('Invalid role'); // Handle unexpected roles
      }
    } catch (err) {
      setError('Login failed. Invalid username or password.');
      console.error(err);
    }
  };

  return (
    <Box sx={{ 
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
      <Container maxWidth="sm" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '2rem', borderRadius: '8px' }}>
        <Navbar />
        <Typography variant="h4" gutterBottom align="center">Login</Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2, '& .MuiInputLabel-root': { color: 'blue' } }} 
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2, '& .MuiInputLabel-root': { color: 'blue' } }} 
          />
          <Button variant="contained" color="primary" fullWidth type="submit">Login</Button>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
