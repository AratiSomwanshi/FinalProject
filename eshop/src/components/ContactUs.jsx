import React from 'react';
import { Card, CardContent, Typography, Link, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../components/NavBar'; 
import backgroundImage from '../images/po.jpg';




const CompanyCard = styled(Card)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `url(${backgroundImage})`, 
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  height: '100vh', 
  width: '100vw', 
  position: 'relative',
  overflow: 'hidden', 
});


const ContentContainer = styled(CardContent)({
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  padding: '20px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  maxWidth: '80%',
});


const AdditionalCard = styled(Card)({
  margin: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  overflow: 'hidden', 
});

const ContactUs = () => {
  return (
    <Box sx={{ margin: 0, padding: 0, overflow: 'hidden' }}>
      <Navbar /> 
      
     
      <CompanyCard>
        <ContentContainer>
          <Typography variant="h4" component="div">E-shop</Typography>
          <Typography variant="h6" component="div">Contact: +91 8999328191</Typography>
          <Typography variant="h6" component="div">Address: "Sports Zone", Sports Accessories Building, Kharghar, Mumbai, Batch March-24</Typography>
          <Typography variant="h6" component="div">Follow us:</Typography>
          <Link href="https://facebook.com" color="inherit" sx={{ mr: 1 }}>Facebook</Link>
          <Link href="https://twitter.com" color="inherit" sx={{ mr: 1 }}>Twitter</Link>
          <Link href="https://linkedin.com" color="inherit">LinkedIn</Link>
        </ContentContainer>
      </CompanyCard>
    </Box>
  );
};

export default ContactUs;
