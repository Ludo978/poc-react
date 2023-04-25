import { useMutation, useQuery } from '@apollo/client';
import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
} from '@mui/material';
import React, { useState } from 'react';
import { deleteProductMutation, getProductsQuery } from 'src/actions/products';
import { ProductDto } from 'src/types/product';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import CreateProductModal from './CreateProductModal';

interface ProductCardProps {
  productId: string;
  setProduct?: (product: ProductDto) => void;
}

export default function ProductCard({ productId, setProduct }: ProductCardProps) {
  const { loading, data, refetch } = useQuery(getProductsQuery, {
    variables: {
      filters: {
        query: { ids: [productId] },
      },
    },
    onCompleted: (response) => {
      if (setProduct) setProduct(response.getProducts.products[0]);
    },
  });
  const [deleteMutation] = useMutation(deleteProductMutation);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    await deleteMutation({ variables: { productId } });
    navigate('/products', { replace: true });
  };

  if (loading) return <CircularProgress />;
  if (data?.getProducts?.products[0]) {
    const product: ProductDto = data.getProducts.products[0];
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
                {product.name}
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
              <span style={{ fontWeight: 'bold' }}>{new Date(product.createdAt).toLocaleDateString()}</span>
            </div>
            <div>
              {`💲 ${product.price}€`}
            </div>
            <div>
              {`🔤 ${product.description}€`}
            </div>
          </CardContent>
        </Card>
        <CreateProductModal
          refetch={refetch}
          initialValues={product}
          open={open}
          setOpen={setOpen}
        />
      </>
    );
  }
  return <Alert severity="error">An error occured</Alert>;
}
