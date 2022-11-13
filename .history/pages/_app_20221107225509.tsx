import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../theme';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { SocketProvider } from './provider/SocketProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SocketProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
        {/* <App /> */}
      </SocketProvider>
    </ChakraProvider>
  );
}

export default MyApp;
