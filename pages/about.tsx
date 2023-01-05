import React from 'react';
import { Box, Container, Heading, Icon, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { FaSignInAlt, FaFilm } from 'react-icons/fa';

import FullPageWithApollo from '../src/common/FullPageWithApollo';
import { ProfileHeader } from '../src/common/ProfileHeader';

export default function About() {
  return (
    <FullPageWithApollo data-cy="about-full-container">
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
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/sign-in/sign-in">
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
          <Text>
            GraphQL database powered by{' '}
            <Link
              href="https://www.prisma.io/"
              referrerPolicy="no-referrer"
              isExternal>
              Prisma
            </Link>
          </Text>
          <Text>
            GraphQL trello server running as{' '}
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
            frontend with{' '}
            <Link
              href="https://www.apollographql.com/apollo-client"
              referrerPolicy="no-referrer"
              isExternal>
              Apollo
            </Link>{' '}
            served by
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
              We are using the service of
              <Link
                href="https://clerk.dev/"
                referrerPolicy="no-referrer"
                isExternal>
                clerk
              </Link>
              to allow signing-in via OAuth using Google or email/password
              automatically.
            </Text>
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
    </FullPageWithApollo>
  );
}
