import { useMutation } from '@apollo/client';
import {
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
import { createProductMutation, updateProductMutation } from 'src/actions/products';
import { ProductDto } from 'src/types/product';

interface CreateProductModalProps {
  open: boolean;
  initialValues: Partial<ProductDto>
  setOpen: (open: boolean) => void;
  refetch: () => void;
}

export default function CreateProductModal({
  open,
  initialValues,
  setOpen,
  refetch,
}: CreateProductModalProps) {
  const [createProduct] = useMutation(createProductMutation);
  const [updateProduct] = useMutation(updateProductMutation);

  const [disableButtons, setDisableButtons] = useState(false);

  const onSubmit = async (values) => {
    console.log(values);
    setDisableButtons(false);
    try {
      if (initialValues.id) {
        await updateProduct({ variables: { product: values } });
        toast.success('Product updated');
      } else {
        await createProduct({ variables: { product: values } });
        toast.success('Product created');
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
      <DialogTitle>Create an product</DialogTitle>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit,
          values,
          handleChange,
        }) => (
          <>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    required
                    value={values.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    required
                    value={values.price}
                    onChange={handleChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Image url"
                    name="image"
                    required
                    value={values.image}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    required
                    value={values.description}
                    onChange={handleChange}
                    multiline
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
