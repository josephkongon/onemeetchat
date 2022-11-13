import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Image,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import {
  FC,
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react';
import axios from 'axios';
import { Terms, Privacy, ColorModeSwitcher } from '../components';
import { GiMale, GiFemale } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../provider';
import { UserContext, UserProvider } from '../provider/UserProvider';
import Googlelead from '../components/Googleads';
var dataContext: any = '';
const Home: FC<Page> = () => {
  const navigate = useNavigate();
  const { peer, socket } = useContext(SocketContext);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [country, setCountry] = useState<string>('');
  const [countryName, setCountryName] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('');
  const [gender, setGender] = useState<string>('Male');
  const [terms, setTerms] = useState<boolean>(true);
  const [, setUser] = useContext(UserContext);
  const [alertDisplay, setAlertDisplay] = useState<string>('none');

  const handlesubmit = (e: any) => {
    e?.preventDefault?.();
    const name = nameInputRef.current?.value as string;

    if (!name) {
      setAlertDisplay('');
      setTimeout(() => {
        setAlertDisplay('none');
      }, 1500);
      return;
    }
    if (!gender) {
      return;
    }

    const d = {
      name,
      country: { code: countryCode, name: countryName },
      gender: gender,
    };

    setUser(d);

    navigate('/call');
  };

  useEffect(() => {
    axios
      .get('https://ipapi.co/json/')
      .then((response: any) => {
        let data = response.data;

        setCountry(data.country);
        setCountryName(data.country_name);
        setCountryCode(data.country_code);
      })
      .catch((error: any) => {
        console.log(error);
      });

    return () => {};
  }, []);

  const handleToMsg = () => {
    const name = nameInputRef.current?.value as string;

    if (!name) {
      setAlertDisplay('');
      setTimeout(() => {
        setAlertDisplay('none');
      }, 1500);
      return;
    }
    if (!gender) {
      return;
    }

    const d = {
      name,
      country: { code: countryCode, name: countryName },
      gender: gender,
    };

    setUser(d);
    const dat = { userName: name, country, countryName, countryCode };
    socket.emit('messaging', dat);

    navigate('/message');
  };
  return (
    <Box
      display={'grid'}
      gridTemplate={'4rem 1fr/1fr'}
      gridTemplateAreas={"'head''body'"}
      w='100vw'
      h='100vh'
      // bg='background.main'
      position={'relative'}
    >
      {/* <Googlelead /> */}

      <Box display={alertDisplay} position='absolute' right={'0'} top='4rem'>
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Please Enter your Name</AlertTitle>
        </Alert>
      </Box>
      <Box
        display={terms ? 'none' : ''}
        position='absolute'
        right={'0'}
        top='4rem'
      >
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Please accept our terms</AlertTitle>
        </Alert>
      </Box>
      <Box
        gridArea={'head'}
        display='flex'
        justifyContent='space-between'
        alignItems={'center'}
        boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
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
        gridArea={'body'}
        display='flex'
        flexDirection={'column'}
        alignItems='center'
      >
        <Box
          marginTop={'2rem'}
          display={'flex'}
          flexDirection='column'
          justifyContent='center'
          alignItems={'center'}
          borderRadius={{ base: '0px', sm: '2rem' }}
          w='26rem'
          padding={'1rem'}
          h={{ base: '60vh', md: '80vh' }}
          boxShadow={{
            base: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;',
            sm: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
          }}
        >
          <Box
            marginBottom={'1em'}
            fontSize='1.7rem'
            fontFamily={"'Lobster', cursive;"}
            fontWeight='bold'
            justifyContent='center'
            alignItems={'center'}
            display={'flex'}
            flexDirection='column'
          >
            <Box>Chat with Random people </Box>
            <Box>Around the world</Box>
          </Box>
          <form>
            <Box fontSize={'1.3em'} margin='1rem'>
              <label style={{ display: 'flex' }}>
                Name
                <Input
                  focusBorderColor='primary.main'
                  ref={nameInputRef}
                  marginLeft='0.5rem'
                  type={'text'}
                  h='2.5rem'
                ></Input>
              </label>
            </Box>
            <Box fontSize={'1.3em'} margin='1rem'>
              <label style={{ display: 'flex' }}>
                Gender
                <Select
                  icon={<GiFemale />}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  variant='filled'
                  placeholder='Select Gendar'
                  marginLeft='0.5rem'
                  h='2.5rem'
                >
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Couple'>Couple</option>
                </Select>
              </label>
            </Box>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems='center'
              marginTop={'3rem'}
            >
              <Button onClick={handlesubmit} w='7rem' h='3rem' mr='1em'>
                Video call
              </Button>
              <Button onClick={() => handleToMsg()} w='7rem' h='3rem' ml='1em'>
                Messaging
              </Button>
            </Box>
            <Box margin={'2rem'}>
              <Stack spacing={5} direction='row'>
                <Checkbox
                  colorScheme='red'
                  defaultChecked
                  onChange={(e) => {
                    setTerms(e.target.checked);
                  }}
                ></Checkbox>

                <Box
                  display='flex'
                  flexWrap={'wrap'}
                  width='15em'
                  fontSize={'1.1rem'}
                  fontWeight='bold'
                >
                  <Box display='inline'>
                    In other to use oneMeetChat you need to accept our
                  </Box>
                  <Box
                    textDecoration={'underline'}
                    color='blue.300'
                    cursor={'pointer'}
                    display='inline'
                  >
                    <Terms />
                  </Box>

                  <Box
                    textDecoration={'underline'}
                    color='blue.300'
                    cursor={'pointer'}
                  >
                    <Privacy />
                  </Box>
                </Box>
              </Stack>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export { Home, dataContext };

interface Page {
  setPage(): void;
}
