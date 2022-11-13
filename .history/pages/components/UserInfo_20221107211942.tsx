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
} from '@chakra-ui/react';
import React, { useState } from 'react';

export const UserInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Button onClick={onOpen} h='4rem' width={'10rem'}>
        Get started
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Box display={'flex'} width='100%' justifyContent={}={'space-between'}>
              <Box>
                <Button variant='ghost'>Close</Button>
              </Box>
              <Box>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Video
                </Button>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
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
