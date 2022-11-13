import { extendTheme } from '@chakra-ui/react';

import { Button, Container, FormLabel, Heading, Input, Link } from './components';
import { colors, fonts } from './foundations';
import { styles } from './styles';

const theme = extendTheme({
  styles,
  colors,
  fonts,
  components: {
    Button,
    Container,
    FormLabel,
    Heading,
    Link,
    Input,
    Textarea: Input,
  },
});

export { theme };
