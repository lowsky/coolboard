import React, { Component } from 'react';

import {
  Container,
  Segment,
  Icon,
} from 'semantic-ui-react';

import { Link } from 'react-router-dom';

import { FullVerticalContainer } from './FullVerticalContainer';
import { ProfileHeader } from './ProfileHeader';

export default class About extends Component {
  render() {
    return (
      <FullVerticalContainer>
        <ProfileHeader />
        <Container
          style={{
            textAlign: 'left',
          }}>
          <h1>Welcome to CoolBoard</h1>
          <p>
            This is the Live Demo of the full
            application which we build in this
            <Icon
              name="video camera"
              size="large"
            />Video Course:
          </p>
          <b>
            Hands-on Application building with GraphQL
            and React
          </b>
          <p>
            <b>Soon to be published</b> on{' '}
            <a href="https://packtpub.com">Packt</a> !
          </p>
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
              <Link to="/login">Log-in</Link>.
            </p>
            <p>
              Then you can create and share a board
              (via its URL)
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
          <Segment basic>
            <h2>Credits / Copyright</h2>
            <p>
              The sources are shared by Packt
              Publishing on github.
            </p>
            <p>The logo and favicon was based on</p>
            <p>
              “Freezer Cold” icon by Creaticca Creative
              Agency from the Noun Project.
            </p>
            <p>
              “Browser” icon by Didzis Gruznovs from
              the Noun Project.
            </p>
          </Segment>
        </Container>
      </FullVerticalContainer>
    );
  }
}
