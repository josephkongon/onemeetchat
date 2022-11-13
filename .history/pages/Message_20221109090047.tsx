import {
  Box,
  Button,
  CircularProgress,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { GiNextButton } from 'react-icons/gi';
import ScrollToBottom from 'react-scroll-to-bottom';
import ReactCountryFlag from 'react-country-flag';
import { UserContext } from '../provider/UserProvider';
import { useNavigate, Navigate } from 'react-router-dom';
import { SocketContext } from '../provider/SocketProvider';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import { MessageType } from '../components/Layout';
const Message = () => {
  const { socket, peer } = useContext(SocketContext);
  const [messages, setMessages] = useState<Array<MessageType | any>>([]);
  const message = useRef<HTMLInputElement | null>(null);
  const [newUser, setNewUser] = useState<UserType | null | any>(null);
  const [{ country, gender, name }] = useContext(UserContext);
  const handleSend = (e: any) => {
    e.preventDefault();
    const text = message.current?.value.trim() as string;
    if (!text) return;
    // if (newUser === null) {
    //   alert('not connected yet');
    //   return;
    // }
    const m = {
      typeof: 'message',
      senderId: socket.id,
      text: text,
      to: newUser?.socketId,
      active: true,
    };

    setMessages((msg) => {
      return [...msg, m];
    });

    socket.off('sendMessage').emit('sendMessage', m);

    if (message.current) message.current.value = '';
  };
  const handleStop = () => {
    if (newUser?.socketId) {
      socket.off('Off').emit('Off', { socketId: newUser?.socketId });
      setNewUser(null);
      setMessages([]);
      socket.off('Msgreconnect').emit('Msgreconnect');
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      if (newUser === null) {
        console.log('reconnect');

        socket.off('Msgreconnect').emit('Msgreconnect');
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [newUser]);
  useEffect(() => {
    socket.off('messaging').emit('messaging', {
      userName: 'sds',
      country: 'sdsd',
      countryName: 'sds',
      countryCode: 'sdsd',
    });
    // if (!name) return;
    socket.off('randomuser').on('randomuser', (Nuser: UserType) => {
      setNewUser(Nuser);
    });
    socket.off('noUseronline').on('noUseronline', () => {
      console.log('noUseronline');
    });
    socket.off('newMessage').on('newMessage', (m) => {
      setMessages((msg) => {
        return [...msg, m];
      });
    });
    socket.off('disconnectedmsg').on('disconnectedmsg', () => {
      console.log('disconnected');
      setNewUser(null);
      setMessages([]);
      socket.off('Off').emit('Off', { socketId: newUser?.socketId });
    });

    return () => {
      socket.off('OffOff').emit('OffOff');

      socket.off('Off').emit('Off', { socketId: newUser?.socketId && null });
      setNewUser(null);
      setMessages([]);
      //window.location.reload();
    };
  }, []);
  // if (!name) {
  //   return <Navigate to='/' replace />;
  // }
  const dataData = () => {
    let today = new Date();
    let time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    console.log(time);

    return time;
  };
  return (
    <Box
      h={'100vh'}
      margin={'0'}
      display={{ base: 'flex', sm: 'grid' }}
      gridTemplate='60px 75% 80px/99vw'
      gridTemplateAreas={"'head''body''com'"}
      // justifyContent='center'
      // alignItems={'center'}
      flexDirection='column'
      position={{ base: 'relative', sm: 'unset' }}
      padding='0.5em'
    >
      <Box
        m='0'
        gridArea={'head'}
        // bg='white'
        boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
        h={{ base: '50px', sm: '100%' }}
        display='flex'
        alignItems={'center'}
        justifyContent='space-between'
        w='100%'
      >
        <Box display='flex' height={'100%'}>
          <Box
            height='100%'
            display={'flex'}
            justifyContent='flex-end'
            alignItems={'flex-end'}
          >
            <Image width='40px' height='40px' src='/logo.svg' alt=''></Image>
          </Box>
          <Box
            fontSize={'1.5rem'}
            height='100%'
            display={'flex'}
            justifyContent='flex-end'
            alignItems={'flex-end'}
          >
            MeetChat
          </Box>
        </Box>
        <Box>
          <ColorModeSwitcher />
        </Box>
      </Box>
      <Box
        marginTop={'5px'}
        gridArea={'body'}
        height={{ base: '70vh', sm: '97%' }}
        // bg={'white'}
        boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
        w='100%'
        p='0.5em'
        marginBottom={'5px'}
      >
        <Box w={'100%'} h={{ base: '100%', sm: '100%' }} paddingBottom={'4rem'}>
          <ScrollToBottom className='stb-container scroll-black'>
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
                    textAlign={mes.senderId === socket.id ? 'right' : 'left'}
                    bg={
                      mes.senderId === socket.id ? 'success' : 'primary.light'
                    }
                    mb='0.2em'
                    p='0.5em'
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
      </Box>
      <Box
        gridArea={'com'}
        marginBottom='5px'
        // bg='white'
        boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
        display='flex'
        flexDirection={{ base: 'column', sm: 'unset' }}
        w={'100%'}
        height={{ base: '6em', sm: '100%' }}
        justifyContent={'space-between'}
        alignItems='center'
        p='1rem'
      >
        <Box display={'flex'} justifyContent={'space-evenly'}>
          <Box mr='3em'>
            {newUser ? (
              ''
            ) : (
              <CircularProgress isIndeterminate color='green.300' />
            )}
            <ReactCountryFlag
              countryCode={newUser?.countryCode}
              svg
              style={{
                width: '2em',
                height: '2em',
              }}
            />
          </Box>

          <Button
            onClick={() => {
              handleStop();
            }}
            position={{ base: 'absolute', sm: 'unset' }}
            right='3rem'
            h={{ base: '4rem', sm: '4rem' }}
            width={{ base: '4rem', sm: '4rem' }}
            mr='3rem'
          >
            <GiNextButton size={25} />
          </Button>
        </Box>
        <Box display={'flex'}>
          <Box
            position={{ base: 'relative', sm: 'unset' }}
            bottom={'8em'}
            left='1em'
          >
            <form onSubmit={(e) => handleSend(e)}>
              <Box alignItems={'center'} display='flex'>
                <Input
                  width={{ base: '19em', sm: '20em', md: '35em' }}
                  h={{ base: '3em', sm: '4rem' }}
                  ref={message}
                  mr='1rem'
                />
                <Button
                  // disabled={newUser? "false":"true"}

                  h={{ base: '3rem', sm: '4rem' }}
                  width={{ base: '3rem', sm: '4rem' }}
                  type='submit'
                >
                  <BiSend size={25} />
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Message;
interface UserType {
  socketId: string;
  username: string;
  country: string;
  countryName: string;
  countryCode: string;
  connected: boolean;
}
