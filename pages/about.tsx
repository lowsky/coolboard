import React from 'react';
import { Box, Container, Heading, Icon, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { FaSignInAlt, FaFilm } from 'react-icons/fa';

import { FullVerticalContainer } from 'common/FullVerticalContainer';
import { ProfileHeader } from 'common/ProfileHeader';

export default function About() {
  return (
    <FullVerticalContainer data-cy="full-container">
      <ProfileHeader />
      <Container maxW="700px">
        <section>
          <Heading as="h2">Welcome to CoolBoard</Heading>
          <Text>
            This is the Live Demo of the full application which we build in this{' '}
            <Icon>
              <FaFilm size="small" />
            </Icon>
            <Link
              href="https://www.packtpub.com/product/hands-on-application-building-with-graphql-video/9781788991865"
              referrerPolicy="no-referrer"
              isExternal>
              Video Course
            </Link>
          </Text>
          <Text>
            <Link
              href="https://www.packtpub.com/product/hands-on-application-building-with-graphql-video/9781788991865"
              referrerPolicy="no-referrer"
              isExternal>
              <Image
                src="/packt-page-v141.png"
                width={473}
                height={141}
                alt="Packt Publishing logo"
              />
            </Link>
          </Text>
          <Text>
            <strong>Published</strong> on{' '}
            <Link
              href="https://www.packtpub.com/product/hands-on-application-building-with-graphql-video/9781788991865"
              referrerPolicy="no-referrer"
              isExternal>
              <Image
                src="/packt-logo.svg"
                width={115}
                height={32}
                alt="Packt Publishing logo"
              />
            </Link>
          </Text>
        </section>
        <section>
          <Heading as="h2">What is it?</Heading>
          <Text>
            It is a{' '}
            <Link
              href="https://en.wikipedia.org/wiki/Kanban_(development)"
              referrerPolicy="no-referrer"
              isExternal>
              Kanban
            </Link>{' '}
            Board, where you can share tasks
          </Text>
          <Text>and organise them together with real time updates.</Text>
        </section>
        <section>
          <Heading as="h2">How does it work?</Heading>
          <Text>
            You will need to Sign-up via email and{' '}
            <a href="/sign-in">
              <Icon>
                <FaSignInAlt />
              </Icon>
              authenticate here
            </a>
          </Text>
          <Text>Then you can create and share a board (via its URL)</Text>
        </section>
        <section>
          <Heading as="h2">What technology is used?</Heading>
          <Text>local database powered by InstantDB</Text>
          <Text>
            Trello server running as{' '}
            <Link
              href="https://vercel.com/docs/concepts/functions/serverless-functions/"
              referrerPolicy="no-referrer"
              isExternal>
              serverless functions on Vercel
            </Link>
          </Text>
          <Text>
            <Link
              href="https://www.react.org/"
              referrerPolicy="no-referrer"
              isExternal>
              React
            </Link>
            frontend served by
            <Link
              href="https://vercel.com/"
              referrerPolicy="no-referrer"
              isExternal>
              Vercel
            </Link>
          </Text>
        </section>
        <section>
          <Heading>How to sign-in?</Heading>
          <Box
            border={'solid 1px grey'}
            style={{
              textAlign: 'left',
              padding: '8px',
            }}>
            <Text>
              <strong>About Privacy:</strong>
              <br />
              We will use your account information for authenticating and
              storing your boards under your account.
              <br />
              We might rarely send any emails for notifying about changes
              related to providing this service (e.g. news, any case of outage
              or maintenance time) or updated to this.
            </Text>
          </Box>
        </section>
        <section>
          <Heading>Credits / Copyright</Heading>
          <Text>The logo and favicon was based on</Text>
          <Text>
            “Freezer Cold” icon by Creaticca Creative Agency from the Noun
            Project.
          </Text>
          <Text>“Browser” icon by Didzis Gruznovs from the Noun Project.</Text>
        </section>
      </Container>
    </FullVerticalContainer>
  );
}
