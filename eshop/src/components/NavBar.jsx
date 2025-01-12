import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Button } from '@mui/material';
import { Search as SearchIcon, ShoppingCart as ShoppingCartIcon, Login as LoginIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { searchProductsByName } from './../api/productApi'; 
// Styling for the search bar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: 'auto', 
  maxWidth: '300px', 
  [theme.breakpoints.up('sm')]: {
    width: '250px', 
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch', 
      '&:focus': {
        width: '25ch',
      },
    },
  },
}));

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState(''); 
  const [searchResults, setSearchResults] = useState([]); 

 
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  
  const handleSearchSubmit = async (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      try {
        const results = await searchProductsByName(searchQuery);
        setSearchResults(results); 
        console.log('Search results:', results); 
      } catch (error) {
        console.error('Error searching products:', error);
      }
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          E-shop
        </Typography>

        {/* Links for Home, About Us, Contact Us, Settings, Login, Register */}
        <Button color="inherit" component={Link} to="/home">Home</Button>
        <Button color="inherit" component={Link} to="/about-us">About Us</Button>
        <Button color="inherit" component={Link} to="/contact-us">Contact Us</Button>
        <Button color="inherit" component={Link} to="/settings">Settings</Button>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/register">Register</Button>

        {/* Search Bar */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        {/* Login and Shopping Cart Icons */}
        <IconButton color="inherit" component={Link} to="/login">
          <LoginIcon />
        </IconButton>
        <IconButton color="inherit" component={Link} to="/add-to-cart/:userId">
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
