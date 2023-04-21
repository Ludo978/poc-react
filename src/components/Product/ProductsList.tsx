import { useQuery } from '@apollo/client';
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { getProductsQuery } from 'src/actions/products';
import { useNavigate } from 'react-router-dom';
import CreateProductModal from './CreateProductModal';

export default function ProductsList() {
  const { loading, data, refetch } = useQuery(getProductsQuery);

  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  if (loading) return <CircularProgress />;
  if (data?.getProducts?.products) {
    return (
      <>
        <Grid container justifyContent="space-between" marginBottom={2}>
          <h1>Products</h1>
          <Button onClick={() => setOpenModal(true)} variant="contained">Create a product</Button>
        </Grid>
        <DataGrid
          columns={[
            { field: 'id', headerName: 'ID', flex: 1 },
            { field: 'createdAt', headerName: 'Created At', flex: 1 },
            { field: 'name', headerName: 'Name', flex: 1 },
            { field: 'price', headerName: 'Price', flex: 1 },
          ]}
          rows={data.getProducts.products}
          onRowClick={(row) => navigate(`/products/${row.id}`)}
        />
        <CreateProductModal
          open={openModal}
          setOpen={setOpenModal}
          refetch={refetch}
          initialValues={{
            name: '',
            description: '',
            price: 0,
            image: '',
          }}
        />
      </>
    );
  }
  return <Alert severity="error">An error occured</Alert>;
}
