import { Box, Button, Container, Text, Image, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import { Route, Routes } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import { UserInfo } from './components/UserInfo';
import { Call } from './pages/Call';
import HomePage from './pages/HomePage';

const Home = () => {
  return (
    <Route element={<HomePage />} path='/Home'>
      <Route element={<Call />} path='/call' />
    </Route>
  );
};

export default Home;
