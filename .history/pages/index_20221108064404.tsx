import { Box, Button, Container, Text, Image, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import { Route } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import { UserInfo } from './components/UserInfo';
import { Call } from './pages';
import Home from './pages/Home';

const Pages = () => {
  return (
    <Box>
      <Route element={<Home />} path='/getStarted' />
      <Route element={<Call />} path='/login' />
    </Box>
  );
};

export default Pages;
