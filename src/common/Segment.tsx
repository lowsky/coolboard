import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

export const Segment = (boxProps: BoxProps & { variant?: string }) => {
  return <Box my={'14px'} p={'14px'} {...boxProps} />;
};
