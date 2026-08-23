import { addClerkCommands } from '@clerk/testing/cypress';

import Chainable = Cypress.Chainable;
import Loggable = Cypress.Loggable;
import Timeoutable = Cypress.Timeoutable;

// Importing commands like cy.clerkSignIn etc.
//
// These helpers depend on using the setupClerkTestingToken (see e2e config)
addClerkCommands({ Cypress, cy });

export const isProduction =
  Cypress.config().baseUrl === 'https://www.coolboard.eu';

const credPrefix = isProduction ? 'PRODUCTION_' : '';
export const userLogin = Cypress.expose(credPrefix + 'LOGIN');
export const password = Cypress.expose(credPrefix + 'PASSWORD');

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom command to select the DOM element by data-cy attribute.
       * @example cy.dataCy('greeting') finds  <div data-cy="greeting">
       */
      dataCy<T extends HTMLElement>(
        selector: string,
        options?: Partial<Loggable & Timeoutable>
      ): Chainable<JQuery<T>>;

      /**
       * Custom command to do the authentication via logging-in in UI
       *
       * @example cy.login('login', 'passwd')
       */
      login(user: string, password: string): void;
      /**
       * Custom command to log out
       */
      logout(): void;
    }
  }
}

Cypress.Commands.add('login', (username, password): void => {
  login(username, password);
});

Cypress.Commands.add('logout', (): void => {
  logout();
});

function logout(): void {
  cy.get('[data-cy=profile-header]')
    .contains('Sign Out', LogAndWaitLong)
    .click();
}

Cypress.Commands.add(
  'dataCy',
  (selector: string, options?: Partial<Loggable & Timeoutable>) =>
    cy.get(`[data-cy="${selector}"]`, options)
);

const enterText = (text: string): Chainable<JQuery<HTMLInputElement>> =>
  cy
    .get<HTMLInputElement>(
      '[data-cy="edit-and-add-card"] .chakra-editable__input'
    )
    .should('be.enabled')
    .should('be.visible')
    .focus()
    .clear()
    .type(text);
Cypress.Commands.add('enterText', enterText);

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      getBoardsList(
        options?: Partial<Loggable & Timeoutable>
      ): Chainable<JQuery<HTMLDivElement>>;
    }
  }
}

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      enterText(text: string): Chainable<JQuery<HTMLInputElement>>;
    }
  }
}

const getBoardsList: (
  options?: Partial<Loggable & Timeoutable>
) => Chainable<JQuery<HTMLDivElement>> = (options) => {
  return cy
    .dataCy<HTMLDivElement>('full-container', options)
    .dataCy<HTMLDivElement>('boards-list', { ...WaitVeryLong, ...options })
    .should('exist');
};
Cypress.Commands.add('getBoardsList', getBoardsList);

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      getBoardListItem(
        name: string,
        options?: Partial<Loggable & Timeoutable>
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}

function getBoardListItem(
  name: string,
  options?: Partial<Loggable & Timeoutable>
): Chainable<JQuery<HTMLElement>> {
  return cy.getBoardsList().find(`[data-cy="board-list-item_${name}"]`, {
    ...LogAndWaitLong,
    ...options,
  });
}
Cypress.Commands.add('getBoardListItem', getBoardListItem);

declare global {
  namespace Cypress {
    interface Chainable {
      getBoardsList_FirstEntry(name: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

function getBoardsList_FirstEntry(
  name: string
): Chainable<JQuery<HTMLElement>> {
  // begin the command here, which by will display
  // as a 'spinning blue state' in the UI to indicate
  // the command is running
  const cmd = Cypress.log({
    name: 'pick first board list item',
    message: [],
    consoleProps() {
      // we are creating our own custom message here
      // that will print out to our browsers console
      // whenever we click on this command.
      return {};
    },
  });
  return cy
    .getBoardListItem(name, { log: false })
    .first()
    .then(($firstItem) => {
      // once we are done fetching first ListItem
      // above we want to return the ListItem
      // to allow for further chaining, and then
      // we want to snapshot the state of the DOM
      // and end the command, so it goes from that
      // 'spinning blue state' to the 'finished state'
      cmd.set({ $el: $firstItem }).snapshot().end();
    });
}
Cypress.Commands.add('getBoardsList_FirstEntry', getBoardsList_FirstEntry);

function getCardListButton(buttonName: string) {
  return cy.dataCy('board-container-inner').find('button').contains(buttonName);
}

Cypress.Commands.add('getCardListButton', getCardListButton);

declare global {
  namespace Cypress {
    interface Chainable {
      getCardListButton(
        buttonName: string
      ): Chainable<JQuery<HTMLButtonElement>>;
    }
  }
}

const sections = (options?: Partial<Loggable & Timeoutable>) =>
  cy.dataCy('card-list', options);

Cypress.Commands.add('sections', sections);

declare global {
  namespace Cypress {
    interface Chainable {
      sections(
        options?: Partial<Loggable & Timeoutable>
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}

function clickAddNewCard() {
  cy.get('[data-cy="edit-and-add-card"] .chakra-editable__preview').should(
    'not.have.attr',
    'aria-disabled',
    'true'
  );
  cy.get('[data-cy="edit-and-add-card"] .chakra-editable__preview').click();
}

Cypress.Commands.add('clickAddNewCard', clickAddNewCard);

declare global {
  namespace Cypress {
    interface Chainable {
      clickAddNewCard(): Chainable<JQuery<HTMLButtonElement>>;
      /**
       * Custom command to select a card list by its index
       * @example cy.getCardListByIndex(1) - selects the first card list
       */
      getCardListByIndex(
        index: number,
        options?: Partial<Loggable & Timeoutable>
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}

// This is catching this exception to avoid failing test:
//
// While we have a failing fetch request (because of expired, short living
// clerk auth session cookie)
Cypress.on('uncaught:exception', (_error, _runnable, promise) => {
  if (promise !== undefined) {
    return false;
  }
});

const graphqlQuery = `
  query userBoards {
    me {
      name
      id
    }
  }
}`;

export const login: (
  userLogin: string,
  password: string
) => Cypress.Chainable<null> = (userLogin, password): Cypress.Chainable<null> =>
  cy.session(
    'coolboardSessionId',
    () => {
      // open main entrance page (home would be unintersting, and loading other unwanted stuff)
      cy.visit(`/boards`);
      // Signs in a user using Clerk. This custom command supports only password,
      // phone_code and email_code first factor strategies.
      //
      // This helper is using the setupClerkTestingToken internally!
      cy.clerkSignIn({ strategy: 'password', identifier: userLogin, password });

      //It requires navigating explicitly to this page. Without that, it would stay on the
      // sign-in page (at least here in cypress!)
      cy.visit(`/boards`);
      cy.location('pathname').should('eq', '/boards');
    },
    {
      // () => Promise<false | void> | void
      validate: () => {
        const someApiGraphqlQuery = {
          operationName: 'whoami',
          query: graphqlQuery,
        };
        cy.request({
          body: someApiGraphqlQuery,
          method: 'POST',
          url: '/api/graphql',
        });
      },
      cacheAcrossSpecs: true,
    }
  );

export const LogAndWaitLong: Partial<Loggable & Timeoutable> = {
  log: true,
  timeout: 6000,
};

export const WaitVeryLong: Partial<Loggable & Timeoutable> = {
  log: true,
  timeout: 2000 * 4,
};

Cypress.Commands.add(
  'dataCy',
  (selector: string, options?: Partial<Loggable & Timeoutable>) =>
    cy.get(`[data-cy="${selector}"]`, options)
);

/**
 * Custom command to select a card list by its index
 * @param index - The 1-based index of the card list to select
 * @param options - Optional Cypress command options
 * @returns Chainable with the selected card list element
 */
function getCardListByIndex(
  index: number,
  options?: Partial<Loggable & Timeoutable>
): Chainable<JQuery<HTMLElement>> {
  return cy.get(`:nth-child(${index}) > [data-cy="card-list"]`, options);
}

Cypress.Commands.add('getCardListByIndex', getCardListByIndex);

/**
 * Custom command to drag and drop a card from source list to target list.
 * Waits for the mutation to complete before resolving.
 */
Cypress.Commands.add(
  'dragCardTo',
  (sourceListIndex: number, targetListIndex: number) => {
    const cardSelector = '[data-cy="card"]';

    return getCardListByIndex(sourceListIndex)
      .find(cardSelector)
      .first()
      .then(($card) => {
        const cardRect = $card[0].getBoundingClientRect();
        const startX = Math.round(cardRect.left + cardRect.width / 2);
        const startY = Math.round(cardRect.top + cardRect.height / 2);

        cy.intercept('POST', '/api/graphql').as('graphqlRequest');

        return getCardListByIndex(targetListIndex).then(($targetList) => {
          const targetRect = $targetList[0].getBoundingClientRect();
          const endX = Math.round(targetRect.left + targetRect.width / 2);
          const endY = Math.round(targetRect.top + targetRect.height / 2);

          // pointerdown activates the PointerSensor on the draggable element
          cy.wrap($card)
            .trigger('pointerdown', {
              button: 0,
              clientX: startX,
              clientY: startY,
              bubbles: true,
              cancelable: true,
              isPrimary: true,
              pointerId: 1,
            })
            // initial pointermove initiates the drag (must exceed the 5px distance constraint)
            .trigger('pointermove', {
              clientX: startX + 10,
              clientY: startY,
              bubbles: true,
              cancelable: true,
              isPrimary: true,
              pointerId: 1,
            });

          // pointermove over target bubbles to document where dnd-kit listens
          getCardListByIndex(targetListIndex)
            .trigger('pointermove', {
              clientX: endX,
              clientY: endY,
              bubbles: true,
              cancelable: true,
              isPrimary: true,
              pointerId: 1,
            })
            .trigger('pointerup', {
              button: 0,
              clientX: endX,
              clientY: endY,
              bubbles: true,
              cancelable: true,
              isPrimary: true,
              pointerId: 1,
            });

          // Wait for mutation to complete and cache to sync
          cy.wait('@graphqlRequest', { timeout: WaitVeryLong });

          // Verify the card has moved to the second list
          cy.getCardListByIndex(sourceListIndex)
            .find(':nth-child(1) > [data-cy="card"]')
            .should('have.length', 0);
          cy.getCardListByIndex(targetListIndex)
            .find(':nth-child(1) > [data-cy="card"]')
            .should('have.length', 1);
        });
      });
  }
);
