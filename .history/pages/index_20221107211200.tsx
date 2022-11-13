import { Box, Button, Container, Text, Image, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { UserInfo } from './components';
const Home = () => {
  return (
    <Box w={'100vw'} h={'100vh'} overflowX='hidden' className='mainscrollbar'>
      <Head>
        <title>One Meet Chat</title>
        <meta
          name='meet random people'
          content='Meet new people all around the world through video call and message'
        />
        <meta name='random call' content='Random calls with strangers ' />
        <meta
          name='random message'
          content='Talk to stangers through messages'
        />
        <link rel='icon' />
      </Head>
      <Box
        display={'flex'}
        justifyContent='space-between'
        alignItems={'center'}
        h='10%'
        boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
      >
        <Box
          ml={'1rem'}
          display='flex'
          alignItems={'center'}
          justifyContent='center'
        >
          <Image width='40px' height='40px' src='/logo.svg' alt=''></Image>
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
      </Box>
      <Box
        height={'1fr'}
        display={{ base: 'flex', md: 'grid' }}
        gridTemplate={'65% 1fr / 33% 33% 1fr'}
        gridTemplateAreas="'a a a''b c d'"
        flexDirection={'column'}
      >
        <Box
          gridArea={'a'}
          display={'flex'}
          border={'solid 2px'}
          p='1.5rem'
          bgImage={{ base: '/onPhone.svg', sm: 'unset' }}
          bgRepeat='no-repeat'
          backgroundPosition={'center'}
          bgSize='cover'
        >
          <Box
            width={{ base: '100%', sm: '40%' }}
            h={{ base: '73vh', md: '100%' }}
            mt={{ base: '4rem', md: '2rem' }}
            mb={{ base: '4rem', md: 'unset' }}
            display={{ base: 'flex', md: 'unset' }}
            flexDirection='column'
          >
            <Box fontSize={{ base: '2rem', sm: '2.5rem' }} fontWeight='bold'>
              <Heading>
                <Text>Lookin to </Text>
                <Text>Talk to Stranger</Text>

                <Text>Via Video Calls or Messages?</Text>
              </Heading>
            </Box>
            <Box mt={{ base: '4rem', md: '2rem' }} ml='2rem'>
              <UserInfo />
            </Box>
          </Box>
          <Box width={'60%'} h='100%'>
            <Box
              ml='5rem'
              w='1fr'
              width={'50%'}
              display={{ base: 'none', sm: 'flex' }}
            >
              <Image
                width={{ base: '10rem', md: '600px' }}
                height='440px'
                src='/onPhone.svg'
                alt=''
              ></Image>
            </Box>
          </Box>
        </Box>
        <Box
          gridArea={'b'}
          flexWrap={'wrap'}
          p='2rem'
          border={'solid 2px'}
          display={'flex'}
          flexDirection='column'
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box fontSize='1.5rem' p={{ base: '1rem', md: 'unset' }}>
            <Text>
              one meet chat is a random Video call and messaging site, where you
              can talk with strangers all around the world
            </Text>
          </Box>
        </Box>
        <Box
          gridArea={'c'}
          border={'solid 2px'}
          flexWrap='wrap'
          display={'flex'}
          flexDirection='column'
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box p={{ base: '3rem', md: '2rem' }} fontSize='1.5rem'>
            <Text>
              This site was build with user experience in mind, it resposive to
              all devices, from Mobile Phones to Labtop
            </Text>
          </Box>
        </Box>
        <Box
          gridArea={'d'}
          border={'solid 2px'}
          p='2rem'
          fontSize='1.5rem'
          flexWrap={'wrap'}
          fontWeight='bold'
          display={'flex'}
          flexDirection='column'
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box as='iframe' boxSize='4rem' src='/iconsface-48.png'></Box>
          <Box>Daily user: 200000</Box>
          <Box> never ending connection</Box>
        </Box>
      </Box>
      <Box h='1fr'>
        <Box
          h='50%'
          display={{ base: 'unset', md: 'flex' }}
          justifyContent={'center'}
          mt='2rem'
        >
          <Box
            margin={{ base: '0', md: '3rem' }}
            justifyContent='space-between'
            width={{ base: '100%', md: '50%' }}
            p='1rem'
          >
            <Text fontSize={{ base: '1.5rem', md: '2rem' }} fontWeight='bold'>
              Meeting people all round the World
            </Text>
            <Text fontSize={'1.3rem'} ml='2rem' w={{ base: '90%', md: '80%' }}>
              With one meet chat you can talk with anyone located anywhere in
              the world, you will be able to make me friends, talk with
              strangers, with fast and optimized connection
            </Text>
          </Box>
          <Box
            ml={{ base: '0', md: '5rem' }}
            w='1fr'
            width={{ base: '100%', md: '50%' }}
          >
            <Image
              width={{ base: '600px', md: '500px' }}
              height={{ base: '300px', md: '400px' }}
              objectFit='cover'
              src='/connected-world.svg'
              alt=''
            ></Image>
          </Box>
        </Box>
        <Box h='50%' display={'flex'} flexDirection='column'>
          <Box
            margin={'1rem'}
            display={{ base: 'flex', md: 'flex' }}
            flexDirection={{ base: 'column-reverse', md: 'unset' }}
            justifyContent='space-between'
            h='100%'
          >
            <Box mr='2rem' width={'100%'}>
              <Image
                width='500px'
                height='300px'
                src='/chatting.svg'
                alt=''
              ></Image>
            </Box>
            <Box w='100%' ml={{ base: '0', md: '3rem' }}>
              <Text
                fontSize={{ base: '1.5rem', md: '2rem' }}
                fontWeight='bold'
                width={{ base: '100%', md: 'unset' }}
              >
                Random Video Calls
              </Text>

              <Text
                fontSize={{ base: '1.3rem', md: '1.3rem' }}
                ml={{ base: '0', md: '2rem' }}
              >
                With one meet chat , you can talk to stranger on video calls as
                well as on message. the messages as also been intergrated to the
                call so that you can send messages to someone even on call with
                that person
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        h='1fr'
        display={'flex'}
        flexDirection='column'
        mt={{ base: '0', md: '2rem' }}
      >
        <Box
          h='50%'
          display={{ base: 'flex', md: 'flex' }}
          flexDirection={{ base: 'column', md: 'unset' }}
          alignItems={'center'}
          justifyContent='space-between'
          p={{ base: '1rem', md: '3rem' }}
        >
          <Box w={{ base: '100%', md: '50%' }}>
            <Text fontSize={'2rem'} fontWeight='bold'>
              How to Use one meet chat
            </Text>
            <Text fontSize={'1.3rem'} pl='2rem'>
              To use one meet chat is very easy, with not much to do, all you
              need to do is to select your gender. now depence on what you want,
              you can go for calls or messages
            </Text>
          </Box>
          <Box>
            <Image
              width='500px'
              height='400px'
              src='/online.svg'
              alt=''
            ></Image>
          </Box>
        </Box>
        <Box
          h='50%'
          alignItems={'center'}
          margin={'1rem'}
          display={{ base: 'flex', md: 'flex' }}
          flexDirection={{ base: 'column-reverse', md: 'unset' }}
          justifyContent='space-between'
        >
          <Box w={{ base: '100%', md: '50%' }}>
            <Image
              width='500px'
              height='400px'
              src='/rating.svg'
              alt=''
            ></Image>
          </Box>
          <Box
            w={{ base: '100%', md: '50%' }}
            display='flex'
            flexDirection={'column'}
            alignItems='center'
          >
            <Text fontSize={'2rem'} fontWeight='bold'>
              Why one meet chat
            </Text>
            <Text fontSize={'1.3rem'} w='70%'>
              one meet chat is build with user experience in mind. here you get
              a responsive site but on computer and on your smart phone. which
              makes it easy to use on mobile devices
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
