import { useQuery } from '@apollo/client';
import {
  Alert, Button, CircularProgress, Grid,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { getOrdersQuery } from 'src/actions/orders';
import { useNavigate } from 'react-router-dom';
import CreateOrderModal from './CreateOrderModal';

export default function OrdersList() {
  const { loading, data, refetch } = useQuery(getOrdersQuery);

  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  if (loading) return <CircularProgress />;
  if (data?.getOrders?.orders) {
    return (
      <>
        <Grid container justifyContent="space-between" marginBottom={2}>
          <h1>Orders</h1>
          <Button onClick={() => setOpenModal(true)} variant="contained">Create an order</Button>
        </Grid>
        <DataGrid
          columns={[
            { field: 'id', headerName: 'ID', flex: 1 },
            { field: 'createdAt', headerName: 'Created At', flex: 1 },
            { field: 'accountId', headerName: 'Account ID', flex: 1 },
            {
              field: 'productsId',
              headerName: 'Products nb',
              type: 'number',
              valueFormatter: ({ value }) => value.length,
              flex: 0.5,
            },
          ]}
          rows={data.getOrders.orders}
          onRowClick={(row) => navigate(`/orders/${row.id}`)}
        />
        <CreateOrderModal
          open={openModal}
          setOpen={setOpenModal}
          refetch={refetch}
          initialValues={{
            accountId: '',
            productsId: [],
          }}
        />
      </>
    );
  }
  return <Alert severity="error">An error occured</Alert>;
}
