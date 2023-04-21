import { useMutation } from '@apollo/client';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createOrderMutation, updateOrderMutation } from 'src/actions/orders';
import { OrderDto } from 'src/types/order';

interface CreateOrderModalProps {
  open: boolean;
  initialValues: Partial<OrderDto>
  setOpen: (open: boolean) => void;
  refetch: () => void;
}

export default function CreateOrderModal({
  open,
  initialValues,
  setOpen,
  refetch,
}: CreateOrderModalProps) {
  const [createOrder] = useMutation(createOrderMutation);
  const [updateOrder] = useMutation(updateOrderMutation);

  const [disableButtons, setDisableButtons] = useState(false);

  const onSubmit = async (values) => {
    console.log(values);
    setDisableButtons(false);
    try {
      if (initialValues.id) {
        await updateOrder({ variables: { order: values } });
        toast.success('Order updated');
      } else {
        await createOrder({ variables: { order: values } });
        toast.success('Order created');
      }
      setOpen(false);
      setTimeout(() => refetch(), 1000);
    } catch (error) {
      console.error(error);
      toast.error('An error occured');
    }
    setDisableButtons(true);
  };

  return (
    <Dialog open={open} fullWidth onClose={() => setOpen(false)}>
      <DialogTitle>Create an order</DialogTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit,
          values,
          handleChange,
          setFieldValue,
        }) => (
          <>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Account ID"
                    name="accountId"
                    required
                    value={values.accountID}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    id="productsId"
                    multiple
                    freeSolo
                    options={[]}
                    onChange={(e, newValue) => setFieldValue('productsId', newValue)}
                    value={values.productsId}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label="Products ID"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleSubmit()} disabled={disableButtons}>Create</Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
}
