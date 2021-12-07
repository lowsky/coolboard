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

import coolBoardLogo from "../public/CoolBoardLogo100.png";
import screenshot from '../public/screenshot.png'

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
            src={coolBoardLogo}
            width="100"
            alt="logo"
          />
          Welcome to CoolBoard
          - manage your tasks in a
          kanban style
        </h1>
        <Segment basic>
          <h2>
          </h2>
          <p>
            You can go to your list of
            <Link href="/boards">
              <a>
                boards {' '}
                <Icon size="big" name="list" />
              </a>
            </Link>
          </p>
          <p>
            At the first time, you will need to{' '}
            <Link href="/login">
              <a>
                <Icon name="sign in" />
                <span>sign in</span>
              </a>
            </Link>
            first via Google or any email/password.
          </p>
        </Segment>

        <Segment basic className="zoomOnHover">
          <Link href="/boards" passHref>
            <Image src={screenshot}
            placeholder="blur"
            width="1000"
            alt="screenshot" />
          </Link>
        </Segment>

        <Segment>
          <p>
            This is the demo of the app which we built in this video course
          </p>
          <h3>
            <a href="https://www.packtpub.com/web-development/hands-application-building-graphql-video">
              <Icon name="video camera" size="large" />
              <b>
                Hands-on Application building with GraphQL and React
              </b>
            </a>
          </h3>
          <p>
            <a href="https://www.packtpub.com/web-development/hands-application-building-graphql-video">
              <b>Available</b> e.g. at
              <Image
                src={'/packt-logo.svg'}
                height={20}
                width="100%"
                alt="packt-logo"
              />
            </a> or Udemy, Safari online, etc.
          </p>
        </Segment>
        <Segment basic>
          There are more
          <Link href="/about">
            <a>
              {' '}
              <Icon name="linkify" />
              details about
            </a>
          </Link>{' '}
          this app.
        </Segment>
      </Container>
    </FullVerticalContainer>
  );
}
