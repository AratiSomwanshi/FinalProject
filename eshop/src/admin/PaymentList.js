
// import React, { useEffect, useState } from 'react';
// import { getAllPayments, updatePaymentStatus, deletePayment } from '../api/paymentApi';
// import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Paper } from '@mui/material';
// import AdminNavbar from './AdminNavbar'; 
// const PaymentList = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const data = await getAllPayments();
//         setPayments(data);
//       } catch (error) {
//         console.error(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPayments();
//   }, []);

//   const handleStatusUpdate = async (id, status) => {
//     try {
//       await updatePaymentStatus(id, status);
//       setPayments(prevPayments =>
//         prevPayments.map(payment =>
//           payment.id === id ? { ...payment, status } : payment
//         )
//       );
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deletePayment(id);
//       setPayments(prevPayments => prevPayments.filter(payment => payment.id !== id));
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   return (<><AdminNavbar/>
//     <Container  style={{
//                     backgroundColor: '#e1f5fe', 
//                     padding: '2rem', 
//                     borderRadius: '8px', 
//                 }}>
//       <Typography variant="h4" gutterBottom>
//         Payments
//       </Typography>
//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>ID</TableCell>
//                 <TableCell>Amount</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {payments.map(payment => (
//                 <TableRow key={payment.id}>
//                   <TableCell>{payment.id}</TableCell>
//                   <TableCell>{payment.amount}</TableCell>
//                   <TableCell>{payment.status}</TableCell>
//                   <TableCell>
//                     <Button
//                       onClick={() => handleStatusUpdate(payment.id, 'SUCCESS')}
//                       color="success"
//                     >
//                       Mark as Success
//                     </Button>
//                     <Button
//                       onClick={() => handleStatusUpdate(payment.id, 'FAILED')}
//                       color="error"
//                     >
//                       Mark as Failed
//                     </Button>
//                     <Button
//                       onClick={() => handleStatusUpdate(payment.id, 'CONFIRMED')}
//                       color="primary"
//                     >
//                       Confirm Payment
//                     </Button>
//                     <Button
//                       onClick={() => handleDelete(payment.id)}
//                       color="secondary"
//                     >
//                       Delete Payment
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Container></>
//   );
// };

// export default PaymentList;
