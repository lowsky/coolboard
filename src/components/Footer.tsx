import Image from "next/image";
import Link from "next/link";
import { Popup } from "semantic-ui-react";

import coolboardLogo from "./CoolBoardLogo.png";
import netlifyLogo from "./netlify-logo.svg";
import nextLogo from "./nextjs-logo.svg";
import prismaLogo from "./prisma-logo.svg";

import styles from "./Footer.module.css"

export function Footer() {
  return <footer className={"ui fluid container " + styles.footer}>
    <div className={styles.row}>
      <Image height={20} width={20} src={coolboardLogo}/> Coolboard, powered by
      <Image height={20} width={20} src={prismaLogo}/> Prisma, GraphQL, Apollo, React,
      <Image height={20} width={20} src={netlifyLogo}/> Netlify and
      <Image height={20} src={nextLogo} alt="Next.js"/>

      <span className={styles.spacer}/>

      <div>
        <Link href="/imprint"><a>Imprint</a></Link>
        {' '}
        <Link href="/privacy"><a>Privacy</a></Link>
        {' '}
        <a href="mailto:coolboard@protonmail.com"><i className="icon mail"/>Mail</a>
        {' '}
        <a href="https://twitter.com/rhosts" target="_blank" rel="noreferrer"><i className="icon twitter"/>Twitter</a>
        {' '}
        <Popup
          style={{ cursor: "pointer",
          }}
          content={
            <a href="https://twitter.com/rhosts" target="_blank" rel="noreferrer">
              Interested?
              <br/>
              ♥️ Please, drop me a message!
            </a>
          }
          on='click'
          trigger={<a href="https://www.github.com/lowsky" target="_blank" rel="noreferrer"><i className="icon github"/>Sources</a>}
        />
      </div>
    </div>
  </footer>;
}
