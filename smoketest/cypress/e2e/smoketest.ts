/* eslint-disable no-undef */
/// <reference types="Cypress" />

import Loggable = Cypress.Loggable;
import Timeoutable = Cypress.Timeoutable;

const CYPRESS_branch = Cypress.env('branch');

// Cypress.env() will show any env, which had been set with cypress_ prefix
// https://docs.cypress.io/guides/guides/environment-variables#Option-3-CYPRESS_
// @ts-ignore
const isMainBranch = 'main' === CYPRESS_branch;

// needs prefix when set per env: CYPRESS_LOGIN
const login = isMainBranch
  ? Cypress.env('MAIN_LOGIN')
  : Cypress.env('LOGIN') ?? Cypress.env('LOGIN');

// needs prefix when set per env: CYPRESS_USER_PASSWORD
const password = isMainBranch
  ? Cypress.env('MAIN_PASSWORD')
  : Cypress.env('PASSWORD') ?? Cypress.env('USER_PASSWORD');

// will be set by cypress.json, or via env: CYPRESS_baseUrl
const baseUrl = isMainBranch
  ? 'https://coolboard.fun'
  : Cypress.config('baseUrl') ?? 'missing env CYPRESS_baseUrl';
// will be set by cypress.json, or via env: CYPRESS_branch
const branch = CYPRESS_branch || 'missing-CYPRESS_branch-env';

const newBoardName = branch;

before(() => {
  Cypress.Cookies.debug(true); // now Cypress will log when it alters cookies

  cy.log('Testing project git branch is main ?' + isMainBranch);
  cy.log('Testing project git branch: ' + branch);
  cy.log(`Testing site on this base url: ${baseUrl}`).then(() => {
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

    assert(branch, 'branch cypress env var was not set');
    assert(password, 'USER_PASSWORD cypress env var was not set');
  });
  cy.clearCookies();
  cy.clearLocalStorage();
});

const gotoBoards = () => {
  return cy
    .visit(baseUrl + '/boards')
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
  cy.get('#identifier-field', LogAndWaitLong).type(login + '{enter}');
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

const getBoardsList = () => {
  cy.dataCy('full-container').dataCy('boards-list', WaitVeryLong).first();

  return cy
    .dataCy('full-container')
    .dataCy('boards-list', WaitVeryLong)
    .should('exist')
    //.find('[data-cy="board-list-item"]', WaitVeryLong);
};

const getBoardsList_FirstEntry = (name: string) => {
  cy.dataCy('full-container').dataCy('boards-list').first();

  return cy
    .dataCy('full-container')
    .dataCy('boards-list', WaitVeryLong)
    .should('exist')
    .find('[data-cy="board-list-item_'+name+'"]').first();
};

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

    getBoardsList().then((boards) => cy.log(String(boards.length + ' boards')));
    cy.dataCy('create-board-dialog').click();
    cy.get('#name').clear();
    cy.get('#name').type(newBoardName);
    cy.dataCy('create-board-submit').click();
    cy.log('wait until dialog closes');
    cy.get('.chakra-modal__content-container', WaitVeryLong).should(
      'not.exist'
    );

    getBoardsList_FirstEntry(newBoardName);
  });

  it('user can add lists and cards', () => {
    gotoBoards();

    // open first board named XXX
    getBoardsList_FirstEntry(newBoardName).click();
    cy.url(LogAndWaitLong).should('include', 'board/');

    //fully loaded?
    cy.get('.chakra-heading', LogAndWaitLong).contains(newBoardName);

    // clear all lists:
    cy.dataCy('board-header-menu').first().click();

    cy.get('button').contains('Delete All').click();
    cy.get('button').contains('This will be permanent').click();

    sections(LogAndWaitLong).should('not.exist');
    //add card
    add_a_list().click();

    sections(LogAndWaitLong).should('have.length', 1);
    add_a_card().click();
    cy.dataCy('card', WaitVeryLong).contains('new card').click();

    // edit card
    cy.log('edit card');
    cy.get('.chakra-modal__content-container')
      .get('#title')
      .type('name-changed');
    cy.get('.chakra-modal__content-container')
      .find('.chakra-button')
      .contains('Save')
      .click()
      .wait(1500);
    cy.log('wait until dialog closes');
    cy.get('.chakra-modal__content-container', WaitVeryLong).should(
      'not.exist'
    );

    cy.log('add a new list');
    add_a_list().click();
    sections(LogAndWaitLong).should('have.length', 2);
  });

  it('user can delete lists', () => {
    gotoBoards();

    // open first board named XXX
    getBoardsList_FirstEntry(newBoardName).click();
    cy.url(LogAndWaitLong).should('include', 'board/');

    cy.log('delete first list');
    sections(LogAndWaitLong)
      .dataCy('card-list-header')
      .dataCy('card-list-header-menu')
      .first()
      .click();
    cy.get('button').contains('delete list').click();
  });

  it('user can delete board', () => {
    gotoBoards();

    getBoardsList_FirstEntry(newBoardName).then(()=>
      cy.reload()
    )

    // open first board named XXX
    getBoardsList_FirstEntry(newBoardName)
      .within(() => {
        cy.get('[data-cy="delete-board"]').click();
      })
      .then(() => {
        getBoardsList()
          .contains(newBoardName)
          .should('not.exist');
      });
  });

  it('user can log-out', () => {
    gotoBoards();

    cy.get('[data-cy=profile-header]').contains('Sign Out').click();
  });
});
