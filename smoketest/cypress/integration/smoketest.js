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
    .wait(2000);
}

function doLogin() {
  gotoBoards();
  clickLogin();
  return fillLoginForm();
}

const getBoardsList = () =>
  cy
    .get('.App h1', LogAndWaitLong)
    .parent()
    .wait(2000) // wait a little longer
    .find('.fluid.container', LogAndWaitLong)
    .find('a', LogAndWaitLong);

const getBoardsList_FirstEntry = name =>
  getBoardsList()
    .contains(name)
    .first();

let LogAndWaitLong = {
  log: true,
  timeout: 13000,
};

describe('Test coolboard', () => {
  beforeEach(() => {
    doLogin();
  });

  it('need to login to show boards', () => {
    // 'then' still needed? doLogin().then(() => {
    gotoBoards();
    // } );
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
    getBoardsList_FirstEntry(newBoardName);
  });

  it('user can add lists and cards after login', () => {
    gotoBoards();

    // open first board named XXX
    getBoardsList_FirstEntry(newBoardName).click();

    // clear all lists:
    cy.get('button')
      .contains('Delete All')
      .click();

    sections(LogAndWaitLong).should('not.exist');

    //add card
    add_a_list().click();

    sections(LogAndWaitLong).should('have.length', 1);

    add_a_card().click();

    cy.get('[data-cy=card]')
      .contains('Card')
      .click();

    // edit card
    cy.log('edit card does not work yet');
    cy.get('.modal')
      .get('input')
      .type('name-changed');
    cy.get('.modal')
      .find('.button')
      .contains('Save')
      .click();

    add_a_list().click();

    cy.get(
      'div:nth-child(2) > div > div > div > .ui > .ellipsis'
    ).click();

    cy.get('.ui > .button > .trash')
      .first()
      .click();

    cy.get('.sc-bdVaJa > .ui > div > div > a').click();
  });

  it('user can delete board', () => {
    gotoBoards();

    // open first board named XXX
    getBoardsList_FirstEntry(newBoardName)
      .parent()
      .find('.button > .trash')
      .click()
      .wait(1500);

    getBoardsList_FirstEntry(newBoardName)
      .should('have.length', 0);
  });
});
