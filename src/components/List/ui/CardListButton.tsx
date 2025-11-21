import { type PropsWithChildren, ReactNode } from 'react';
import { Button } from 'components/ui/button';

export function CardListButton({
  onButtonClick,
  leftIcon,
  children,
}: PropsWithChildren<{
  leftIcon: ReactNode;
  onButtonClick: () => void;
}>) {
  return (
    <Button m="0.1em" onClick={onButtonClick}>
      {leftIcon} {children}
    </Button>
  );
}
