import React from 'react';

import { Container, Icon, Image, Segment, } from 'semantic-ui-react';

import { Link } from 'react-router-dom';

import { FullVerticalContainer } from '../../common/FullVerticalContainer';

import coolBoardLogo100 from './CoolBoardLogo100.png';
import packLogo from '../../assets/packt-logo.svg';

export default function Home() {
  return (
    <FullVerticalContainer data-cy="home-container">
      <Container
        style={{
          textAlign: 'left',
        }}>
        <h1>
          <Image
            bordered
            src={coolBoardLogo100}
            width="100px"
            circular
            inline
          />
          Welcome to CoolBoard{' '}
        </h1>
        <Segment basic>
          <h2>How to get started?</h2>
          <Segment raised={true} style={{background: 'red', color: 'white'}}>
            <h3>Creating a new account is currently not working</h3>
            <p>So, it only works for already registered accounts.</p>
          </Segment>

          <p>
            Just
            <Link to="/login">
              <Icon size="big" name="sign in" />
              <s>sign in here</s>
            </Link>
            and create
            <Link to="/boards">
              <Icon size="big" name="list" />
              your Boards
            </Link>
            and manage tasks together with others in
            real time!
          </p>
        </Segment>
        <Segment basic>
          <p>
            <Icon name="video camera" size="large" />
            This is the live Demo of the App built in
            this course:
          </p>
          <h3 style={{ textAlign: 'center' }}>
            <a href="https://www.packtpub.com/web-development/hands-application-building-graphql-video">
              <b>
                Hands-on Application building with
                GraphQL and React
              </b>
            </a>
          </h3>
          <p>
            <a href="https://www.packtpub.com/web-development/hands-application-building-graphql-video">
              <b>Available</b> at
              <Image
                spaced
                inline
                src={packLogo}
                height={24}
                style={{ verticalAlign: 'bottom' }}
              />
            </a>
          </p>
        </Segment>
        <Segment>
          <p>
            More
            <Link to="/about">
              <Icon name="linkify"/> details about
            </Link>
            this app
          </p>
        </Segment>

        <Segment basic>
          <h2>Screenshot</h2>

          <Image bordered src="/screenshot.png" />
        </Segment>
      </Container>
    </FullVerticalContainer>
  );
}
