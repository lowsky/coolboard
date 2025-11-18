import React, { type PropsWithChildren } from 'react';

import { Button } from 'components/ui/button';

export function CardListButton({
  onButtonClick,
  leftIcon,
  children,
}: PropsWithChildren<{
  leftIcon: React.ReactNode;
  onButtonClick: () => void;
}>) {
  return (
    <Button m="0.1em" onClick={onButtonClick}>
      {leftIcon} {children}
    </Button>
  );
}
