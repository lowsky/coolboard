import {
  isProduction,
  LogAndWaitLong,
  password,
  userLogin,
  WaitVeryLong,
} from '../support/e2e';

const newBoardName = Cypress.env('branch') ?? 'missing-branch-env';

describe('Test coolboard', () => {
  before(() => {
    cy.log('Testing production page? ' + isProduction);
  });

  before(() => {
    // Ensure that all sessions are cleared up even if you re-run the spec in the Cypress App UI (Test Runner)
    cy.log('close all sessions');
    Cypress.session.clearAllSavedSessions();
  });
  beforeEach(() => {
    cy.login(userLogin, password);
    cy.visit('/boards');
  });

  it('user needs to login to show boards', () => {});

  it('user can create a board for branch', () => {
    cy.getBoardsList().then((boards) =>
      cy.log(String(boards.length + ' boards'))
    );
    cy.dataCy('create-board-dialog').click();
    cy.get('#name').clear().type(newBoardName);
    cy.dataCy('create-board-submit').click();
    cy.log('wait until dialog closes');
    cy.get('.chakra-modal__content-container', WaitVeryLong).should(
      'not.exist'
    );

    cy.getBoardsList_FirstEntry(newBoardName);
  });

  it('user can add lists and cards', () => {
    // open first board named XXX
    cy.getBoardsList_FirstEntry(newBoardName).click();
    cy.url(LogAndWaitLong).should('include', 'board/');

    //fully loaded?
    cy.get('.chakra-heading', LogAndWaitLong).contains(newBoardName);

    // clear all lists:
    cy.dataCy('board-header-menu').first().click();

    cy.get('button').contains('Delete All').click();
    cy.get('button').contains('This will be permanent').click();

    cy.sections(LogAndWaitLong).should('not.exist');

    cy.getCardListButton('Add a list').click();

    cy.sections(LogAndWaitLong).should('have.length', 1);
    cy.clickAddNewCard();
    cy.enterText('new card{enter}');
    cy.contains('[data-cy="card"] > span', 'new card');

    cy.clickAddNewCard();
    cy.enterText('canceled');
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

    cy.log('add another list');
    cy.getCardListButton('Add a list').click();
    cy.sections(LogAndWaitLong).should('have.length', 2);
  });

  it('user can delete lists', () => {
    // open first board named XXX
    cy.getBoardsList_FirstEntry(newBoardName).click();
    cy.url(LogAndWaitLong).should('include', 'board/');

    cy.log('delete first list');
    cy.sections(LogAndWaitLong)
      .dataCy('card-list-header')
      .dataCy('card-list-header-menu')
      .first()
      .click();
    cy.get('button').contains('delete list').click();
  });

  // this test is super flaky and was not properly working …
  // temporary disabling it.
  it('user can delete board', () => {
    // open first board named XXX
    cy.getBoardListItem(newBoardName).then((prevList) => {
      const p = prevList.length;
      cy.log('prev list', p);
      cy.getBoardsList_FirstEntry(newBoardName)
        .within(() => {
          cy.get('[data-cy="delete-board"]').click();
        })
        .then(() => {
          // this took some time typically, so need to wait longer
          cy.getBoardListItem(newBoardName).should(
            'have.length',
            prevList.length - 1
          );
        });
    });
  });

  it('user can log-out', () => {
    cy.logout();
    cy.contains('Sign in to coolboard');
  });
});
