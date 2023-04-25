import { Grid } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import AccountCard from './AccountCard';
import OrdersTable from '../Order/OrdersTable';

export default function AccountDetails() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <AccountCard accountId={id} />
        </Grid>
        <Grid item md={8} xs={12}>
          <OrdersTable query={{ accountId: id }} />
        </Grid>
      </Grid>
    </div>
  );
}
