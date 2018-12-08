/* eslint-disable no-undef */
/// <reference types="Cypress" />

// @ts-check

let auth0LockInputEmail =
  'div > div > .auth0-lock-input-email > .auth0-lock-input-wrap > .auth0-lock-input';
let auth0LockInputPassword =
  'div > div > .auth0-lock-input-password > .auth0-lock-input-wrap > .auth0-lock-input';

// needs prefix when set per env: CYPRESS_USER_PASSWORD
const password = Cypress.env('USER_PASSWORD');

// needs prefix when set per env: CYPRESS_TARGET_URL
let TargetUrl = 'https://deploy-preview-47--coolboard.netlify.com/' || Cypress.env('TARGET_URL');
// let TargetUrl = 'http://localhost:3000/';

const gotoBoards = () =>
  cy.visit(TargetUrl+ "boards")
    .url()
    .should('include', 'boards');

function clickLogin() {
  return cy
    .get('a[href="/login"]')
    .first()
    .click();
}

beforeEach(() => {
  console.clear();
  cy.clearLocalStorage();
  cy.clearCookies();
});

const boardListContainer = () => cy.get('[data-cy="board-container-inner"]');
const cardListButtons = () => boardListContainer().get('button');

const add_a_list = () => cardListButtons().contains('Add a list');

const sections = options => boardListContainer(options).get('[data-cy="card-list"]', options);

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
  return cy.get('#auth0-lock-container-1 > div > div.auth0-lock-center > form > div > div > button > span')
    .click()

    .url(LogAndWaitLong)
    //.should('include', 'callback')
    .url(LogAndWaitLong)
    .should('not.include', 'callback')
    .should('equal', TargetUrl).
    wait(2000)
}

function doLogin() {
  gotoBoards();
  clickLogin();
  return fillLoginForm();
}

describe('Checkout cypress', () => {

  it('tests coolboard', () => {
    doLogin().then(() =>{
      gotoBoards();
    })

  });

  it('logged-in user can add list and card', function() {
    doLogin();

    gotoBoards();

    // open first board named XXX
    getBoardsList_FirstEntry('autotest').click();

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

    add_a_list()
      .click();

    cy.get('div:nth-child(2) > div > div > div > .ui > .ellipsis')
      .click();

    cy.get('body > div > .ui > .ui > .trash')
      .first()
      .click();

    cy.get('.sc-bdVaJa > .ui > div > div > a')
      .click();
  });

});


function getBoardsList_FirstEntry(name) {
  return cy
    .get('.App  h1', LogAndWaitLong)
    .parent()
    .find('.fluid.container', LogAndWaitLong)
    .find('a', LogAndWaitLong)
    .contains(name)
    .first();
}

let LogAndWaitLong = {
  log: true,
  timeout: 13000,
};
