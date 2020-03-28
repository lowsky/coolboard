import React from 'react';

import {
  Container, Header,
  Icon,
  Segment,
} from 'semantic-ui-react';

import { Link } from 'react-router-dom';

import { FullVerticalContainer } from '../../common/FullVerticalContainer';
import { ProfileHeader } from '../../common/ProfileHeader';

import packLogo from '../../assets/packt-logo.svg';
import packLogoSmallPng from './packt-page-v141.png';
import { GeneralErrorHandler } from "../../common/GeneralErrorHandler";

export const About = () => (
  <FullVerticalContainer data-cy="about-full-container">
    <ProfileHeader />
    <GeneralErrorHandler />
    <Container text
      style={{
        textAlign: 'left',
      }}>
      <Segment>
      <Header as={"h2"}>Welcome to CoolBoard</Header>
      <p>
        This is the Live Demo of the full application
        which we build in this
        <a href="https://www.packtpub.com/web-development/hands-application-building-graphql-video">
          <Icon name="video camera" size="large" />
          Video Course:
        </a>
      </p>
      <p>
        <a href="https://www.packtpub.com/web-development/hands-application-building-graphql-video">
          <img
            src={packLogoSmallPng}
            height={141}
            alt="Packt Publishing logo"
          />
        </a>
      </p>
      <p>
        <b>Published</b> on{' '}
        <a href="https://www.packtpub.com/web-development/hands-application-building-graphql-video">
          <img
            src={packLogo}
            height={24}
            style={{ verticalAlign: 'bottom' }}
            alt="Packt Publishing logo"
          />
        </a>
      </p>
      </Segment>
      <Segment basic>
        <h2>What is it?</h2>
        <p>
          It is a{' '}
          <a href="https://en.wikipedia.org/wiki/Kanban_(development)">
            Kanban
          </a>{' '}
          Board, where you can share tasks
        </p>
        <p>
          and organise them together with real time
          updates.
        </p>
      </Segment>
      <Segment basic>
        <h2>How does it work?</h2>
        <p>
          You will need to Sign-up via email and{' '}
          <Link to="/login">
            <Icon size="big" name="sign in" />
            authenticate here
          </Link>
        </p>
        <p>
          Then you can create and share a board (via
          its URL)
        </p>
      </Segment>
      <Segment basic>
        <h2>What technology is used?</h2>
        <p>GraphQL database on prisma cloud</p>
        <p>GraphQL nodejs server as on zeit.co</p>
        <p>
          React frontend with Apollo served by
          netlify.com
        </p>
      </Segment>
      <Segment basic padded={true} raised={true} secondary={false}>
        <h2>How to sign-in?</h2>
        <Segment basic raised={true} secondary={true}
          style={{
            border: 'solid 1px grey',
            background: '#ddd',
            textAlign: 'left',
            padding: '8px',
          }}>
          <p>
            We are using the service of
            <a href="https://auth0.com/">Auth0</a>
            to allow signing-in via OAuth using
            Google/Twitter or email/password
            automatically.
          </p>
          <p>
            <b>About Privacy:</b>
            <br />
            We will use your account information for
            authenticating and storing your boards
            under your account.
            <br />
            We might rarely send any emails for
            notifying about changes related to
            providing this service (e.g. news, any case
            of outage or maintenance time) or updated
            to this.
          </p>
        </Segment>
      </Segment>
      <Segment basic>
        <h2>Credits / Copyright</h2>
        <p>
          The sources are shared by Packt Publishing on
          github.
        </p>
        <p>The logo and favicon was based on</p>
        <p>
          “Freezer Cold” icon by Creaticca Creative
          Agency from the Noun Project.
        </p>
        <p>
          “Browser” icon by Didzis Gruznovs from the
          Noun Project.
        </p>
      </Segment>
    </Container>
  </FullVerticalContainer>
);
