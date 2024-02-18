import { useState } from 'react';

export function useConfirmAction(action: () => void): [boolean, () => void] {
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);

  const askForConfirmationThenDoAction = (): void => {
    if (showConfirmationMessage) {
      action();
      setShowConfirmationMessage(false);
    } else {
      setShowConfirmationMessage(true);
    }
  };

  return [showConfirmationMessage, askForConfirmationThenDoAction];
}
