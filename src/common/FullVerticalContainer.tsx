import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

export const FullVerticalContainer = ({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) => (
  <Box
    display="flex"
    flexDirection="column"
    height="100vh"
    flex={1}
    {...props}
    style={{
      position: 'relative',
    }}>
    {children}
  </Box>
);
