import { Box, Container } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';

const Video = () => {
  let localVideoref = useRef<any>();
  const getVideo = () => {};

  useEffect(() => {
    let constraints = {
      video: true,
      audio: false,
    };
    async function getMedia(constraints: any) {
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);

        localVideoref.current.srcObject = stream;
        localVideoref.current.muted = true;
      } catch (err) {
        console.log(err);
      }
    }

    getMedia(constraints);
  }, []);

  return (
    <Box w={'100%'} h={'100%'} overflowY='hidden' bg='red.300' display={'flex'}>
      <video height={'100%'} width='' ref={localVideoref} autoPlay></video>
    </Box>
  );
};

export { Video };
