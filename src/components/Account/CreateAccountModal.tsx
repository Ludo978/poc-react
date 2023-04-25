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
import { createAccountMutation, updateAccountMutation } from 'src/actions/accounts';
import { AccountDto } from 'src/types/account';

interface CreateAccountModalProps {
  open: boolean;
  initialValues: Partial<AccountDto>
  setOpen: (open: boolean) => void;
  refetch: () => void;
}

export default function CreateAccountModal({
  open,
  initialValues,
  setOpen,
  refetch,
}: CreateAccountModalProps) {
  const [createAccount] = useMutation(createAccountMutation);
  const [updateAccount] = useMutation(updateAccountMutation);

  const isEdit = !!initialValues.id;

  const [disableButtons, setDisableButtons] = useState(false);

  const onSubmit = async (values: AccountDto) => {
    setDisableButtons(true);
    try {
      if (isEdit) {
        await updateAccount({
          variables: {
            account: {
              id: initialValues.id,
              firstname: values.firstname,
              lastname: values.lastname,
            },
          },
        });
        toast.success('Account updated');
      } else {
        await createAccount({ variables: { account: values } });
        toast.success('Account created');
      }
      setOpen(false);
      setTimeout(() => refetch(), 1000);
    } catch (error) {
      console.error(error);
      toast.error('An error occured');
    }
    setDisableButtons(false);
  };

  return (
    <Dialog open={open} fullWidth onClose={() => setOpen(false)}>
      <DialogTitle>Create an account</DialogTitle>
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
            <DialogContent style={{ paddingTop: 'var(--small)' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Firstname"
                    name="firstname"
                    required
                    value={values.firstname}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Lastname"
                    name="lastname"
                    required
                    value={values.lastname}
                    onChange={handleChange}
                  />
                </Grid>
                {!isEdit && (
                <>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      required
                      value={values.email}
                      onChange={handleChange}
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      required
                      value={values.password}
                      onChange={handleChange}
                      type="password"
                    />
                  </Grid>
                </>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => handleSubmit()}
                disabled={disableButtons}
              >
                {isEdit ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
}
