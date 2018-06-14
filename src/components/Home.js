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
              In this Course with >6 hours <Icon
              name="video camera"
              size="large"
            />
              you can learn how to build this whole application step-by-step.
            </p>
            <p>
              <b>
                Hands-on Application building with GraphQL
                and React
              </b>
            </p>

            <p>
              <b>soon</b> available on
              <a href="https://packtpub.com">Packt</a>!
            </p>

            Follow <a href="https://www.twitter.com/rhosts">me on twitter <Icon
            name="twitter"
            size="large"
          /></a> for updates if you want.

          </Segment>

          <p>
            <Link to="/about">Some more details</Link> about this app.
          </p>
        </Container>
      </FullVerticalContainer>
    );
  }
}
