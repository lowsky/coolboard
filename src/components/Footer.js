import Image from "next/image";
import Link from "next/link";
import { Button, Popup } from "semantic-ui-react";

import coolboardLogo from "./CoolBoardLogo.png";
import netlifyLogo from "./netlify-logo.svg";
import nextLogo from "./nextjs-logo.svg";
import prismaLogo from "./prisma-logo.svg";

export function Footer() {
  return <footer id="footer" className="ui fluid container" style={{}}>
    <p style={{
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "flex-end"
    }}>
      <span style={{ color: "black" }}>
        <Image height={20} width={20} src={coolboardLogo}/> Coolboard, powered by
        {' '}
        <Image height={20} width={20} src={prismaLogo}/> Prisma,GraphQL, Apollo, React.js,
        {' '}
        <Image height={20} width={20} src={netlifyLogo}/> Netlify and
        {' '}
        <Image height={20} width={40} src={nextLogo}/>
      </span>

      <div>
        <Link href="/imprint">
          <a>Imprint</a>
        </Link>
        {' '}
        <Link href="/privacy">
          <a>Privacy</a>
        </Link>
        {' '}
        <a href="mailto:coolboard@protonmail.com"><i className="icon mail"> Mail</i></a>
        <a href="https://twitter.com/rhosts"><i className="icon twitter"> Twitter</i></a>
        {' '}
        <Popup
          style={{ cursor: "pointer" }}
          content={
            <Button>
              Interested?
              <br/>
              ♥️ Please, drop me a message!
            </Button>
          }
          on='click'
          trigger={<span><i className="icon github black"/>&nbsp;Sources</span>}
        />
      </div>
    </p>
  </footer>;
}
