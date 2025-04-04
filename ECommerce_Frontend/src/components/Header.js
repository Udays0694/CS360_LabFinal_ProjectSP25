import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box, Snackbar, Alert } from '@mui/material';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem('token')); // Check if user is logged in
  const [logoutMessage, setLogoutMessage] = useState(false); // State for logout success message

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from storage
    setLogoutMessage(true); // Show logout message
    setTimeout(() => {
      navigate('/login'); // Redirect to login page after message
    }, 2000);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Plant E-Commerce
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/products">
              Products
            </Button>
            <Button color="inherit" component={Link} to="/cart">
              Cart
            </Button>

            {!isAuthenticated ? (
              <>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
              </>
            ) : (
              <>
                {/* Conditionally render Profile link */}
                <Button color="inherit" component={Link} to="/profile">
                  Profile
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Logout success message */}
      <Snackbar open={logoutMessage} autoHideDuration={2000} onClose={() => setLogoutMessage(false)}>
        <Alert onClose={() => setLogoutMessage(false)} severity="success" variant="filled">
          Logout successful!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Header;
