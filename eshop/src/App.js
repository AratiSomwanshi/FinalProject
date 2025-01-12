import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer'; 
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './users/UserProfile';

import Payment from './users/Payment';
import OrderPage from './users/OrderPage';
import OrderSuccess from './users/OrderSuccess';
import Cart from './users/Cart';
import UserPanel from './users/UserPanel';
import AdminProfile from './admin/Profile/AdminProfile';
import AdminProfilePage from './admin/AdminPanel';
import CategoryForm from './admin/Category/CategoryForm';
import UpdateCategoryForm from './admin/Category/UpdateCategoryForm';
import CategoryList from './admin/Category/CategoryList';
import OrderManagement from './admin/OrderManagement';
import AdminPanel from './admin/AdminPanel';

import ReviewList from './admin/ReviewList';
import ProductForm from './admin/Products/ProductForm';
import Home from './Home';
import ProductTable from './admin/Products/ProductTable';

import ProtectedRoute from './ProtectedRoute';
import { CartProvider } from './users/CartContext'; 



function App() {
  return (
    <Router>
      <CartProvider> 
        <CssBaseline />
        <div style={{ marginTop: '64px', padding: '20px' }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
           
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Protected Routes for Admin */}
            <Route path="/adminpanel" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminPanel /></ProtectedRoute>} />
            <Route path="/categorylist" element={<ProtectedRoute allowedRoles={['ADMIN']}><CategoryList /></ProtectedRoute>} />
            <Route path="/categoryform" element={<ProtectedRoute allowedRoles={['ADMIN']}><CategoryForm /></ProtectedRoute>} />
            <Route path="/update" element={<ProtectedRoute allowedRoles={['ADMIN']}><UpdateCategoryForm /></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute allowedRoles={['ADMIN']}><ProductTable /></ProtectedRoute>} />
            <Route path="/products/new" element={<ProtectedRoute allowedRoles={['ADMIN']}><ProductForm /></ProtectedRoute>} />
            <Route path="/products/edit/:id" element={<ProtectedRoute allowedRoles={['ADMIN']}><ProductForm /></ProtectedRoute>} />
            {/* Protected Routes for User */}
            <Route path="/userpanel" element={<ProtectedRoute allowedRoles={['USER']}><UserPanel /></ProtectedRoute>} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/adminprofile" element={<AdminProfile />} />
           
          
            <Route path="/ordermanagement" element={<OrderManagement />} />
            <Route path="/reviewlist" element={<ReviewList />} />
           
            <Route path="/admin-profile" element={<AdminProfilePage />} />
           
          
            <Route path="/payment" element={<Payment />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/order-success" element={<OrderSuccess />} />

           

          </Routes>
        </div>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
