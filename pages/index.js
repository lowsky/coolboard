import React from 'react';
import {
  Container,
  Icon,
  Segment,
} from 'semantic-ui-react';
import Link from 'next/link';
import Image from 'next/image';

import { FullVerticalContainer } from '../src/common/FullVerticalContainer';
import { trackPage } from "../src/common/tracking";

export default function Index() {
  trackPage('Index');

  return (
    <FullVerticalContainer data-cy="home-container">
      <Container
        style={{
          textAlign: 'left',
        }}>
        <h1>
          <Image
            src={'/CoolBoardLogo100.png'}
            width="100"
            height="101"
            alt="logo"
          />
          Welcome to CoolBoard
        </h1>
        <Segment basic>
          <h2>
            Create a board to share your tasks in a
            kanban style
          </h2>
          <p>
            You need to{' '}
            <Link href="/login">
              <a>
                <Icon name="sign in" />
                <span>sign in</span>
              </a>
            </Link>
            first via google, or email.
          </p>
          <p>
            Then start to create
            <Link href="/boards">
              <a>
                boards
                <Icon size="big" name="list" />
              </a>
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
          <Link href="/about">
            <a>
            {' '}
            <Icon name="linkify" />
            details about
            </a>
          </Link>{' '}
          this app
        </Segment>

        <Segment basic>
          <Link href="/boards" passHref>
            <Image src="/screenshot.png"
            width="1099"
            height="484"
            alt="screenshot" />
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
                src={'/packt-logo.svg'}
                height={24}
                width="100%"
                style={{ verticalAlign: 'bottom' }}
                alt="packt-logo"
              />
            </a>
          </p>
        </Segment>
      </Container>
    </FullVerticalContainer>
  );
}
