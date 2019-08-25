/* eslint-disable no-undef */
/// <reference types="Cypress" />

let auth0LockInputEmail =
  'div > div > .auth0-lock-input-email > .auth0-lock-input-wrap > .auth0-lock-input';
let auth0LockInputPassword =
  'div > div > .auth0-lock-input-password > .auth0-lock-input-wrap > .auth0-lock-input';

// needs prefix when set per env: CYPRESS_USER_PASSWORD
const password = Cypress.env('USER_PASSWORD');

// will be set by cypress.json, or via env: CYPRESS_baseUrl
const baseUrl = Cypress.config('baseUrl');
// will be set by cypress.json, or via env: CYPRESS_branch
const branch =
  Cypress.env('branch') ||
  'missing-CYPRESS_branch-env';

const newBoardName = branch;

before(() => {
  assert(
    baseUrl.endsWith('localhost:3000') ||
      baseUrl.endsWith('coolboard.netlify.com') ||
      baseUrl.endsWith('www.coolboard.fun'),
    `Check: Domain should be one of: ' +
     localhost:3000 | coolboard.fun | coolboard.netlify.com , but not: 
      ${baseUrl}`
  );
  cy.log(`Testing site on this base url: ${baseUrl}`);

  assert(branch, 'CYPRESS_branch env var was not set');
  cy.log('Testing project git branch: ' + branch);
});

const gotoBoards = () =>
  cy
    .visit(baseUrl + '/boards')
    .url()
    .should('include', 'boards');

const clickLogin = () =>
  cy
    .get('a[href="/login"]', {
      log: true,
      timeout: 12000,
    })
    .first()
    .click();

const _boardListContainer = () =>
  cy.get('[data-cy="board-container-inner"]');

const cardListButtons = () =>
  _boardListContainer().get('button');

const add_a_list = () =>
  cardListButtons().contains('Add a list');

const sections = options =>
  _boardListContainer(options).get(
    '[data-cy="card-list"]',
    options
  );

const add_a_card = () =>
  cardListButtons({
    log: true,
    timeout: 12000,
  }).contains('Add a card');

function fillLoginForm() {
  cy.get(auth0LockInputEmail).type(
    'skylab@nurfuerspam.de'
  );
  cy.get(auth0LockInputPassword).type(password, {
    log: false,
  });
  return cy
    .get('button.auth0-lock-submit')
    .click()

    .url(LogAndWaitLong)
    .url(LogAndWaitLong)
    .should('not.include', 'callback')
    .should('equal', baseUrl + '/')
    .wait(5000);
}

function doLogin() {
  gotoBoards();
  clickLogin();
  return fillLoginForm();
}

const getBoardsList = () =>
  cy
    .get('.App [data-cy=boards-list]', WaitVeryLong)
    .should('have.length', 1)
    .find('a', WaitVeryLong);

const getBoardsList_FirstEntry = name =>
  getBoardsList()
    .contains(name)
    .first()

let LogAndWaitLong = {
  log: false,
  timeout: 10000,
};
let WaitVeryLong = {
  ...LogAndWaitLong,
  log: true,
  timeout: 25000,
}

describe('Test coolboard', () => {
  beforeEach(() => {
    doLogin();
  });

  it('need to login to show boards', () => {
    gotoBoards();
  });

  it('user can create a board for branch', () => {
    gotoBoards();

    getBoardsList().then(boards =>
      cy
        .log(boards)
        .log(boards.length)
        .get('.basic > .ui')
        .click()
        .get('input')
        .type(newBoardName)
        .get('.green')
        .click()
    );
    cy.get(
      '.modal'
    ).should('not.exist');
    ; // just wait a little until the mutation was done

    getBoardsList_FirstEntry(newBoardName);
  });

  it('user can add lists and cards after login', () => {
    gotoBoards();

    // open first board named XXX
    getBoardsList_FirstEntry(newBoardName).click();

    // clear all lists:
    cy.get('button', LogAndWaitLong)
      .contains('Delete All')
      .click();

    sections(LogAndWaitLong).should('not.exist');

    //add card
    add_a_list().click();

    sections(LogAndWaitLong).should('have.length', 1);

    add_a_card().click();

    cy.get('[data-cy=card]', WaitVeryLong)
      .contains('new card')
      .click();

    // edit card
    cy.log('edit card does not work yet');
    cy.get('.modal')
      .get('input')
      .type('name-changed');
    cy.get('.modal')
      .find('.button')
      .contains('Save')
      .click()
      .wait(1500);

    cy.get(
      '.modal',
      WaitVeryLong

    ).should('not.exist');
    ; // just wait a little until the mutation was done

    cy.log('add a list');
    add_a_list().click();

    cy.log('delete first list');
    sections(LogAndWaitLong)
      .get('[data-cy=card-list] .CardList_header__x9UhR > .mini > .ellipsis')
      .first()
      .click();

    cy.log('add a list');
    add_a_list().click();

    cy.log('delete first list');
    sections(LogAndWaitLong)
      .get('[data-cy=card-list] .CardList_header__x9UhR > .mini > .ellipsis')
      .first()
      .click();
    cy.get('.ui > .button > .trash')
      .first()
      .click();

    // Later: if(headed) cy.pause();
    // logout
    cy.get('[data-cy=profil-header] > div > a').click();
  });

  it('user can delete board', () => {
    gotoBoards();

    // open first board named XXX
    getBoardsList_FirstEntry(newBoardName)
      .parent()
      .find('.button > .trash')
      .click()
      .wait(15000);
  });
});
