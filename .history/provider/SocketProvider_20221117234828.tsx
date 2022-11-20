import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Socket, io } from 'socket.io-client';
import Peer from 'peerjs';
import { url } from 'inspector';

const DEV_MODE = process.env.NODE_ENV === 'development';

const truke = {
  config: {
    iceServers: [
      { urls: 'stun:stun01.sipphone.com' },
      { urls: 'stun:stun.ekiga.net' },
      { urls: 'stun:stun.fwdnet.net' },
      { urls: 'stun:stun.ideasip.com' },
      { urls: 'stun:stun.iptel.org' },
      { urls: 'stun:stun.rixtelecom.se' },
      { urls: 'stun:stun.schlund.de' },
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
      { urls: 'stun:stun3.l.google.com:19302' },
      { urls: 'stun:stun4.l.google.com:19302' },
      { urls: 'stun:stunserver.org' },
      { urls: 'stun:stun.softjoys.com' },
      { urls: 'stun:stun.voiparound.com' },
      { urls: 'stun:stun.voipbuster.com' },
      { urls: 'stun:stun.voipstunt.com' },
      { urls: 'stun:stun.voxgratia.org' },
      { urls: 'stun:stun.xten.com' },
      {
        urls: 'turn:numb.viagenie.ca',
        credential: 'muazkh',
        username: 'webrtc@live.com',
      },
      {
        urls: 'turn:192.158.29.39:3478?transport=udp',
        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        username: '28224511:1379330808',
      },
      {
        urls: 'turn:192.158.29.39:3478?transport=tcp',
        credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        username: '28224511:1379330808',
      },
    ],
  },
};
const peer = new Peer();
//DEV_MODE ? '/' : 'ws://namespace.herokuapp.com'
const socket = io('http://localhost:5000');
//'wss://api.onemeetchat.com/'
//http://143.110.147.156:5000'
const connect = {
  socket,
  peer,
};

const SocketContext = createContext(connect);

type BoxProps = {
  children: React.ReactNode; // 👈️ type children
};
const SocketProvider = (prop: BoxProps) => {
  const { socket, peer } = useContext(SocketContext);
  useEffect(() => {});
  return (
    <SocketContext.Provider value={connect}>
      {prop.children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
