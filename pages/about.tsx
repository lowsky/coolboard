import React from 'react';
import { Box, Container, Heading, Icon, Text } from '@chakra-ui/react';

import Image from 'next/image';
import { FaSignInAlt, FaFilm } from 'react-icons/fa';

import { Segment } from '../src/common/Segment';
import { FullVerticalContainer } from '../src/common/FullVerticalContainer';

export default function About() {
  return (
    <FullVerticalContainer data-cy="about-full-container">
      <Container maxW="700px">
        <Segment>
          <Heading as="h2">Welcome to CoolBoard</Heading>
          <Text>
            This is the Live Demo of the full application which we build in this
            <a href="https://www.packtpub.com/web-development/hands-application-building-graphql-video">
              <Icon>
                <FaFilm />
              </Icon>
              Video Course:
            </a>
          </Text>
          <Text>
            <a href="https://www.packtpub.com/web-development/hands-application-building-graphql-video">
              <Image
                src="/packt-page-v141.png"
                width={473}
                height={141}
                alt="Packt Publishing logo"
              />
            </a>
          </Text>
          <Text verticalAlign="center">
            <strong>Published</strong> on{' '}
            <a href="https://www.packtpub.com/web-development/hands-application-building-graphql-video">
              <Image
                src="/packt-logo.svg"
                width={24}
                height={24}
                alt="Packt Publishing logo"
              />
            </a>
          </Text>
        </Segment>
        <Segment>
          <Heading as="h2">What is it?</Heading>
          <Text>
            It is a{' '}
            <a href="https://en.wikipedia.org/wiki/Kanban_(development)">
              Kanban
            </a>{' '}
            Board, where you can share tasks
          </Text>
          <p>and organise them together with real time updates.</p>
        </Segment>
        <Segment>
          <Heading as="h2">How does it work?</Heading>
          <Text>
            You will need to Sign-up via email and{' '}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/sign-in/sign-in">
              <Icon>
                <FaSignInAlt />
              </Icon>
              authenticate here
            </a>
          </Text>
          <p>Then you can create and share a board (via its URL)</p>
        </Segment>
        <Segment>
          <Heading as="h2">What technology is used?</Heading>
          <Text>
            GraphQL database powered by{' '}
            <a href="https://www.prisma.io/">Prisma</a>
          </Text>
          <Text>
            GraphQL trello server running as{' '}
            <a href="https://www.netlify.com/products/functions/">
              lambda functions on Netlify
            </a>
          </Text>
          <Text>
            <a href="https://www.react.org/">React</a>
            frontend with{' '}
            <a href="https://www.apollographql.com/apollo-client">
              Apollo
            </a>{' '}
            served by
            <a href="https://www.netlify.com/">Netlify</a>
          </Text>
        </Segment>
        <Segment variant="padded">
          <Heading>How to sign-in?</Heading>
          <Box
            style={{
              border: 'solid 1px grey',
              textAlign: 'left',
              padding: '8px',
            }}>
            <Text>
              We are using the service of
              <a href="https://auth0.com/">Auth0</a> or
              <a href="https://clerk.dev/">clerk</a>
              to allow signing-in via OAuth using Google or email/password
              automatically.
            </Text>
            <Text>
              <b>About Privacy:</b>
              <br />
              We will use your account information for authenticating and
              storing your boards under your account.
              <br />
              We might rarely send any emails for notifying about changes
              related to providing this service (e.g. news, any case of outage
              or maintenance time) or updated to this.
            </Text>
          </Box>
        </Segment>
        <Segment>
          <Heading>Credits / Copyright</Heading>
          <Text>The logo and favicon was based on</Text>
          <Text>
            “Freezer Cold” icon by Creaticca Creative Agency from the Noun
            Project.
          </Text>
          <Text>“Browser” icon by Didzis Gruznovs from the Noun Project.</Text>
        </Segment>
      </Container>
    </FullVerticalContainer>
  );
}
