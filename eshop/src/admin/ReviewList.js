
import React, { useEffect, useState } from 'react';
import { getAllReviews, deleteReview } from '../api/reviewApi';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Paper } from '@mui/material';
import AdminNavbar from './AdminNavbar'; 
const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviews();
        setReviews(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      setReviews(prevReviews => prevReviews.filter(review => review.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (<><AdminNavbar/>
    <Container  style={{
                    backgroundColor: '#e1f5fe', 
                    padding: '2rem', 
                    borderRadius: '8px', 
                }}>
      <Typography variant="h4" gutterBottom>
        Reviews
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.map(review => (
                <TableRow key={review.id}>
                  <TableCell>{review.id}</TableCell>
                  <TableCell>{review.product.name}</TableCell>
                  <TableCell>{review.user.username}</TableCell>
                  <TableCell>{review.rating}</TableCell>
                  <TableCell>{review.comment}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(review.id)}
                      color="secondary"
                    >
                      Delete Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container></>
  );
};

export default ReviewList;
