import { Button } from 'components/ui/button';

export function CardListButton({ onButtonClick, leftIcon, children }) {
  return (
    <Button m="0.1em" onClick={onButtonClick}>
      {leftIcon} {children}
    </Button>
  );
}
