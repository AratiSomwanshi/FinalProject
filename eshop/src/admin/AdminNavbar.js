
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const AdminNavbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElPayment, setAnchorElPayment] = useState(null);
    const [anchorElProduct, setAnchorElProduct] = useState(null);
    const [anchorElCategory, setAnchorElCategory] = useState(null);

    const handleMenuOpen = (event, setter) => setter(event.currentTarget);
    const handleMenuClose = (setter) => setter(null);

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Admin Panel
                </Typography>
                <Button color="inherit" component={Link} to="/admin-profile">Admin Profile</Button>
                {/* <Button color="inherit" component={Link} to="/adminprofiles">userdetailsProfile</Button> */}
                <Button color="inherit" onClick={(e) => handleMenuOpen(e, setAnchorElCategory)}>Category</Button>
                <Menu
                    anchorEl={anchorElCategory}
                    open={Boolean(anchorElCategory)}
                    onClose={() => handleMenuClose(setAnchorElCategory)}
                >
                    <MenuItem component={Link} to="/categoryform">AddCategory</MenuItem>
                    <MenuItem component={Link} to="/update">UpdateCategory</MenuItem>
                    <MenuItem component={Link} to="/categorylist">CategoryList</MenuItem>
                </Menu>
                <Button color="inherit" onClick={(e) => handleMenuOpen(e, setAnchorElPayment)}>Payment</Button>
                <Menu
                    anchorEl={anchorElPayment}
                    open={Boolean(anchorElPayment)}
                    onClose={() => handleMenuClose(setAnchorElPayment)}
                >
                    <MenuItem component={Link} to="/paymentlist">Payment List</MenuItem>
                    <MenuItem component={Link} to="/paymentdetails">Payment Details</MenuItem>
                </Menu>
                <Button color="inherit" component={Link} to="/ordermanagement">Order Management</Button>
                <Button color="inherit" component={Link} to="/reviewlist">Review List</Button>
                <Button color="inherit" onClick={(e) => handleMenuOpen(e, setAnchorElProduct)}>Product</Button>
                <Menu
                    anchorEl={anchorElProduct}
                    open={Boolean(anchorElProduct)}
                    onClose={() => handleMenuClose(setAnchorElProduct)}
                >
                    <MenuItem component={Link} to="/products">Product List</MenuItem>
                    <MenuItem component={Link} to="/products/new">Product create</MenuItem>
                    <MenuItem component={Link} to="/products/edit/:id">Products edit</MenuItem>
                   
                    
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default AdminNavbar;
