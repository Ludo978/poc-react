import { useQuery } from '@apollo/client';
import { DataGrid } from '@mui/x-data-grid';
import React, { useImperativeHandle } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductsQuery } from 'src/actions/products';

interface ProductsTableProps {
  ref?: any;
  query?: any;
}

export default function ProductsTable({ ref, query }: ProductsTableProps) {
  const { loading, data, refetch } = useQuery(getProductsQuery, {
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
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'price', headerName: 'Price', flex: 1 },
      ]}
      rows={data?.getProducts?.products || []}
      onRowClick={(row) => navigate(`/products/${row.id}`)}
      loading={loading}
    />
  );
}
