import React, { Suspense, useEffect, useState } from 'react';
import { Container, Flex, Heading, Icon, Text } from '@chakra-ui/react';

import Link from 'next/link';
import Image from 'next/image';
import { FaChalkboardTeacher, FaFilm, FaLink } from 'react-icons/fa';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  type ApolloClient,
  ApolloProvider,
  type NormalizedCacheObject,
} from '@apollo/client';

import { Board } from 'components/Board/Board';
import { setupGraphQLClient } from 'src/setupGraphQLClient';

import { Segment } from 'src/common/Segment';
import { FullVerticalContainer } from 'src/common/FullVerticalContainer';
import { isInBrowserEnv } from 'common/isInBrowserEnv';
import { trackPage } from 'src/common/tracking';

import coolBoardLogo from 'public/CoolBoardLogo100.png';
import screenshot from 'public/screenshot.png';

// probing, debug stuff (delete me)
if (isInBrowserEnv())
  fetch('/api/system')
    .then((response) => response.json())
    .then((data) => console.log('debug: some system info: ', data))
    .catch((err) => console.warn('debug: error fetching system info: ', err));

const demoBoardId = process.env.NEXT_PUBLIC_DEMOBOARD_ID;

export default function Index() {
  trackPage('Index');

  return (
    <FullVerticalContainer data-cy="home-container">
      <Container maxW="933px">
        <Heading as="h1">
          <Image src={coolBoardLogo} width="100" alt="logo" />
          Welcome to CoolBoard
          <br />
          <span> manage your tasks in a kanban style</span>
        </Heading>
        <Segment>
          <Text>
            After creating an account, you will be able to create your own
            <Link href="/boards">boards</Link>
          </Text>
        </Segment>

        <DemoBoardSegment />

        <Segment>
          <Text mb="1rem">
            This is the demo of the app which we built in this video course:
          </Text>
          <Heading
            as="h3"
            fontSize="2xl"
            mt="calc(2rem - 0.142857em)"
            mb="1rem">
            <a href="https://www.packtpub.com/product/hands-on-application-building-with-graphql-video/9781788991865">
              <Icon>
                <FaFilm />
              </Icon>{' '}
              <b>Hands-on Application building with GraphQL and React</b>{' '}
              <Icon>
                <FaChalkboardTeacher />
              </Icon>
            </a>
          </Heading>
          <Flex
            flexDir="row"
            alignItems="center"
            justifyContent={'flex-start'}
            gap={'0.5rem'}>
            <strong>Available</strong> at
            <a href="https://www.packtpub.com/product/hands-on-application-building-with-graphql-video/9781788991865">
              <Image
                style={{ display: 'inline', verticalAlign: 'baseline' }}
                src="/packt-logo.svg"
                height={24}
                width={80}
                alt="packt publishing"
              />
            </a>
            or
            <a href="https://www.udemy.com/course/hands-on-application-development-with-graphql-3-in-1/">
              <Image
                style={{ display: 'inline', verticalAlign: 'bottom' }}
                src="/logo-udemy.svg"
                height={24}
                width={80}
                alt="udemy"
              />
            </a>
            or Safari online, etc.
          </Flex>
        </Segment>
        <Segment>
          There are more
          <Link href="/about">
            {' '}
            <Icon>
              <FaLink />
            </Icon>
            details about
          </Link>{' '}
          this app.
        </Segment>
      </Container>
    </FullVerticalContainer>
  );
}

function DemoBoardSegment() {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  useEffect(() => {
    if (demoBoardId) setClient(setupGraphQLClient(true));
  }, []);
  return (
    <Segment className="zoomOnHover demoBoard">
      {demoBoardId && (
        <Text>Live Preview of the the current work and planned features:</Text>
      )}
      {demoBoardId && client && (
        <ApolloProvider client={client}>
          <DndProvider backend={HTML5Backend}>
            <Suspense fallback={<div>Loading Board</div>}>
              <Board boardId={demoBoardId} readonly />
            </Suspense>
          </DndProvider>
        </ApolloProvider>
      )}
      {!demoBoardId && (
        <Link href="/boards">
          <Image
            src={screenshot}
            placeholder="blur"
            width="1099"
            alt="screenshot"
          />
        </Link>
      )}
    </Segment>
  );
}
