import { Button, Grid } from '@mui/material';
import React, { useRef, useState } from 'react';
import CreateOrderModal from './CreateOrderModal';
import OrdersTable from './OrdersTable';

export default function OrdersList() {
  const [openModal, setOpenModal] = useState(false);
  const childRef = useRef();

  return (
    <>
      <Grid container justifyContent="space-between" marginBottom={2}>
        <h1>Orders</h1>
        <Button onClick={() => setOpenModal(true)} variant="contained">Create an order</Button>
      </Grid>
      <OrdersTable ref={childRef} />
      <CreateOrderModal
        open={openModal}
        setOpen={setOpenModal}
        // @ts-ignore
        refetch={() => childRef.current?.refetch()}
        initialValues={{
          accountId: '',
          productsId: [],
        }}
      />
    </>
  );
}
