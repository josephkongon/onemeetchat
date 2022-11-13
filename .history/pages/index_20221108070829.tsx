import { Box, Button, Container, Text, Image, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import { UserInfo } from './components/UserInfo';
import { Call } from './pages/Call';
import HomePage from './pages/HomePage';

const Home = () => {
  return (
    <Router>
      <Switch>
        <Route element={<Call />} path='/call' />

        <Route element={<HomePage />} path='/'></Route>
      </Switch>

      <Route></Route>
    </Router>
  );
};

export default Home;
