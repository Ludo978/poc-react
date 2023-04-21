import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, GlobalStyles } from '@mui/material';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from './styles/theme';
import styles from './styles/global';
import Routes from './routes';
import client from './actions/setup';
import Store from './context/store';
import './app.scss';
import Layout from './layouts/main';

const inputGlobalStyles = <GlobalStyles styles={styles} />;

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Store>
          <Layout>
            <ThemeProvider theme={theme}>
              <Routes />
              {inputGlobalStyles}
              <ToastContainer />
            </ThemeProvider>
          </Layout>
        </Store>
      </Router>
    </ApolloProvider>
  );
}
