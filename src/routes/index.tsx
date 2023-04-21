import React, { useEffect } from 'react';
import {
  Route, Routes as Switch, useLocation, useNavigate,
} from 'react-router-dom';
import AccountDetails from 'src/components/Account/AccountDetails';
import AccountsList from 'src/components/Account/AccountsList';
import Login from 'src/components/Auth/Login';
import OrderDetails from 'src/components/Order/OrderDetails';
import OrdersList from 'src/components/Order/OrdersList';
import ProductDetails from 'src/components/Product/ProductDetails';
import ProductsList from 'src/components/Product/ProductsList';

export default function Routes() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname !== 'login') {
      if (localStorage.getItem('token')) navigate('/accounts');
      else navigate('/login');
    }
  }, []);
  return (
    <Switch>
      <Route path="/accounts" element={<AccountsList />} />
      <Route path="/accounts/:id" element={<AccountDetails />} />
      <Route path="/orders" element={<OrdersList />} />
      <Route path="/orders/:id" element={<OrderDetails />} />
      <Route path="/products" element={<ProductsList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />
    </Switch>
  );
}
