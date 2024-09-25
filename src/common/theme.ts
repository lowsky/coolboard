/*
More background about theming:
https://chakra-ui.com/docs/styled-system/theming/theme
https://chakra-ui.com/docs/styled-system/theming/customize-theme#customizing-component-styles
*/
import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    initialColorMode: 'light', // Fallback
  },
  components: {
    Text: {
      baseStyle: {
        mb: '1rem',
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: '700',
        mb: '1rem',
      },
    },
    Container: {
      variants: {
        header: {
          padding: '1em',
          _dark: {
            bg: 'gray.700',
            color: 'gray.300',
          },
          _light: {
            bg: 'lightgray',
            color: 'black',
          },
        },
        footer: (props) => ({
          fontSize: '0.75em',
          padding: '1em',
          color: mode('black', 'lightgray')(props),
          bg: mode('lightgray', 'gray')(props),
        }),
      },
    },
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: 'Inter',
      },
      a: {
        color: mode('#3273dc', 'blue.200')(props),
        _hover: {
          textDecoration: 'underline',
        },
      },
      li: {
        bg: mode('lightgrey', 'grey')(props),
      },
    }),
  },
});
