// src/pages/HomePage.js
import React from 'react';
import { Container, Typography } from '@mui/material';
import ProductCard from '../components/ProductCard';

const HomePage = ({ products }) => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Welcome to Plant E-Commerce
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </Container>
  );
};

export default HomePage;
