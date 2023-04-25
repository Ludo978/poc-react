import { useMutation, useQuery } from '@apollo/client';
import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
} from '@mui/material';
import React, { useState } from 'react';
import { deleteAccountMutation, getAccountsQuery } from 'src/actions/accounts';
import { AccountDto } from 'src/types/account';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import CreateAccountModal from './CreateAccountModal';

export default function AccountCard({ accountId }: { accountId: string }) {
  const { loading, data, refetch } = useQuery(getAccountsQuery, {
    variables: {
      filters: {
        query: { ids: [accountId] },
      },
    },
  });
  const [deleteMutation] = useMutation(deleteAccountMutation);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    await deleteMutation({ variables: { accountId } });
    navigate('/accounts', { replace: true });
  };

  if (loading) return <CircularProgress />;
  if (data?.getAccounts?.accounts[0]) {
    const account: AccountDto = data.getAccounts.accounts[0];
    return (
      <>
        <Card>
          <CardContent>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <h3 style={{ flex: 1 }}>
                {account.firstname}
                {' '}
                {account.lastname}

              </h3>
              <IconButton color="primary" onClick={() => setOpen(true)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </div>
            <div style={{ margin: 'var(--normal) 0' }}>
              📅 Créé le
              {' '}
              <span style={{ fontWeight: 'bold' }}>{new Date(account.createdAt).toLocaleDateString()}</span>
            </div>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => { window.location.href = `mailto:${account.email}`; }}
            >
              {`✉️ ${account.email}`}
            </div>
          </CardContent>
        </Card>
        <CreateAccountModal
          refetch={refetch}
          initialValues={account}
          open={open}
          setOpen={setOpen}
        />
      </>
    );
  }
  return <Alert severity="error">An error occured</Alert>;
}
