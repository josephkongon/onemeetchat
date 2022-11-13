import { Box, Button, Container, Text, Image, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  NavLink,
} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import { Call } from './Call';
import { UserInfo } from './components/UserInfo';
import HomePage from './HomePage';

const Home = () => {
  return (
    <Router>
      <HomePage />
      <Routes>
        <Route element={<Call />} path='/call' />
      </Routes>
    </Router>
  );
};

export default Home;
