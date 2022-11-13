import { Box, Button, Container, Text, Image, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import { UserInfo } from './components/UserInfo';
import HomePage from './HomePage';

const Home = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      {/* <Route element={<Call />} path='/call' /> */}
    </Routes>
  );
};

export default Home;
