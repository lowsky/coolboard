// load type definitions that come with Cypress module
/// <reference types="cypress" />

// Must be declared global to be detected by typescript (allows import/export)
// eslint-disable @typescript/interface-name
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom command to select DOM element by data-cy attribute.
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

// Convert this to a module instead of script (allows import/export)
export {};

export const branch = Cypress.env('branch') ?? 'missing-branch-env';
// Cypress.env() will show any env, which had been set with cypress_ prefix
// https://docs.cypress.io/guides/guides/environment-variables#Option-3-CYPRESS_

export const isMainBranch = 'main' === branch;

// needs prefix when set per env: CYPRESS_LOGIN
export const userLogin = isMainBranch
  ? Cypress.env('MAIN_LOGIN')
  : Cypress.env('LOGIN') ?? Cypress.env('LOGIN');
// needs prefix when set per env: CYPRESS_USER_PASSWORD
export const password = isMainBranch
  ? Cypress.env('MAIN_PASSWORD')
  : Cypress.env('PASSWORD') ?? Cypress.env('USER_PASSWORD');

// will be set by cypress.json, or via env: CYPRESS_baseUrl
export const baseUrl = isMainBranch
  ? 'https://www.coolboard.fun'
  : Cypress.config('baseUrl') ?? 'missing env CYPRESS_baseUrl';

export const LogAndWaitLong = {
  log: true,
  timeout: 8000,
};

function fillLoginForm(
  userLogin: string,
  password: string
): Cypress.Chainable<string> {
  cy.get('#identifier-field', LogAndWaitLong).type(userLogin + '{enter}');
  cy.contains('Enter your password', {
    log: true,
    timeout: 6000,
  });
  cy.get('#password-field').type(password + '{enter}', {
    log: false,
  });

  // helps to wait for authentication process of redirecting with to the /callback url
  return cy
    .wait(1000) //
    .url(LogAndWaitLong);
}

export const login = (
  userLogin: string,
  password: string
): Cypress.Chainable<string> => {
  cy.visit(baseUrl + '/boards')
    .contains('Log in', {
      log: true,
      timeout: 6000,
    })
    .first()
    .click();
  return fillLoginForm(userLogin, password);
};

export const WaitVeryLong = {
  log: true,
  timeout: 5000 * 4,
};
