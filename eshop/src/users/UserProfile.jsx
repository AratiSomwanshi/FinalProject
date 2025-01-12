import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUser } from '../api/usersApi';
import { Button, TextField, Avatar, Container, Typography, Grid, Card, CardContent, CardActions } from '@mui/material';
import Navbars from './Navbars';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
     
        const fetchUserProfile = async () => {
            try {
                const userData = await getUserProfile();
                setUser(userData);
                setName(userData.name);
                setEmail(userData.email);
            } catch (error) {
                console.error('Failed to fetch user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleEditToggle = () => {
        setEditing(!editing);
    };

    const handleSave = async () => {
        try {
            const updatedUser = await updateUser(user.id, { ...user, name, email });
            setUser(updatedUser);
            setEditing(false);
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <>
            <Navbars />
            <Container  style={{
                    backgroundColor: '#e1f5fe', 
                    padding: '2rem', 
                    borderRadius: '8px', 
                }}>
                <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 4 }}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Avatar
                                    alt={user.name}
                                    src="https://via.placeholder.com/100" 
                                    sx={{ width: 100, height: 100 }}
                                />
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h5">{user.name}</Typography>
                                <Typography variant="body1" color="textSecondary">{user.email}</Typography>
                            </Grid>
                        </Grid>
                        {editing ? (
                            <div style={{ marginTop: 16 }}>
                                <TextField
                                    label="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                />
                            </div>
                        ) : null}
                    </CardContent>
                    <CardActions>
                        {editing ? (
                            <Button onClick={handleSave} variant="contained" color="primary">
                                Save Changes
                            </Button>
                        ) : (
                            <Button onClick={handleEditToggle} variant="contained" color="secondary">
                                Edit Profile
                            </Button>
                        )}
                    </CardActions>
                </Card>
            </Container>
        </>
    );
};

export default UserProfile;
