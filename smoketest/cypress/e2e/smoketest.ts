/* eslint-disable no-undef */
/// <reference types="Cypress" />

import Loggable = Cypress.Loggable;
import Timeoutable = Cypress.Timeoutable;
import {
  isProduction,
  LogAndWaitLong,
  password,
  userLogin,
  WaitVeryLong,
} from '../support/e2e';

const newBoardName = Cypress.env('branch') ?? 'missing-branch-env';

const _boardListContainer = () => cy.dataCy('board-container-inner');

const cardListButtons = () => _boardListContainer().find('button');

const add_a_list = () => cardListButtons().contains('Add a list');

const sections = (options: Partial<Loggable & Timeoutable>) =>
  cy.dataCy('card-list', options);

const add_a_card = () => cardListButtons().contains('New Card');

//garb cy.contains('[data-cy="edit-and-add-card"] .chakra-editable__preview', 'New');
function clickAddNewCard() {
  cy.get('[data-cy="edit-and-add-card"] .chakra-editable__preview').should(
    'not.have.attr',
    'aria-disabled',
    'true'
  );
  cy.get('[data-cy="edit-and-add-card"] .chakra-editable__preview').click();
}

function enterText(text: string) {
  cy.get('[data-cy="edit-and-add-card"] .chakra-editable__input')
    .should('be.enabled')
    .should('be.visible')
    .focus()
    .clear()
    .type(text);
}

const getBoardsList = () => {
  return cy
    .dataCy('full-container')
    .dataCy('boards-list', WaitVeryLong)
    .should('exist');
};

function getBoardListItem(name: string) {
  return getBoardsList().find(
    '[data-cy="board-list-item_' + name + '"]',
    LogAndWaitLong
  );
}

const getBoardsList_FirstEntry = (name: string) => {
  return getBoardListItem(name).first();
};

function logout() {
  cy.get('[data-cy=profile-header]')
    .contains('Sign Out', LogAndWaitLong)
    .click();
}

describe('Test coolboard', () => {
  before(() => {
    cy.log('Testing production page? ' + isProduction);
  });
  beforeEach(() => {
    cy.login(userLogin, password);
    cy.visit('/boards');
  });

  it('user needs to login to show boards', () => {});

  it('user can create a board for branch', () => {
    getBoardsList().then((boards) => cy.log(String(boards.length + ' boards')));
    cy.dataCy('create-board-dialog').click();
    cy.get('#name').clear().type(newBoardName);
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
    clickAddNewCard();
    enterText('new card{enter}');

    clickAddNewCard();
    enterText('withCreateButton ');
    cy.contains('button', 'Create').click();

    clickAddNewCard();
    enterText('canceled');
    cy.get('#cancel').click();

    // edit card
    cy.log('edit card');
    // old: cy.dataCy('card').contains('new card').click();
    cy.contains('[data-cy="card"] > span', 'new card').first().click();
    cy.get('.chakra-modal__content-container')
      .get('#title')
      .clear()
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
    cy.contains('[data-cy="card"] > span', 'name-changed');

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
        getBoardListItem(newBoardName).should('not.exist');
      });
  });

  it('user can log-out', () => {
    logout();
    cy.contains('Log in');
    cy.contains('Please, login to see your boards.');
  });
});
