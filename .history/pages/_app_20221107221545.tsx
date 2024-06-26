import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../theme';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      {/* <App /> */}
    </ChakraProvider>
  );
}

export default MyApp;
