import React from 'react';
import {
  Container,
  Icon,
  Image,
  Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { FullVerticalContainer } from '../../common/FullVerticalContainer';

import coolBoardLogo100 from './CoolBoardLogo100.png';
import packLogo from '../../assets/packt-logo.svg';

export default function Home() {
  return (
    <FullVerticalContainer data-cy="home-container">
      <Container
        style={{
          textAlign: 'left',
        }}>
        <h1>
          <Image
            bordered
            src={coolBoardLogo100}
            width="100px"
            circular
            inline
          />
          Welcome to CoolBoard{' '}
        </h1>
        <Segment basic>
          <h2>
            Create a board to share your tasks in a
            kanban style
          </h2>
          <p>
            You need to{' '}
            <Link to="/login">
              <Icon name="sign in" />
              <span>sign in</span>
            </Link>
            first via google, or email.
          </p>
          <p>
            Then start to create
            <Link to="/boards">
              boards
              <Icon size="big" name="list" />
            </Link>
          </p>
          <p>
            If you want to share the board, just send
            the <Icon name="linkify" />
            URL of the board with others.
            <br />
            Everybody who is logged-in can access the board.
          </p>
        </Segment>
        <Segment>
          More
          <Link to="/about">
            {' '}
            <Icon name="linkify" />
            details about
          </Link>{' '}
          this app
        </Segment>

        <Segment basic>
          <Link to="/boards">
            <Image bordered src="/screenshot.png" />
          </Link>
        </Segment>

        <Segment basic>
          <p>
            This is the demo of the app which we built
            in this course:
          </p>
          <h3>
            <a href="https://www.packtpub.com/web-development/hands-application-building-graphql-video">
              <Icon name="video camera" size="large" />
              <b>
                Hands-on Application building with
                GraphQL and React
              </b>
            </a>
          </h3>
          <p>
            <a href="https://www.packtpub.com/web-development/hands-application-building-graphql-video">
              <b>Available</b> at
              <Image
                spaced
                inline
                src={packLogo}
                height={24}
                style={{ verticalAlign: 'bottom' }}
              />
            </a>
          </p>
        </Segment>
      </Container>
    </FullVerticalContainer>
  );
}
