import React from 'react';
import { useParams } from 'react-router-dom';

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>Order details</h1>
      <p>{id}</p>
    </div>
  );
}
