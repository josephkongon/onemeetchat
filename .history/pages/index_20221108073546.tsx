import { Box, Button, Container, Text, Image, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import { UserInfo } from './components/UserInfo';
import { Call } from './pages/Call';
import HomePage from './pages/HomePage';

const Home = () => {
  return (
    <Box>
      <HomePage />
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} path='/*'></Route>
          <Route element={<Call />} path='/call' />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default Home;
