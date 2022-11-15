import React, { FC, useContext, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { SocketContext } from '../provider/SocketProvider';

const Call = () => {
  const { socket, peer } = useContext(SocketContext);
  useEffect(() => {
    return () => {
      //socket.emit('callOff');
      socket.emit('stopCalling');
    };
  }, []);
  return (
    <>
      <Layout />
    </>
  );
};
export default Call;
