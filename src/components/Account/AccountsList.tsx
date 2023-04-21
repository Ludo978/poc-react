import { useQuery } from '@apollo/client';
import {
  Alert, Button, CircularProgress, Grid,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { getAccountsQuery } from 'src/actions/accounts';
import { useNavigate } from 'react-router-dom';
import CreateAccountModal from './CreateAccountModal';

export default function AccountsList() {
  const { loading, data, refetch } = useQuery(getAccountsQuery);

  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  if (loading) return <CircularProgress />;
  if (data?.getAccounts?.accounts) {
    return (
      <>
        <Grid container justifyContent="space-between" marginBottom={2}>
          <h1>Accounts</h1>
          <Button onClick={() => setOpenModal(true)} variant="contained">Create an account</Button>
        </Grid>
        <DataGrid
          columns={[
            { field: 'id', headerName: 'ID', flex: 1 },
            { field: 'createdAt', headerName: 'Created At', flex: 1 },
            { field: 'firstname', headerName: 'Firstname', flex: 1 },
            { field: 'lastname', headerName: 'Lastname', flex: 1 },
            {
              field: 'ordersId',
              headerName: 'Orders nb',
              type: 'number',
              valueFormatter: ({ value }) => value.length,
              flex: 0.5,
            },
          ]}
          rows={data.getAccounts.accounts}
          onRowClick={(row) => navigate(`/accounts/${row.id}`)}
        />
        <CreateAccountModal
          open={openModal}
          setOpen={setOpenModal}
          refetch={refetch}
          initialValues={{
            firstname: '',
            lastname: '',
            email: '',
            password: '',
          }}
        />
      </>
    );
  }
  return <Alert severity="error">An error occured</Alert>;
}
