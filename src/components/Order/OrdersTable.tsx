import { useQuery } from '@apollo/client';
import { DataGrid } from '@mui/x-data-grid';
import React, { useImperativeHandle } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrdersQuery } from 'src/actions/orders';

interface OrdersTableProps {
  ref?: any;
  query?: any;
}

export default function OrdersTable({ ref, query }: OrdersTableProps) {
  const { loading, data, refetch } = useQuery(getOrdersQuery, {
    variables: {
      filters: {
        query,
      },
    },
  });
  const navigate = useNavigate();
  useImperativeHandle(ref, () => ({ refetch }));
  return (
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
      rows={data?.getOrders?.orders || []}
      onRowClick={(row) => navigate(`/orders/${row.id}`)}
      loading={loading}
    />
  );
}
