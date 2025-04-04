// src/components/ProductCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card style={{ maxWidth: 345, margin: '10px' }}>
      <CardMedia
        component="img"
        alt={product.name}
        height="140"
        image={product.imageUrl} // Assuming your products have an image URL
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
        </Typography>
        <Typography variant="h6" color="textPrimary" component="div">
          ${product.price}
        </Typography>
        <Button size="small" component={Link} to={`/products/${product._id}`} variant="contained">
          View Product
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
