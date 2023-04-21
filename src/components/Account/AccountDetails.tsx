import React from 'react';
import { useParams } from 'react-router-dom';

export default function AccountDetails() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>Account details</h1>
      <p>{id}</p>
    </div>
  );
}
