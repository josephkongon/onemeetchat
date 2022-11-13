import { ComponentStyleConfig } from '@chakra-ui/react';

export const Link: ComponentStyleConfig = {
  baseStyle: {
    color: 'black',
    textDecor: 'none',
    letterSpacing: 0,
    _focus: {
      boxShadow: 'none',
    },
    _focusVisible: {
      outlineColor: 'primary.main',
    },
  },
};
