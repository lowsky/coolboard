import React from 'react';
import { ClerkLoaded, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Container, Icon, Segment } from 'semantic-ui-react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCamera, FaExternalLinkAlt, FaLink, FaList } from 'react-icons/fa';

import { FullVerticalContainer } from '../src/common/FullVerticalContainer';
import { trackPage } from '../src/common/tracking';

import coolBoardLogo from '../public/CoolBoardLogo100.png';
import screenshot from '../public/screenshot.png';

export default function Index() {
  trackPage('Index');

  return (
    <FullVerticalContainer data-cy="home-container">
      <Container
        style={{
          textAlign: 'left',
        }}>
        <ClerkLoaded>
          <SignedIn>SIGNED in</SignedIn>
          <SignedOut>SIGNED out</SignedOut>
        </ClerkLoaded>
        <h1>
          <Image src={coolBoardLogo} width="100" alt="logo" />
          Welcome to CoolBoard - manage your tasks in a kanban style
        </h1>
        <Segment basic>
          <p>
            You can go to your list of
            <Link href="/boards">
              <a>
                boards{' '}
                <Icon width="24">
                  <FaList />
                </Icon>
              </a>
            </Link>
          </p>
        </Segment>

        <Segment basic className="zoomOnHover">
          <Link href="/boards">
            <a>
              <Image
                src={screenshot}
                placeholder="blur"
                width="1099"
                alt="screenshot"
              />
            </a>
          </Link>
        </Segment>

        <Segment>
          <p>This is the demo of the app which we built in this video course</p>
          <h3>
            <a href="https://www.packtpub.com/web-development/hands-application-building-graphql-video">
              <Icon size="large">
                <FaCamera />
              </Icon>
              <b>Hands-on Application building with GraphQL and React</b>
            </a>
          </h3>
          <p>
            <a href="https://www.packtpub.com/web-development/hands-application-building-graphql-video">
              <Icon>
                <FaExternalLinkAlt />
              </Icon>
              <b>Available</b> e.g. at
              <Image
                src={'/packt-logo.svg'}
                height={24}
                width="100%"
                alt="packt publishing"
              />
            </a>{' '}
            or{' '}
            <a href="https://www.udemy.com/course/hands-on-application-development-with-graphql-3-in-1/">
              <Icon>
                <FaExternalLinkAlt />
              </Icon>
              <Image
                src={'/logo-udemy-inverted.svg'}
                height={24}
                width="100%"
                alt="udemy"
              />
            </a>{' '}
            or Safari online, etc.
          </p>
        </Segment>
        <Segment basic>
          There are more
          <Link href="/about">
            <a>
              {' '}
              <Icon>
                <FaLink />
              </Icon>
              details about
            </a>
          </Link>{' '}
          this app.
        </Segment>
      </Container>
    </FullVerticalContainer>
  );
}
