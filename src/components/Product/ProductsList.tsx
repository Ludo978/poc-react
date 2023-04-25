import {
  Button,
  Grid,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import CreateProductModal from './CreateProductModal';
import ProductsTable from './ProductsTable';

export default function ProductsList() {
  const [openModal, setOpenModal] = useState(false);
  const childRef = useRef();

  return (
    <>
      <Grid container justifyContent="space-between" marginBottom={2}>
        <h1>Products</h1>
        <Button onClick={() => setOpenModal(true)} variant="contained">Create a product</Button>
      </Grid>
      <ProductsTable ref={childRef} />
      <CreateProductModal
        open={openModal}
        setOpen={setOpenModal}
        // @ts-ignore
        refetch={() => childRef.current?.refetch()}
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
