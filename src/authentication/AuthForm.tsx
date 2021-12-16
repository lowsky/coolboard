import React, { useState} from 'react';
import {
  Button,
  Form,
  Icon,
  Container,
  Message,
  Segment,
} from 'semantic-ui-react';
import Link from 'next/link';

interface Props {
  errors: any [],
  signUp?:boolean
  onSubmit: (state: FormData) => void;
}

export interface FormData {
  name: string,
  email: string,
  password: string,
  avatarUrl: string,
}

const AuthForm = (props: Props) => {
  const [state, setState]  = useState<FormData>({
    name: '',
    email: '',
    password: '',
    avatarUrl: '',
  });
  const { errors = [], signUp = false } = props;

  const handleSubmit = async event => {
    if (event) {
      event.preventDefault();
    }

    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(state);
    }
  };

  const {
    email,
    name,
    password,
    avatarUrl,
  } = state;

  return (
    <Container textAlign="left" text>
      <Form error={!!errors.length}>
        <Form.Input
          fluid
          autoComplete="email"
          placeholder="your email address"
          icon="user"
          onChange={e =>
            setState({ ...state, email: e.target.value })
          }
          label="Email"
          value={email}
          name="email"
          autoFocus
          required
        />
        {signUp && (
          <Form.Input
            fluid
            autoComplete="name"
            placeholder="Your login id or short name"
            icon="user"
            onChange={e =>
              setState({ ...state,
                name: e.target.value,
              })
            }
            label="Login id or Short name"
            value={name}
            name="name"
          />
        )}

        <Form.Input
          label="Password"
          placeholder="choose a password"
          icon="lock"
          value={password}
          name="password"
          type="password"
          autoComplete="new-password"
          required
          onChange={e =>
            setState({ ...state,
              password: e.target.value,
            })
          }
        />
        {signUp && (
          <Form.Input
            label="AvatarUrl"
            icon="image"
            autoComplete="url"
            aria-label="AvatarUrl"
            placeholder="Optional: An URL of an icon representing your avatar"
            value={avatarUrl}
            name="avatarUrl"
            type="url"
            onChange={e =>
              setState({ ...state,
                avatarUrl: e.target.value,
              })
            }
          />
        )}
        <Message
          error
          header="Please check these errors:"
          list={errors}
        />
        <div>
          <Button
            onClick={handleSubmit}
            positive
            color="green"
            size="big">
            <Icon name="sign in" />
            {signUp ? 'Sign Up' : 'Log in'}
          </Button>
        </div>
      </Form>

      {!signUp && (
        <Segment padded textAlign="center">
          <Link href="/signup">
            <a>Sign up here, if you do not have already
              an account</a>
          </Link>
        </Segment>
      )}
    </Container>
  );

}

export default AuthForm;
