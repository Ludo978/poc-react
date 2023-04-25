import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrderDto } from 'src/types/order';
import OrderCard from './OrderCard';
import ProductsTable from '../Product/ProductsTable';

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState({} as OrderDto);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <OrderCard orderId={id} setOrder={setOrder} />
        </Grid>
        <Grid item md={8} xs={12}>
          <ProductsTable query={{ ids: order.productsId }} />
        </Grid>
      </Grid>
    </div>
  );
}
