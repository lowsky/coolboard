/* eslint-disable no-undef */
/// <reference types="Cypress" />

import Loggable = Cypress.Loggable;
import Timeoutable = Cypress.Timeoutable;
import { LogAndWaitLong, password, userLogin } from '../support/e2e';

const WaitVeryLong = {
  log: true,
  timeout: 5000 * 4,
};

const isMainBranch = Cypress.env('isMainBranch');
const newBoardName = Cypress.env('branch');

before(() => {
  cy.log('Testing project git branch: ' + Cypress.env('branch'));
  cy.log('Testing project git branch is main ?' + isMainBranch);
});

const _boardListContainer = () => cy.dataCy('board-container-inner');

const cardListButtons = () => _boardListContainer().find('button');

const add_a_list = () => cardListButtons().contains('Add a list');

const sections = (options: Partial<Loggable & Timeoutable>) =>
  cy.dataCy('card-list', options);

const add_a_card = () => cardListButtons().contains('Add a card');

const getBoardsList = () => {
  cy.dataCy('full-container').dataCy('boards-list', WaitVeryLong).first();

  return cy
    .dataCy('full-container')
    .dataCy('boards-list', WaitVeryLong)
    .should('exist');
};

const getBoardsList_FirstEntry = (name: string) => {
  cy.dataCy('full-container').dataCy('boards-list', WaitVeryLong).first();

  return cy
    .dataCy('full-container')
    .dataCy('boards-list', WaitVeryLong)
    .should('exist')
    .find('[data-cy="board-list-item_' + name + '"]', LogAndWaitLong)
    .first();
};

function logout() {
  cy.get('[data-cy=profile-header]')
    .contains('Sign Out', LogAndWaitLong)
    .click();
}

describe('Test coolboard', () => {
  beforeEach(() => {
    cy.login(userLogin, password);
    cy.visit('/boards');
  });

  it('user needs to login to show boards', () => {});

  it('user can create a board for branch', () => {
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
    // open first board named XXX
    getBoardsList_FirstEntry(newBoardName)
      .within(() => {
        cy.get('[data-cy="delete-board"]').click();
      })
      .then(() => {
        // this took some time typically, so need to wait longer
        getBoardsList()
          .contains(newBoardName, LogAndWaitLong)
          .should('not.exist');
      });
  });

  it('user can log-out', () => {
    logout();
    cy.contains('Log in')
    cy.contains('Please, login to see your boards.');
  });
});
