/*
More background about theming:
https://chakra-ui.com/docs/styled-system/theming/theme
https://chakra-ui.com/docs/styled-system/theming/customize-theme#customizing-component-styles
*/
import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from '@chakra-ui/react';

export const containerRecipe = defineRecipe({
  variants: {
    variant: {
      header: {
        padding: '1em',
        color: { base: 'black', _dark: 'gray.300' },
        bg: { base: 'lightgray', _dark: 'gray.700' },
      },
      footer: {
        fontSize: '0.75em',
        padding: '1em',
        color: { base: 'black', _dark: 'lightgray' },
        bg: { base: 'lightgray', _dark: 'gray' },
      },
    },
  },
});
const textRecipe = defineRecipe({
  base: {
    mb: '1rem',
  },
});

const headingRecipe = defineRecipe({
  base: {
    fontWeight: '700',
    mb: '1rem',
  },
});

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Inter', sans-serif` },
        body: { value: `'Inter', sans-serif` },
      },
      colors: {
        gray: {
          50: { value: '#fafafa' },
          100: { value: '#f4f4f5' },
          200: { value: '#e4e4e7' },
          300: { value: '#d4d4d8' },
          400: { value: '#a1a1aa' },
          500: { value: '#71717a' },
          600: { value: '#52525b' },
          700: { value: '#3f3f46' },
          800: { value: '#27272a' },
          900: { value: '#18181b' },
          950: { value: '#09090b' },
        },
        blue: {
          500: { value: '#3182ce' },
          200: { value: '#90cdf4' },
        },
      },
    },
    semanticTokens: {
      colors: {
        primary: { value: '{colors.blue.500}' },
      },
    },
    recipes: {
      heading: headingRecipe,
      text: textRecipe,
      container: containerRecipe,
    },
  },
  globalCss: {
    body: {
      fontFamily: 'Inter',
    },
    a: {
      color: '#3273dc',
      _dark: { color: 'blue.200' },
      _hover: {
        textDecoration: 'underline',
      },
    },
    li: {
      //bg: 'lightgray',
      //bg: mode('lightgrey', 'grey'),
    },
  },
});

export const system = createSystem(defaultConfig, config);
