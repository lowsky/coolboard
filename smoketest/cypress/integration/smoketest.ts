/* eslint-disable no-undef */
/// <reference types="Cypress" />

import Loggable = Cypress.Loggable;
import Timeoutable = Cypress.Timeoutable;

// needs prefix when set per env: CYPRESS_LOGIN
const login = Cypress.env('CYPRESS_LOGIN') ?? Cypress.env('LOGIN');

// needs prefix when set per env: CYPRESS_USER_PASSWORD
const password =
  Cypress.env('CYPRESS_PASSWORD') ??
  Cypress.env('PASSWORD') ??
  Cypress.env('CYPRESS_USER_PASSWORD') ??
  Cypress.env('USER_PASSWORD');

// will be set by cypress.json, or via env: CYPRESS_baseUrl
const baseUrl = Cypress.config('baseUrl') ?? 'missing env CYPRESS_baseUrl';
// will be set by cypress.json, or via env: CYPRESS_branch
const branch = Cypress.env('branch') || 'missing-CYPRESS_branch-env';

const newBoardName = branch;

before(() => {
  Cypress.Cookies.debug(true); // now Cypress will log when it alters cookies

  assert(
    baseUrl.endsWith('localhost:8888') ||
      baseUrl.endsWith('localhost:3000') ||
      baseUrl.endsWith('coolboard.netlify.app') ||
      baseUrl.startsWith('https://localhost') ||
      baseUrl.startsWith(
        'https://hands-on-application-building-with-graph-ql-and-reac'
      ) ||
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

const gotoBoards = () => {
  return cy
    .visit(baseUrl + "/boards")
    .url()
    .should('include', 'boards');
};

const clickLogin = () => {
  return cy
    .contains('Log in', {
      log: true,
      timeout: 6000,
    })
    .first()
    .click();
};

const _boardListContainer = () => cy.dataCy('board-container-inner');

const cardListButtons = () => _boardListContainer().find('button');

const add_a_list = () => cardListButtons().contains('Add a list');

const sections = (options: Partial<Loggable & Timeoutable>) =>
  cy.dataCy('card-list', options);

const add_a_card = () => cardListButtons().contains('Add a card');

function fillLoginForm() {
  cy.get('#text-field-identifier', LogAndWaitLong).type(login + '{enter}');
  cy.contains('Welcome, ', {
    log: true,
    timeout: 6000,
  });
  cy.get('#password').type(password + '{enter}', {
    log: false,
  });

  // helps to wait for authentication process of redirecting with to the /callback url
  return cy
      .wait(1000)
      .url(LogAndWaitLong)
      .should('not.include', 'callback')
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

const getBoardsList = () => {
  cy.dataCy('full-container').dataCy('boards-list', WaitVeryLong).first();

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

// if you want to debug when any test fails
// You likely want to put this in a support file,
// or at the top of an individual spec file
Cypress.on('uncaught:exception', (error, runnable, promise) => {
  if (promise) {
    return false;
  }
});

describe('Test coolboard', () => {
  it('need to login to show boards', () => {
    gotoBoards();
    clickLogin();
    fillLoginForm();
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
  });

  it('user can log-out', () => {
    gotoBoards();

    cy.get('[data-cy=profile-header]').contains('Sign Out').click();
  });
});
