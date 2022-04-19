/* eslint-disable no-undef */
/// <reference types="Cypress" />

import Loggable = Cypress.Loggable;
import Timeoutable = Cypress.Timeoutable;

const auth0LockInputEmail =
  'div > div > .auth0-lock-input-email > .auth0-lock-input-wrap > .auth0-lock-input';
const auth0LockInputPassword =
  'div > div > .auth0-lock-input-password > .auth0-lock-input-wrap > .auth0-lock-input';

// needs prefix when set per env: CYPRESS_USER_PASSWORD
const password = Cypress.env('USER_PASSWORD');

// will be set by cypress.json, or via env: CYPRESS_baseUrl
const baseUrl = Cypress.config('baseUrl') ?? 'missing env CYPRESS_baseUrl';
// will be set by cypress.json, or via env: CYPRESS_branch
const branch = Cypress.env('branch') || 'missing-CYPRESS_branch-env';

const newBoardName = branch;

before(() => {
  assert(
    baseUrl.endsWith('localhost:8888') ||
      baseUrl.endsWith('localhost:3000') ||
      baseUrl.endsWith('coolboard.netlify.app') ||
      baseUrl.startsWith('https://localhost') ||
      (baseUrl.startsWith('https://coolboard-') &&
        baseUrl.endsWith('.vercel.app')) ||
      baseUrl.endsWith('coolboard.fun'),
    `Check: Domain should be one of: ' +
     localhost:3000 |localhost:8888 | coolboard.fun | coolboard.netlify.app , but not:
      ${baseUrl}`
  );
  cy.log(`Testing site on this base url: ${baseUrl}`);
  cy.log('Testing project git branch: ' + branch);

  assert(branch, 'CYPRESS_branch env var was not set');
  assert(password, 'CYPRESS_USER_PASSWORD env var was not set');
  cy.clearCookies();
  cy.clearLocalStorage();
});

beforeEach(() => {});

const gotoBoards = () =>
  cy
    .visit(baseUrl + '/boards')
    .url()
    .should('include', 'boards');

const clickLogin = () =>
  cy
    .contains('Log in', {
      log: true,
      timeout: 6000,
    })
    .first()
    .click();

const _boardListContainer = () => cy.dataCy('board-container-inner');

const cardListButtons = () => _boardListContainer().find('button');

const add_a_list = () => cardListButtons().contains('Add a list');

const sections = (options: Partial<Loggable & Timeoutable>) =>
  cy.dataCy('card-list', options);

const add_a_card = () => cardListButtons().contains('Add a card');

function fillLoginForm() {
  cy.get(auth0LockInputEmail, LogAndWaitLong).type('skylab@nurfuerspam.de');
  cy.get(auth0LockInputPassword).type(password, {
    log: false,
  });

  cy.get('button.auth0-lock-submit').click();

  // helps to wait for auth0 process of redirecting with to the /callback url
  return cy
    .wait(1000)
    .url(LogAndWaitLong)
    .should('not.include', 'callback')
    .should('equal', baseUrl + '/boards')
    .wait(2000);
}
function fillLoginFormNew() {
  cy.get('#username').clear();
  cy.get('#username').type('skylab@nurfuerspam.de');
  cy.get('#password').click();
  cy.get('#password').clear();
  cy.get('#password').type(password + '{enter}', {
    log: false,
  });

  // helps to wait for auth0 process of redirecting with to the /callback url
  return cy
    .wait(1000)
    .url(LogAndWaitLong)
    .should('not.include', 'callback')
    .should('equal', baseUrl + '/boards')
    .wait(2000);
}

function doLogin() {
  gotoBoards();
  clickLogin();
  // Classic auth0 login
  fillLoginForm();
  // New, modern auth0 login
  // ... fillLoginFormNew();
}

const getBoardsList = () => {
  cy.dataCy('full-container').dataCy('boards-list').first();

  return cy
    .dataCy('full-container')
    .dataCy('boards-list', WaitVeryLong)
    .should('exist')
    .find('a', WaitVeryLong);
};

const getBoardsList_FirstEntry = (name: string) =>
  getBoardsList().contains(name).first();

let LogAndWaitLong = {
  log: true,
  timeout: 8000,
};
let WaitVeryLong = {
  log: true,
  timeout: 5000 * 4,
};

describe('Test coolboard', () => {
  it('need to login to show boards', () => {
    doLogin();
    // gotoBoards();
  });

  it('user can create a board for branch', () => {
    gotoBoards();

    getBoardsList().then((boards) =>
      cy
        .log(String(boards))
        .log(String(boards.length))
        .get('.basic > .ui')
        .last()
        .click()
        .get('input')
        .type(newBoardName)
        .get('.green')
        .click()
    );
    cy.get('.modal').should('not.exist'); // just wait a little until the mutation was done

    getBoardsList_FirstEntry(newBoardName);
  });

  it('user can add lists and cards after login', () => {
    gotoBoards();

    // open first board named XXX
    getBoardsList_FirstEntry(newBoardName).click();

    cy.url().should('include', 'board/');

    // clear all lists:

    cy.dataCy('board-header-menu').first().click();

    cy.get('button', LogAndWaitLong).contains('Delete All').click();
    cy.get('button', LogAndWaitLong).contains('This will be permanent').click();

    sections(LogAndWaitLong).should('not.exist');

    //add card
    add_a_list().click();

    cy.wait(2000);
    sections(LogAndWaitLong).should('have.length', 1);

    add_a_card().click();

    cy.dataCy('card', WaitVeryLong).contains('new card').click();

    // edit card
    cy.log('edit card');
    cy.get('.modal').get('input').type('name-changed');
    cy.get('.modal').find('.button').contains('Save').click().wait(1500);

    cy.log('wait until dialog closes');
    cy.get('.modal', WaitVeryLong).should('not.exist');

    cy.log('add a list');
    add_a_list().click();

    cy.log('delete first list');
    sections(LogAndWaitLong)
      .dataCy('card-list-header')
      .dataCy('card-list-header-menu')
      .first()
      .click();

    cy.log('add a list');
    add_a_list().click();

    cy.log('delete first list');
    sections(LogAndWaitLong)
      .dataCy('card-list-header')
      .dataCy('card-list-header-menu')
      .first()
      .click();
    cy.get('.ui > .button > .trash').first().click();
  });

  it('user can delete board', () => {
    gotoBoards();

    // open first board named XXX
    getBoardsList_FirstEntry(newBoardName)
      .parent()
      .find('.button > .trash')
      .click();
    getBoardsList_FirstEntry(newBoardName).should('not.exist');

    // logout
    cy.get('[data-cy=profile-header]').contains('Logout').click();
  });
});

export {};
