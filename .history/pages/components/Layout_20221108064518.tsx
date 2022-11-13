import { Box, Button, Image, Input, Text } from '@chakra-ui/react';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
//@ts-ignore
import ScrollToBottom from 'react-scroll-to-bottom';
import {
  BsFillMicFill,
  BsFillMicMuteFill,
  BsFillCameraVideoFill,
  BsMessenger,
  BsFillCameraVideoOffFill,
  BsStopFill,
} from 'react-icons/bs';
import { useNavigate, Route, Navigate } from 'react-router-dom';
import { BiMailSend, BiSend } from 'react-icons/bi';
import { MdCameraswitch } from 'react-icons/md';

import '../index.css';
import Peer from 'peerjs';
import * as deviceType from 'react-device-detect';
import { Call, dataContext } from '../pages';
import ReactCountryFlag from 'react-country-flag';
import { GiNextButton } from 'react-icons/gi';
import { UserContext } from '../provider/UserProvider';
import { Genders } from './Genders';
import { SocketContext } from '../provider/SocketProvider';
import dynamic from 'next/dynamic';
const Layout: FC = () => {
  const navigate = useNavigate();
  const { socket, peer } = useContext(SocketContext);
  const [newcountry, setNewCountry] = useState<string | null>(null);
  const [newcountryCode, setNewCountrycode] = useState<string>('');
  const [newcountryName, setNewCountryName] = useState<string>('');
  const [userGender, setUserGender] = useState<string>('Male');
  const [mic, setMic] = useState<boolean>(true);
  const [camera, setCamera] = useState<boolean>(true);
  const [messages, setMessages] = useState<Array<MessageType>>([]);
  const [msgBar, setMsgBar] = useState<boolean>(true);
  const mainVidRef = useRef<any>();
  const subVidRef = useRef<any>();
  const [conn, setConn] = useState<Peer.DataConnection | null>(null);
  const [recall, setRecall] = useState<boolean>(true);
  const [mobile, setMobile] = useState<boolean>(false);
  const [rotate, setRotate] = useState<boolean>(false);
  const message = useRef<HTMLInputElement | null>(null);
  const message2 = useRef<HTMLInputElement | null>(null);

  const [{ country, gender, name }] = useContext(UserContext);

  //console.log(name, country, countryName, countryCode);
  const ctry = {
    typeof: 'country',
    senderId: socket.id,
    text: country.name,
    to: 'me',
    active: true,
  };
  const ctryName = {
    typeof: 'countryName',
    senderId: socket.id,
    text: country.name,
    to: 'me',
    active: true,
  };
  const ctrycode = {
    typeof: 'countryCode',
    senderId: socket.id,
    text: country.code,
    to: 'me',
    active: true,
  };
  const sendGender = {
    typeof: 'gender',
    senderId: socket.id,
    text: gender,
    to: 'me',
    active: true,
  };

  const handleMic = () => {
    setMic((m) => !m);
    const m = {
      typeof: 'mic',
      senderId: socket.id,
      text: '',
      to: 'me',
      active: !mic,
    };
    conn?.send(m);
  };
  const handleCamera = () => {
    setCamera((c) => !c);
    const m = {
      typeof: 'camera',
      senderId: socket.id,
      text: '',
      to: 'me',
      active: !camera,
    };
    conn?.send(m);
  };
  const handleStop = () => {
    socket.emit('callOff');
    setRecall(false);
    conn?.close();
    socket.emit('stop');
    // setConn(null);
  };
  const handleNext = () => {
    conn?.close();
    socket.emit('callOff');
    setConn(null);

    socket.emit('reconnect');
    setRecall(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!conn && recall) {
        console.log('reconnect');

        socket.emit('reconnect');
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [conn, name]);

  useEffect(() => {
    //if (!name) return;

    // if (deviceType.isMobile) setMobile(true);
    // else setMobile(false);

    // mobile ? console.log('mobile') : console.log('browser');

    let stream: MediaStream;
    let recStream: MediaStream;

    socket.off('getUser').on('getUser', (peerId) => {
      console.log(peerId);
    });
    socket.off('noUser-online').on('noUser-online', (peerId) => {
      console.log('no user-online');
    });

    peer.on('connection', (conn) => {
      setConn(conn);

      conn.on('open', () => {
        console.log('connection open');
        conn?.send(ctry);

        conn?.send(ctrycode);
        conn.send(ctryName);
        conn.send(sendGender);
        socket.emit('remote-peer');
      });

      conn.on('data', (msg: MessageType) => {
        if (msg.typeof === 'countryName') {
          setNewCountryName(msg.text);
        }
        if (msg.typeof === 'country') {
          setNewCountry(msg.text);
        }
        if (msg.typeof === 'countryCode') {
          setNewCountrycode(msg.text);
        }
        if (msg.typeof === 'gender') {
          setUserGender(msg.text);
        }
        if (msg.typeof === 'message') setMessages((msges) => [...msges, msg]);
        if (msg.typeof === 'camera') {
          //console.log('camera mute');
          recStream.getTracks().forEach((track) => {
            if (track.kind === 'video') {
              console.log('video');

              track.enabled = msg.active;
            }
          });
        }
        if (msg.typeof === 'mic') {
          // console.log('Mic mute');
          recStream.getTracks().forEach((track) => {
            if (track.kind === 'audio') {
              console.log('audio');
              track.enabled = msg.active;
            }
          });
        }
      });

      conn.on('close', () => {
        setMessages([]);

        socket.emit('callOff');
        conn.close();
        setConn(null);
        recStream.getTracks().forEach((t) => t.stop());

        //socket.emit('remote-peer');
      });
    });

    navigator.mediaDevices
      ?.getUserMedia({ video: true, audio: true })
      .then((s) => {
        socket.emit('new-peer', {
          peerId: peer.id,
          name,
          country,
          countryName: country.name,
          countryCode: country.code,
        });
        stream = s;

        if (mainVidRef.current) {
          mainVidRef.current.srcObject = stream;
        }

        peer.on('call', (call) => {
          // When we join someone's room we will receive a call from them

          call.answer(stream); // Stream them our video/audio
          call.on('stream', (remoteStream) => {
            recStream = remoteStream;
            console.log('Remote call ready');
            mainVidRef.current.srcObject = stream;
            subVidRef.current.muted = false;
            subVidRef.current.srcObject = recStream;
            subVidRef.current.style.display = 'unset';
          });

          call.on('close', () => {
            socket.emit('callOff');

            console.log('connection1 close');
            call.close();
            conn?.close();
            setConn(null);
            recStream.getTracks().forEach((t) => t.stop());

            //socket.emit('remote-peer');

            //socket.emit('reconnect');
            //socket.emit('remote-user');
          });
        });

        socket.off('random-user').on('random-user', (user: UserType | null) => {
          if (!user) {
            console.log('No user online');
            return;
          }

          console.log(user.peerId);

          // If a new user connect
          const call = peer.call(user.peerId, stream);

          const conn = peer.connect(user.peerId);
          socket.emit('answer');
          setConn(conn);

          conn.on('data', (msg: MessageType) => {
            //console.log('new message');
            if (msg.typeof === 'countryName') {
              setNewCountryName(msg.text);
            }
            if (msg.typeof === 'country') {
              console.log('here');
              setNewCountry(msg.text);
            }
            if (msg.typeof === 'countryCode') {
              setNewCountrycode(msg.text);
            }
            if (msg.typeof === 'gender') {
              setUserGender(msg.text);
            }
            if (msg.typeof === 'message')
              setMessages((msges) => [...msges, msg]);
            if (msg.typeof === 'camera') {
              //console.log('camera mute');
              recStream.getTracks().forEach((track) => {
                if (track.kind === 'video') {
                  console.log('video');

                  track.enabled = msg.active;
                }
              });
            }
            if (msg.typeof === 'mic') {
              // console.log('Mic mute');
              recStream.getTracks().forEach((track) => {
                if (track.kind === 'audio') {
                  console.log('audio');
                  track.enabled = msg.active;
                }
              });
            }
          });
          conn.on('open', () => {
            console.log('connection opened');

            conn.send(ctry);
            conn.send(ctrycode);
            conn.send(ctryName);
            conn.send(sendGender);
            //socket.emit('reconnect');
            //socket.emit('remote-peer');
          });

          conn.on('close', () => {
            recStream.getTracks().forEach((t) => t.stop());
            socket.emit('callOff');
            setMessages([]);
            call.close();
            setConn(null);
            conn.close();

            //socket.emit('remote-peer');
            //socket.emit('reconnect');
            // peer.disconnect();
            // peer.reconnect();
          });

          // Add their video

          call.on('stream', (remoteStream) => {
            recStream = remoteStream;
            console.log('Remote call ready');
            mainVidRef.current.srcObject = stream;
            subVidRef.current.muted = false;
            subVidRef.current.srcObject = recStream;
            subVidRef.current.style.display = 'unset';
          });

          call.on('close', () => {
            recStream.getTracks().forEach((t) => t.stop());
            socket.emit('callOff');
            call.close();
            conn?.close();
            setConn(null);
          });
          socket.off('disconnect').on('disconnect', () => {
            socket.emit('callOff');
            socket.emit('stopCalling');
          });
        });
      });

    return () => {
      stream?.getTracks().forEach((t) => t.stop());

      conn?.close();
      setConn(null);
      socket.emit('callOff');
      socket.emit('stopCalling');

      window.location.reload();
      //peer.disconnect();

      // peer.destroy();
    };
  }, [
    peer,
    socket,

    // country,
    // countryCode,
    // countryName,
    // ctry,
    // ctryName,

    // name,
    // ctrycode,
    // mobile,
    // restart,
  ]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const text = message.current?.value.trim() as string;
    const text2 = message2.current?.value.trim() as string;
    console.log('text', text);

    if (!text && !text2) return;

    if (text) {
      const m = {
        typeof: 'message',
        senderId: socket.id,
        text: text,
        to: 'me',
        active: true,
      };

      setMessages((msg) => {
        return [...msg, m];
      });

      conn?.send(m);
    } else if (text2) {
      const m = {
        typeof: 'message',
        senderId: socket.id,
        text: text2,
        to: 'me',
        active: true,
      };

      setMessages((msg) => {
        return [...msg, m];
      });

      conn?.send(m);
    }

    if (message.current) message.current.value = '';
    if (message2.current) message2.current.value = '';
  };

  if (!name) {
    //return <Navigate to='/' replace />;
  }

  return (
    <Box
      h='100vh'
      gridTemplate={'1fr 1fr 60px / 2fr 1fr'}
      gridTemplateAreas={"'mv sv''mv msg''tb inp'"}
      display={{ base: 'flex', md: 'grid' }}
      flexDirection={{ base: 'column', md: 'unset' }}
      position={{ base: 'relative', md: 'unset' }}
      bg='background.secondary'
      p={{ base: '0', sm: '0.5em' }}
      gap='0.5em'
    >
      <Box
        gridArea='mv'
        bg='black'
        borderRadius={{ base: '0', sm: '8px' }}
        h={{ base: '47em', sm: '100%', md: '100%' }}
        overflow='hidden'
        position={'relative'}
      >
        <Box
          h='2rem'
          w='4rem'
          //bg='transparent'
          position={'absolute'}
          left='2rem'
          top={{ base: '0', sm: 'unset' }}
          bottom={{ base: 'unset', sm: '0' }}
        >
          <Box display='flex' height={'100%'}>
            <Box
              fontSize={'1.5rem'}
              height='100%'
              display={'flex'}
              justifyContent='flex-end'
              alignItems={'flex-end'}
            >
              OneMeetChat.com
            </Box>
          </Box>
        </Box>
        {conn ? (
          <Box
            as='video'
            playsInline
            objectFit='cover'
            ref={subVidRef}
            muted={true}
            w='100%'
            h='100%'
            autoPlay
          ></Box>
        ) : (
          <></>
        )}

        <Box
          position={'absolute'}
          left='0'
          right={'0'}
          top='0'
          bottom={'0'}
          textAlign='center'
          display={'flex'}
          justifyContent={{ base: 'flex-end', md: 'center' }}
          alignItems={'center'}
          flexDirection={{ base: 'column', md: 'unset' }}
        >
          {conn ? (
            <></>
          ) : (
            <Box
              fontSize={'3em'}
              justifySelf='center'
              alignSelf={'center'}
              mb={{ base: '70%', md: 'unset' }}
            >
              <div className='lds-spinner'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </Box>
          )}
          {msgBar ? (
            <Box
              display={{ base: 'flex', md: 'none' }}
              w='100%'
              as={'form'}
              onSubmit={handleSubmit}
              justifySelf={'flex-end'}
              alignSelf='flex-end'
              justifyContent={'center'}
            >
              <Input
                type='text'
                ref={message2}
                w={{ base: '17em', sm: '100%' }}
              ></Input>
              <Button onClick={handleSubmit}>
                <BiSend size={25} />
              </Button>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Box>
      <Box
        w={{ base: '6em', md: '100%' }}
        position={{ base: 'absolute', md: 'unset' }}
        gridArea='sv'
        top='1em'
        right={'1em'}
      >
        <Box
          borderRadius={{ base: '0', sm: '8px' }}
          overflow='hidden'
          pos='relative'
        >
          <Box
            pos='absolute'
            display='flex'
            columnGap={{ base: '0.5em', md: '1em' }}
            w={'100%'}
            top='10px'
            left={'5px'}
            zIndex='2'
          >
            <Box padding={'3px'} onClick={handleMic}>
              {mic ? <BsFillMicFill color='red' /> : <BsFillMicMuteFill />}
            </Box>
            <Box padding={'3px'} onClick={handleCamera}>
              {camera ? (
                <BsFillCameraVideoFill color='red' />
              ) : (
                <BsFillCameraVideoOffFill />
              )}
            </Box>
          </Box>

          <Box
            boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
            as='video'
            playsInline
            objectFit='cover'
            height={{ base: '150px', md: '100%' }}
            ref={mainVidRef}
            w='100%'
            autoPlay
            muted={true}
            overflow='none'
          ></Box>
        </Box>
      </Box>
      <Box
        borderRadius={{ base: '0', sm: '8px' }}
        gridArea='tb'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        p='0.5em'
      >
        {/* <Box>content</Box> */}
        <Box>
          <Button h={{ base: '2.5em' }} onClick={() => setMsgBar((m) => !m)}>
            <BsMessenger size={25} />
          </Button>
        </Box>
        <Box>
          <div>
            {conn ? (
              <Box display={'flex'}>
                <Box mr={{ base: '10px', md: '20' }}>
                  <Genders gender={userGender} />
                </Box>
                <Box marginRight={'2em'}>{newcountryName}</Box>
                <ReactCountryFlag
                  countryCode={newcountryCode}
                  svg
                  style={{
                    width: '2em',
                    height: '2em',
                  }}
                />
              </Box>
            ) : (
              <></>
            )}
          </div>
        </Box>
        <Box display={'flex'} columnGap='1em'>
          <Button h={{ base: '2.5em' }} onClick={handleNext}>
            <GiNextButton size={25} />
          </Button>
          <Button h={{ base: '2.5em' }} onClick={handleStop}>
            <BsStopFill size={25} />
          </Button>
        </Box>
      </Box>
      <Box
        bg={{ base: 'transparent', md: 'unset' }}
        borderRadius={{ base: '0', sm: '8px' }}
        gridArea='msg'
        position={{ base: 'absolute', md: 'unset' }}
        top='1em'
        left={'1em'}
        w={{ base: '12em', md: 'unset' }}
        h={{ base: '15em', md: 'unset' }}
        overflowX='hidden'
        color={'primary.gray'}
      >
        <ScrollToBottom className='stb-container'>
          {messages.map((mes, index) => {
            return (
              <Box
                key={index}
                display={'flex'}
                flexDirection='column'
                alignItems={
                  mes.senderId === socket.id ? 'flex-end' : 'flex-start'
                }
                w='100%'
              >
                <Text
                  color={{ base: '#6363cec0', md: 'unset' }}
                  textAlign={mes.senderId === socket.id ? 'right' : 'left'}
                  bg={{
                    base: 'transparent',
                    md:
                      mes.senderId === socket.id ? 'success' : 'primary.light',
                  }}
                  mb={{ base: 'unset', md: '0.2em' }}
                  p={{ base: '0.1em', md: '0.5em' }}
                  flexWrap={'wrap'}
                  maxWidth='70%'
                  minWidth={'20%'}
                  borderRadius='1em'
                >
                  {mes.text}
                </Text>
              </Box>
            );
          })}
        </ScrollToBottom>
      </Box>
      {msgBar ? (
        <Box
          bg={{ base: 'transparent', md: 'unset' }}
          borderRadius={{ base: '0', sm: '8px' }}
          gridArea='inp'
          as='form'
          color={'primary.gray'}
          onSubmit={handleSubmit}
          display={{ base: 'none', md: 'flex' }}
          alignItems='center'
          gridGap='0.5em'
          p={{ base: '0', md: '0.5em' }}
          // position={{ base: 'absolute', md: 'unset' }}
          // bottom={{ base: '12.5em', sm: '5rem' }}
          // left={{ base: '3em', sm: '15em' }}
          boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
          alignSelf={'flex-end'}
        >
          <Input
            type='text'
            ref={message}
            w={{ base: '17em', sm: '100%' }}
          ></Input>
          <Button onClick={handleSubmit}>
            <BiSend size={25} />
          </Button>
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export { Layout };

export interface MessageType {
  typeof: string;
  senderId: string;
  text: string;
  to: string | null;
  active: boolean;
}
interface UserType {
  peerId: string;
  socketId: string;
  username: string;
  country: string;
  countryName: string;
  countryCode: string;
  connected: boolean;
}
