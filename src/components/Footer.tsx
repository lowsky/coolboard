import Image from 'next/image';
import Link from 'next/link';
import { Popup } from 'semantic-ui-react';

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
          <Link href="/imprint">
            <a>Imprint</a>
          </Link>{' '}
          <Link href="/privacy">
            <a>Privacy</a>
          </Link>{' '}
          <a href="mailto:coolboard@protonmail.com">
            <i className="icon mail" />
            Support
          </a>{' '}
          <a href="https://twitter.com/rhosts" target="_blank" rel="noreferrer">
            <i className="icon twitter" />
          </a>{' '}
          <Popup
            style={{ cursor: 'pointer' }}
            content={
              <a
                href="https://twitter.com/rhosts"
                target="_blank"
                rel="noreferrer">
                Interested?
                <br />
                ♥️ Please, drop me a message!
              </a>
            }
            on="click"
            trigger={<i className="icon github" />}
          />
        </div>
      </div>
    </footer>
  );
}
