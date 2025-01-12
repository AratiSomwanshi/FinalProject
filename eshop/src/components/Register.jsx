import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem, Select, FormControl, InputLabel, FormHelperText } from '@mui/material';
import Navbar from '../components/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/po.jpg';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'USER',
    address: '',
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
      const response = await axios.post('http://localhost:8080/auth/register', formData);
      console.log('User registered successfully:', response.data);


      navigate('/login'); 
    } catch (err) {
      setError('Registration failed. Please try again.');
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
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '' }}>Register</Typography> 
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
            label="Email"
            name="email"
            value={formData.email}
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
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2, '& .MuiInputLabel-root': { color: 'blue' } }}  
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="USER">User</MenuItem>
              <MenuItem value="ADMIN">Admin</MenuItem>
            </Select>
            <FormHelperText>Select user role</FormHelperText>
          </FormControl>
          <Button variant="contained" color="primary" fullWidth type="submit">Register</Button>
        </form>
      </Container>
    </Box>
  );
};

export default Register;
