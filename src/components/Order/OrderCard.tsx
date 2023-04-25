import { useMutation, useQuery } from '@apollo/client';
import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
} from '@mui/material';
import React, { useState } from 'react';
import { deleteOrderMutation, getOrdersQuery } from 'src/actions/orders';
import { OrderDto } from 'src/types/order';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import CreateOrderModal from './CreateOrderModal';

interface OrderCardProps {
  orderId: string;
  setOrder?: (order: OrderDto) => void;
}

export default function OrderCard({ orderId, setOrder }: OrderCardProps) {
  const { loading, data, refetch } = useQuery(getOrdersQuery, {
    variables: {
      filters: {
        query: { ids: [orderId] },
      },
    },
    onCompleted: (response) => {
      if (setOrder) setOrder(response.getOrders.orders[0]);
    },

  });
  const [deleteMutation] = useMutation(deleteOrderMutation);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    await deleteMutation({ variables: { orderId } });
    navigate('/orders', { replace: true });
  };

  if (loading) return <CircularProgress />;
  if (data?.getOrders?.orders[0]) {
    const order: OrderDto = data.getOrders.orders[0];
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
                {order.id}
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
              <span style={{ fontWeight: 'bold' }}>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/accounts/${order.accountId}`)}
            >
              {`👨‍💻 ${order.accountId}`}
            </div>
          </CardContent>
        </Card>
        <CreateOrderModal
          refetch={refetch}
          initialValues={order}
          open={open}
          setOpen={setOpen}
        />
      </>
    );
  }
  return <Alert severity="error">An error occured</Alert>;
}
