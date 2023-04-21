import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>Product details</h1>
      <p>{id}</p>
    </div>
  );
}
