import { Box, Button, Container, Text, Image, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import { UserInfo } from './components/UserInfo';
import { Call } from './pages/Call';
import HomePage from './pages/HomePage';

const Home = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path='/'>
          <Route element={<Call />} path='/call' />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Home;
