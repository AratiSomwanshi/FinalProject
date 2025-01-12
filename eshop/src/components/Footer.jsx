import React from 'react';
import { Box, Typography, Link, Divider, IconButton } from '@mui/material';
import { Facebook as FacebookIcon, Twitter as TwitterIcon, LinkedIn as LinkedInIcon, Instagram as InstagramIcon } from '@mui/icons-material';


const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#212121', padding: '20px', textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
        E-commerse
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Link href="/home" sx={{ mx: 2, color: '#ffffff', '&:hover': { color: '#cccccc' } }} variant="body2">
          Home
        </Link>
        <Link href="/about-us" sx={{ mx: 2, color: '#ffffff', '&:hover': { color: '#cccccc' } }} variant="body2">
          About Us
        </Link>
        <Link href="/contact-us" sx={{ mx: 2, color: '#ffffff', '&:hover': { color: '#cccccc' } }} variant="body2">
          Contact Us
        </Link>
        
      </Box>
      <Divider sx={{ my: 2, borderColor: '#ffffff' }} />
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <IconButton href="https://facebook.com" color="inherit">
          <FacebookIcon sx={{ color: '#ffffff' }} />
        </IconButton>
        <IconButton href="https://twitter.com" color="inherit">
          <TwitterIcon sx={{ color: '#ffffff' }} />
        </IconButton>
        <IconButton href="https://linkedin.com" color="inherit">
          <LinkedInIcon sx={{ color: '#ffffff' }} />
        </IconButton>
        <IconButton href="https://instagram.com" color="inherit">
          <InstagramIcon sx={{ color: '#ffffff' }} />
        </IconButton>
      </Box>
      <Typography variant="body2" color="textSecondary" sx={{ color: '#ffffff' }}>
        © {new Date().getFullYear()} Company Name. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
