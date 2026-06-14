import {
  isProduction,
  LogAndWaitLong,
  password,
  userLogin,
  WaitVeryLong,
} from '../support/e2e';

const newBoardName = Cypress.expose('branch') ?? 'missing-branch-env';

describe('Test coolboard', () => {
  before(() => {
    cy.log('Testing production page? ' + isProduction);
  });

  beforeEach(() => {
    cy.intercept(
      Cypress.config().baseUrl + '/' + '**',
      { middleware: true },
      (req) => {
        req.headers['x-vercel-protection-bypass'] = Cypress.expose(
          'VERCEL_AUTOMATION_BYPASS_SECRET'
        );
        req.headers['x-vercel-set-bypass-cookie'] = 'true';
      }
    );
  });
  before(() => {
    // Ensure that all sessions are cleared up even if you re-run the spec in the Cypress App UI (Test Runner)
    // run only once
    cy.log('close all sessions');
    Cypress.session.clearAllSavedSessions();
  });

  beforeEach(() => {
    // initial login, initiate cached session:
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
    cy.get('.chakra-dialog__content', WaitVeryLong).should(
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
    cy.get('.chakra-dialog__content')
      .get('#title')
      .clear()
      .type('name-changed');
    cy.get('.chakra-dialog__content')
      .find('.chakra-button')
      .contains('Save')
      .click()
      .wait(1500);
    cy.log('wait until dialog closes');
    cy.get('.chakra-dialog__content', WaitVeryLong).should(
      'not.exist'
    );
    cy.contains('[data-cy="card"] > span', 'name-changed');

    cy.log('add another list');
    cy.getCardListButton('Add a list').click();
    cy.sections(LogAndWaitLong).should('have.length', 2);
  });

  it('user can drag and drop a card from first to second list', () => {
    cy.getBoardsList_FirstEntry(newBoardName).click();

    // Verify initial state: card exists in the first card-list but not in the second card-list
    cy.getCardListByIndex(1).find(':nth-child(1) > [data-cy="card"]')
      .should('have.length', 1);
    cy.getCardListByIndex(2).find(':nth-child(1) > [data-cy="card"]')
      .should('have.length', 0);

    // dnd-kit's PointerSensor registers its pointermove/pointerup listeners on the document.
    // Dispatch events directly on the document via win.PointerEvent (app-frame constructor)
    // so they reach dnd-kit's document-level listeners reliably.
    cy.getCardListByIndex(1).find(':nth-child(1) > [data-cy="card"]').first()
      .then($card => {
        const cardRect = $card[0].getBoundingClientRect();
        const startX = Math.round(cardRect.left + cardRect.width / 2);
        const startY = Math.round(cardRect.top + cardRect.height / 2);

        return cy.getCardListByIndex(2).then($list => {
          const listRect = $list[0].getBoundingClientRect();
          const endX = Math.round(listRect.left + listRect.width / 2);
          const endY = Math.round(listRect.top + listRect.height / 2);

          cy.window().then(win => {
            const doc = win.document;

            // pointerdown on the card element activates dnd-kit's PointerSensor
            $card[0].dispatchEvent(new win.PointerEvent('pointerdown', {
              bubbles: true,
              cancelable: true,
              isPrimary: true,
              button: 0,
              buttons: 1,
              clientX: startX,
              clientY: startY,
              pointerId: 1,
            }));

            // pointermove on document: must exceed the 5px distance constraint to activate drag
            doc.dispatchEvent(new win.PointerEvent('pointermove', {
              bubbles: true,
              cancelable: true,
              isPrimary: true,
              button: 0,
              buttons: 1,
              clientX: startX + 10,
              clientY: startY,
              pointerId: 1,
            }));

            // pointermove on document to position the drag over the second list
            doc.dispatchEvent(new win.PointerEvent('pointermove', {
              bubbles: true,
              cancelable: true,
              isPrimary: true,
              button: 0,
              buttons: 1,
              clientX: endX,
              clientY: endY,
              pointerId: 1,
            }));

            // pointerup on document: ends the drag and fires onDragEnd
            doc.dispatchEvent(new win.PointerEvent('pointerup', {
              bubbles: true,
              cancelable: true,
              isPrimary: true,
              button: 0,
              buttons: 0,
              clientX: endX,
              clientY: endY,
              pointerId: 1,
            }));
          });
        });
      });

    // Verify the card has moved to the second list
    cy.getCardListByIndex(2).find(':nth-child(1) > [data-cy="card"]')
      .should('have.length', 1);
    cy.getCardListByIndex(1).find(':nth-child(1) > [data-cy="card"]')
      .should('have.length', 0);
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
    cy.contains('Sign in to');
  });
});
