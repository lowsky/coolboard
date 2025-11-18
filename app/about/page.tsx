'use client';

import NextLink from 'next/link';
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FaSignInAlt, FaFilm } from 'react-icons/fa';

import { LuExternalLink } from 'react-icons/lu';

import FullPageWithApollo from 'common/FullPageWithApollo';
import { ProfileHeader } from 'common/ProfileHeader';

export default function Page() {
  return (
    <FullPageWithApollo data-cy="about-full-container">
      <ProfileHeader />
      <Container maxW="700px">
        <section>
          <Heading as="h2" size="2xl">
            Welcome to CoolBoard
          </Heading>
          <Text>
            This is the Live Demo of the full application which we build in this
            <Link
              variant="underline"
              colorPalette="teal"
              href="https://www.packtpub.com/product/hands-on-application-building-with-graphql-video/9781788991865"
              referrerPolicy="no-referrer">
              <Icon size="md">
                <FaFilm />
              </Icon>
              Video Course
              <LuExternalLink />
            </Link>
          </Text>
          <Center>
            <Link
              variant="underline"
              colorPalette="teal"
              href="https://www.packtpub.com/product/hands-on-application-building-with-graphql-video/9781788991865"
              referrerPolicy="no-referrer">
              <Image
                src="/packt-page-v141.png"
                width={473}
                height={141}
                alt="Packt Publishing logo"
              />
            </Link>
          </Center>
          <Flex alignItems="center" gap="1em" mb="1rem">
            <span>Published on </span>
            <Link
              variant="underline"
              colorPalette="teal"
              href="https://www.packtpub.com/product/hands-on-application-building-with-graphql-video/9781788991865"
              referrerPolicy="no-referrer">
              <Image
                src="/packt-logo.svg"
                width={115}
                height={32}
                alt="Packt Publishing logo"
              />
            </Link>
          </Flex>
        </section>
        <section>
          <Heading as="h2">What is it?</Heading>
          <Text>
            It is a{' '}
            <Link
              variant="underline"
              colorPalette="teal"
              href="https://en.wikipedia.org/wiki/Kanban_(development)"
              referrerPolicy="no-referrer">
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
            <Link variant="underline" colorPalette="teal" asChild>
              <NextLink href="/sign-in">
                <Icon>
                  <FaSignInAlt />
                </Icon>
                authenticate here
              </NextLink>
            </Link>
          </Text>
          <Text>Then you can create and share a board (via its URL)</Text>
        </section>
        <section>
          <Heading as="h2">What technology is used?</Heading>
          <Text>
            GraphQL database powered by{' '}
            <Link
              variant="underline"
              colorPalette="teal"
              href="https://www.prisma.io/"
              referrerPolicy="no-referrer">
              Prisma
            </Link>
          </Text>
          <Text>
            GraphQL trello server running as{' '}
            <Link
              variant="underline"
              colorPalette="teal"
              href="https://vercel.com/docs/concepts/functions/serverless-functions/"
              referrerPolicy="no-referrer">
              serverless functions on Vercel
              <LuExternalLink />
            </Link>
          </Text>
          <Text>
            <Link
              variant="underline"
              colorPalette="teal"
              href="https://www.react.org/"
              referrerPolicy="no-referrer">
              React <LuExternalLink />
            </Link>
            frontend with{' '}
            <Link
              variant="underline"
              colorPalette="teal"
              href="https://www.apollographql.com/apollo-client"
              referrerPolicy="no-referrer">
              Apollo <LuExternalLink />
            </Link>{' '}
            served by
            <Link
              variant="underline"
              colorPalette="teal"
              href="https://vercel.com/"
              referrerPolicy="no-referrer">
              Vercel <LuExternalLink />
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
                variant="underline"
                colorPalette="teal"
                href="https://clerk.dev/"
                referrerPolicy="no-referrer">
                clerk <LuExternalLink />
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
