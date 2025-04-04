// src/pages/ProductPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../services/api';
import { Container, Typography, Button, Grid } from '@mui/material';

const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h6">${product.price}</Typography>
          <Button variant="contained" color="primary">Add to Cart</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;
