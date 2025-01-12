import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText, Avatar, CircularProgress, Alert } from '@mui/material';
import { getUserProfile, getAllUsers } from '../../api/apiCalls';
import AdminNavbar from '../AdminNavbar'; 

const AdminProfile = () => {
    const [profile, setProfile] = useState({});
    const [users, setUsers] = useState([]);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [errorProfile, setErrorProfile] = useState('');
    const [errorUsers, setErrorUsers] = useState('');
    const token = localStorage.getItem('token'); // Assume token is stored in localStorage

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile(token);
                setProfile(data);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                setErrorProfile('Failed to fetch profile.');
            } finally {
                setLoadingProfile(false);
            }
        };

        const fetchUsers = async () => {
            try {
                const data = await getAllUsers(token);
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                setErrorUsers('Failed to fetch users.');
            } finally {
                setLoadingUsers(false);
            }
        };

        fetchProfile();
        fetchUsers();
    }, [token]);

    if (loadingProfile || loadingUsers) return <CircularProgress />;
    if (errorProfile) return <Alert severity="error">{errorProfile}</Alert>;
    if (errorUsers) return <Alert severity="error">{errorUsers}</Alert>;

    return (
        <Container maxWidth="md"  style={{
            backgroundColor: '#e1f5fe', 
            padding: '2rem', 
            borderRadius: '8px', 
        }}>
            <AdminNavbar /> {/* Include Admin Navbar */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Avatar sx={{ width: 100, height: 100, margin: 'auto' }}>
                    {profile.name && profile.name.charAt(0)}
                </Avatar>
                <Typography variant="h4" sx={{ mt: 2 }}>
                    {profile.name}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1, color: 'gray' }}>
                    Admin Profile
                </Typography>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5">User Management</Typography>
                <List>
                    {Array.isArray(users) && users.length > 0 ? (
                        users.map(user => (
                            <ListItem key={user.id} sx={{ borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <ListItemText
                                    primary={user.name}
                                    secondary={user.email}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => alert(`View details for ${user.name}`)} // Placeholder for view details functionality
                                >
                                    View Details
                                </Button>
                            </ListItem>
                        ))
                    ) : (
                        <Typography>No users found</Typography>
                    )}
                </List>
            </Box>
        </Container>
    );
};

export default AdminProfile;
