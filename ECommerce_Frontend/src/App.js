// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile'; // ✅ Import UserProfile page
import { fetchProducts } from './services/api';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token')); // ✅ Track login state

  // Fetch products data from the API when the component mounts
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  // Add product to the cart
  const handleAddToCart = (product) => {
    const updatedCart = [...cartItems];
    const existingProductIndex = updatedCart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity += 1;  // Update quantity if the product already exists
    } else {
      updatedCart.push({ ...product, quantity: 1 });  // Add new product to the cart
    }

    setCartItems(updatedCart);
  };

  // Handle order placement
  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    setCartItems([]);  // Clear cart after order is placed
  };

  return (
    <Router>
      <Header />
      <Routes>
        {/* Home Page Route */}
        <Route 
          exact 
          path="/" 
          element={<HomePage products={products} onAddToCart={handleAddToCart} />} 
        />

        {/* Product Page Route */}
        <Route path="/products/:id" element={<ProductPage />} />

        {/* Cart Page Route */}
        <Route 
          path="/cart" 
          element={<CartPage cartItems={cartItems} onPlaceOrder={handlePlaceOrder} />} 
        />

        {/* Registration Page Route */}
        <Route path="/register" element={<RegistrationPage />} />

        {/* Login Page Route */}
        <Route path="/login" element={<LoginPage setToken={setToken} />} /> 

        {/* User Profile Page Route (Protected Route) */}
        {token && <Route path="/profile" element={<UserProfile />} />}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
