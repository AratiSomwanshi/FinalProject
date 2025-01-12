import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../users/CartContext';

const Navbars = () => {
    const { cartCount } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.trim() === '') return;
        
        navigate(`/search?query=${searchQuery}&category=${category}`);
    };

    return (
        <AppBar position="fixed" sx={{ top: 0, left: 0, width: '100%', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    MyShop
                </Typography>

                {/* Search Bar with White Background */}
                <div style={{ display: 'flex', alignItems: 'center', width: 'auto' }}>
                    <TextField
                        label="Search Products"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                            marginRight: 2,
                            width: 400,
                            backgroundColor: 'white', // White background for search bar
                            borderRadius: 1, // Optional: rounded corners for better appearance
                        }}
                    />
                    <IconButton color="inherit" onClick={handleSearch}>
                        <SearchIcon />
                    </IconButton>
                </div>

                {/* Category Dropdown with White Background */}
                <FormControl sx={{ minWidth: 120, marginLeft: 2 }}>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        label="Category"
                        size="small"
                        sx={{
                            backgroundColor: 'white', 
                            borderRadius: 1, 
                        }}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="football">Football</MenuItem>
                        <MenuItem value="basketball">Basketball</MenuItem>
                        <MenuItem value="tennis">Tennis</MenuItem>
                        <MenuItem value="baseball">Baseball</MenuItem>
                        <MenuItem value="hockey">Hockey</MenuItem>
                        <MenuItem value="cycling">Cycling</MenuItem>
                        <MenuItem value="swimming">Swimming</MenuItem>
                    </Select>
                </FormControl>

                {/* Navigation Icons */}
                <IconButton color="inherit" component={Link} to="/userhome">
                    <HomeIcon />
                </IconButton>
                <IconButton color="inherit" component={Link} to="/user-profile">
                    <AccountCircle />
                </IconButton>
                <IconButton color="inherit" component={Link} to="/cart">
                    <Badge badgeContent={cartCount} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbars;
