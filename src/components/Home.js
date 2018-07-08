import React, { Component } from 'react';

import {
  Container,
  Segment,
  Icon,
  Image,
} from 'semantic-ui-react';

import { Link } from 'react-router-dom';

import { FullVerticalContainer } from './FullVerticalContainer';

export default class Home extends Component {
  render() {
    return (
      <FullVerticalContainer>
        <Container
          style={{
            textAlign: 'left',
          }}>
          <h1>
            <Image bordered src="/CoolBoardLogo.png" width="100px" circular inline/>
            Welcome to CoolBoard </h1>
          <Segment basic>
            <h2>How to get started?</h2>
            <p>
              Just
              <Link to="/login">
                <Icon size="big" name="sign in"/>sign in here
              </Link>
              and create
              <Link to="/boards">
                <Icon size="big" name="list"/>your Boards
              </Link>
              and manage tasks together with others in real time!
            </p>
          </Segment>
          <Segment basic>

            <h2>Screenshot</h2>

            <Image bordered src="/screenshot.png"/>

          </Segment>

          <Segment basic>
            <p>
              <Icon name="video camera" size="large" />
              In this Course with more than 6 hours you
              can learn how to build this whole
              application step-by-step.
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
                <b>Soon</b> available on
                <Image
                  spaced
                  inline
                  src={packLogo}
                  height={24}
                  style={{ verticalAlign: 'bottom' }}
                />
              </a>!
            </p>
            <Icon name="twitter" size="large" />
            Follow{' '}
            <a href="https://www.twitter.com/rhosts">
              me on twitter
            </a>{' '}
            for updates if you want.
          </Segment>

          <p>
            <Link to="/about">
              <Icon name="linkify" /> About this app,
              more details.
            </Link>
          </p>
        </Container>
      </FullVerticalContainer>
    );
  }
}
