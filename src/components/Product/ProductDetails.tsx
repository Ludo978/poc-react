import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductDto } from 'src/types/product';
import ProductCard from './ProductCard';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState({} as ProductDto);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <ProductCard productId={id} setProduct={setProduct} />
        </Grid>
        <Grid item md={8} xs={12}>
          <image href={product.image} />
        </Grid>
      </Grid>
    </div>
  );
}
