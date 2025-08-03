'use client';

import React, { PropsWithChildren } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';
import { system } from 'common/theme';

export function Provider(props: PropsWithChildren<ColorModeProviderProps>) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} defaultTheme="dark" enableSystem />
    </ChakraProvider>
  );
}
