import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export default function LoginButton() {
  return (
    <Button data-cy="sign-in-button" icon="sign in" content="Log in" compact>
      <a href="/api/auth/login?returnTo=/boards">
        <Icon size="large" name="sign in" />
        Log in
      </a>
    </Button>
  );
}
