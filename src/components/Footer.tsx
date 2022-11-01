import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  LinkBox,
  LinkOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';

import netlifyLogo from './netlify-logo.svg';
import nextLogo from './nextjs-logo.svg';
import prismaLogo from './prisma-logo.svg';

import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={'ui fluid container ' + styles.footer}>
      <div className={styles.row}>
        <span>Powered by</span>
        <Image height={20} width={20} src={prismaLogo} alt="prisma logo" />
        <span>Prisma, GraphQL, Apollo, </span>
        <Image height={20} width={20} src={netlifyLogo} alt="netlify logo" />
        <span>Netlify and</span>
        <Image height={20} src={nextLogo} alt="Nextjs logo" />
        <div>
          <Link href="/imprint">Imprint</Link>{' '}
          <Link href="/privacy">Privacy</Link>{' '}
          <a href="mailto:coolboard@protonmail.com">
            <i className="icon mail" />
            Support
          </a>{' '}
          <a href="https://twitter.com/rhosts" target="_blank" rel="noreferrer">
            <i className="icon twitter" />
          </a>{' '}
          <Popover>
            <PopoverTrigger>
              <i className="icon github" />
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
                      Please, drop me a message!
                    </LinkOverlay>
                  </LinkBox>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        </div>
      </div>
    </footer>
  );
}
