import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Alert, Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material';
import { getUserProfile } from '../api/apiCalls';
import AdminNavbar from './AdminNavbar';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                await getUserProfile(token);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                setError('Failed to fetch profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token]);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <>
            <AdminNavbar />
            <Box sx={{ padding: '3rem', backgroundColor: 'rgba(82, 75, 46, 0.11)' }}>

                {/* Card Section for Management */}
                <Grid container spacing={4} justifyContent="flex-start" alignItems="stretch" sx={{ paddingBottom: '40px' }}>
                    {/* Category Management Card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{
                            backgroundColor: 'rgba(3, 14, 1, 0.97)',
                            backgroundSize: 'cover',
                            color: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '8px',
                            padding: '16px',
                            marginBottom: '20px',
                            height: '100%',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            border: '10px solid goldenrod',
                        }}>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    Category Management
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Create, list, and update categories.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => navigate('/categoryform')}>Add Category</Button>
                                <Button size="small" onClick={() => navigate('/categorylist')}>View Categories</Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    {/* Product Management Card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{
                            backgroundColor: 'rgb(1, 7, 0)',
                            backgroundSize: 'cover',
                            color: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '8px',
                            padding: '16px',
                            marginBottom: '20px',
                            height: '100%',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            border: '10px solid goldenrod',
                        }}>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    Product Management
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Add, edit, and view products.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => navigate('/products/new')}>Add Product</Button>
                                <Button size="small" onClick={() => navigate('/products')}>View Products</Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    {/* Order Management Card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{
                            backgroundColor: 'rgb(1, 3, 0)',
                            backgroundSize: 'cover',
                            color: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '8px',
                            padding: '16px',
                            marginBottom: '20px',
                            height: '100%',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            border: '10px solid goldenrod',
                        }}>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    Order Management
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Manage customer orders.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => navigate('/ordermanagement')}>Manage Orders</Button>
                            </CardActions>
                        </Card>
                    </Grid>

                </Grid>

                {/* Second Row of Cards */}
                <Grid container spacing={4} justifyContent="flex-start" alignItems="stretch">
                    {/* Payment Management Card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{
                            backgroundColor: 'rgb(2, 10, 0)',
                            backgroundSize: 'cover',
                            color: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '8px',
                            padding: '16px',
                            marginBottom: '20px',
                            height: '100%',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            border: '10px solid goldenrod',
                        }}>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    Payment Management
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    View and manage payments.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => navigate('/paymentlist')}>View Payments</Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    {/* Review Management Card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{
                            backgroundColor: 'rgb(4, 17, 1)',
                            backgroundSize: 'cover',
                            color: 'rgb(255, 255, 255)',
                            borderRadius: '8px',
                            padding: '16px',
                            marginBottom: '20px',
                            height: '100%',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            border: '10px solid goldenrod',
                        }}>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    Review Management
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    View and manage product reviews.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => navigate('/reviewlist')}>View Reviews</Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    {/* Product New Collections Card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{
                            backgroundColor: 'rgb(10, 20, 0)',
                            backgroundSize: 'cover',
                            color: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '8px',
                            padding: '16px',
                            marginBottom: '20px',
                            height: '100%',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            border: '10px solid goldenrod',
                        }}>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    New Collections
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    View and manage new product collections.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => navigate('/plist')}>View Collections</Button>
                                <Button size="small" onClick={() => navigate('/admin/create')}>Create Product</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    
                </Grid>
            </Box>
        </>
    );
};

export default AdminPanel;
