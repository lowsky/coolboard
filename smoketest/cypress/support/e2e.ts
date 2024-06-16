// load type definitions that come with Cypress module
/// <reference types="cypress" />

// Must be declared global to be detected by typescript (allows import/export)
// eslint-disable @typescript/interface-name
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom command to select the DOM element by data-cy attribute.
       * @example cy.dataCy('greeting') finds  <div data-cy="greeting">
       */
      dataCy(
        selector: string,
        options?: Partial<Loggable & Timeoutable>
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to do the authentication via logging-in in UI
       *
       * @example cy.login('login', 'passwd')
       */
      login(user: string, password: string): void;
    }
  }
}

Cypress.Commands.add('login', (username, password): void => {
  login(username, password);
});

Cypress.Commands.add('dataCy', (selector, options) =>
  cy.get(`[data-cy="${selector}"]`, options)
);

// This is catching this exception to avoid failing test:
//
// While we have a failing fetch request (because of expired, short living
// clerk auth session cookie)
Cypress.on('uncaught:exception', (error, runnable, promise) => {
  if (promise) {
    return false;
  }
});

const graphqlQuery = `
query CardList($cardListId: ID!) {
  list(where: {id: $cardListId} ) {
    id name __typename
  }
}`;

export const login = (
  userLogin: string,
  password: string
): Cypress.Chainable<null> =>
  cy.session(
    'coolboardSessionId',
    () => {
      cy.visit('/boards', {
        // ignore any error (while not authenticated)
        failOnStatusCode: false,
      });

      // this was only needed, when /boards was
      // a public page:
      // ....contains('Log in', { log: true, timeout: 6000, }).first().click();
      // ... could be deleted soon, if not needed anymore?

      fillLoginForm(userLogin, password);
      cy.location('pathname').should('eq', '/boards');
    },
    {
      validate: () => {
        {
          const someAPIgraphqlQuery = {
            operationName: 'CardList',
            variables: { cardListId: 'clsq1w75z0002gnafx71y3v8d' },
            query: graphqlQuery,
          };
          cy.request({
            body: someAPIgraphqlQuery,
            method: 'POST',
            url: '/api/graphql',
          });
        }
      },
      cacheAcrossSpecs: true,
    }
  );

export const isProduction =
  Cypress.config().baseUrl === 'https://www.coolboard.fun';

const credPrefix = isProduction ? 'PRODUCTION_' : '';
export const userLogin = Cypress.env(credPrefix + 'LOGIN');
export const password = Cypress.env(credPrefix + 'PASSWORD');

export const LogAndWaitLong = {
  log: true,
  timeout: 8000,
};

export const WaitVeryLong = {
  log: true,
  timeout: 5000 * 4,
};

function fillLoginForm(userLogin: string, password: string): void {
  cy.get('#identifier-field', LogAndWaitLong).type(userLogin + '{enter}');
  cy.contains('Enter your password');
  cy.get('#password-field').type(password + '{enter}', {
    log: false,
  });
}
