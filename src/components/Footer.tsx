import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  Container,
  Flex,
  Icon,
  LinkBox,
  LinkOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import { FaGithub, FaHeart, FaTwitter } from 'react-icons/fa';

// import netlifyLogo from './netlify-logo.svg';
import nextLogo from './nextjs-logo.svg';
import prismaLogo from './prisma-logo.svg';

export function Footer() {
  return (
    <Container as="footer" width="full" maxWidth="full" variant="footer">
      <Flex
        flexDir="row"
        alignItems="center"
        justifyContent="center"
        gap="1"
        flexWrap="wrap">
        Powered by
        <Image height={20} width={20} src={prismaLogo} alt="prisma logo" />
        Prisma, GraphQL, Apollo,
        {
          //<Image height={20} width={20} src={netlifyLogo} alt="netlify logo" />
          // Netlify
        }
        and
        <Image height={20} src={nextLogo} alt="Nextjs logo" />
        <Link href="/imprint">Imprint(de)</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="mailto:coolboard@protonmail.com">Support</Link>
        <a href="https://twitter.com/rhosts" target="_blank" rel="noreferrer">
          <FaTwitter />
        </a>
        <Popover>
          <PopoverTrigger>
            <span>
              <FaGithub />
            </span>
          </PopoverTrigger>
          <Portal>
            <PopoverContent background="white">
              <PopoverBody>
                <LinkBox maxW="sm" p="5" borderWidth="1px" rounded="md">
                  <LinkOverlay
                    color="#777"
                    href="https://twitter.com/rhosts"
                    target="_blank"
                    rel="noreferrer">
                    Interested?
                    <br />
                    <FaHeart color="red" />
                    You can drop me a message on Twitter{' '}
                    <Icon>
                      <FaTwitter />
                    </Icon>{' '}
                    by clicking this box.
                    <br />
                    Or just send me an email via <i>Support</i>.
                  </LinkOverlay>
                </LinkBox>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </Flex>
    </Container>
  );
}
