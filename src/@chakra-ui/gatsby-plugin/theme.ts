import { extendTheme, theme as baseTheme } from '@chakra-ui/react';

const theme = {
  colors: {
    primary: baseTheme.colors.blue,
    secondary: baseTheme.colors.orange,
  },
  sizes: {
    header: '56px',
  },
};

export default extendTheme(theme);
export { baseTheme };
