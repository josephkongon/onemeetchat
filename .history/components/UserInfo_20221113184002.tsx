import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Checkbox,
  Input,
  Select,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { GiFemale } from 'react-icons/gi';
import { useDispatch } from 'react-redux';
//import { useNavigate } from 'react-router-dom';
import { setUserData } from '../pages/redux/slice/userSlice';
import { Privacy } from './Privacy';
import { Terms } from './Terms';

export const UserInfo = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  //const navigate = useNavigate();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const [country, setCountry] = useState<string>('');
  const [countryName, setCountryName] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('');
  const [gender, setGender] = useState<string>('Male');
  const [terms, setTerms] = useState<boolean>(true);
  const [alertDisplay, setAlertDisplay] = useState<string>('none');
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  const handlesubmit = (e: any) => {
    e?.preventDefault?.();
    const name = nameInputRef.current?.value as string;

    if (!name) {
      return;
    }
    if (!gender) {
      return;
    }

    dispatch(
      setUserData({
        name,
        country: { code: countryCode, name: countryName },
        gender: gender,
      })
    );
    onClose();
    //navigate('/call');
  };
  const handleToMsg = () => {
    const name = nameInputRef.current?.value as string;

    if (!name) {
      return;
    }
    setUserData({
      name,
      country: { code: countryCode, name: countryName },
      gender: gender,
    });
    onClose();
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

  return (
    <>
      <Button onClick={onOpen} h='4rem' width={'10rem'}>
        Get started
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Please Enter your Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
          </ModalBody>

          <ModalFooter>
            <Box display={'flex'} width='100%' justifyContent={'space-between'}>
              <Box>
                <Button variant='ghost' onClick={onClose}>
                  Close
                </Button>
              </Box>
              <Box>
                <Button
                  colorScheme='blue'
                  mr={3}
                  onClick={(e) => {
                    handlesubmit(e);
                  }}
                >
                  Video
                </Button>
                <Button
                  colorScheme='blue'
                  mr={3}
                  onClick={() => {
                    handleToMsg();
                  }}
                >
                  Message
                </Button>
              </Box>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
