import { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 400,
    fontSize: '1rem',
    fontFamily: 'Roboto, sans-serif',
    borderRadius: '4px',
    _focus: {
      boxShadow: 'none',
    },
    _focusVisible: {
      shadow: 'lg',
    },
  },
  // sizes: {
  //   sm: {
  //     fontSize: ['14px', '16px', '16px'],
  //     px: '1em',
  //     py: '1.0001em',
  //   },
  //   md: {
  //     fontSize: ['14px', '16px', '16px'],
  //     px: '2em',
  //     py: '1.5em',
  //   },
  //   lg: {
  //     fontSize: ['20px', '24px', '24px'],
  //     px: '3em',
  //     py: '1.3339em',
  //   },
  // },
  variants: {
    outline: {
      border: '1px solid',
      borderColor: 'primary.main',
      bgColor: 'white',
      color: 'primary.main',
      _hover: {
        bg: '#eee',
      },
    },
    solid: {
      bg: 'primary.main',
      color: 'white',
      _hover: {
        bg: 'primary.main',
      },
    },
    plain: {
      bg: 'white',
      color: 'primary.main',
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
  },
};
