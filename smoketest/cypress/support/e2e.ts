import { addClerkCommands } from "./clerkSupport";

import Chainable = Cypress.Chainable;
import Loggable = Cypress.Loggable;
import Timeoutable = Cypress.Timeoutable;

// Importing commands like cy.clerkSignIn etc.
//
// These helpers depend on using the setupClerkTestingToken (see e2e config)
addClerkCommands({ Cypress, cy });

/**
 * true, when testing https://www.coolboard.eu
 */
export const isProduction =
  Cypress.config().baseUrl === 'https://www.coolboard.eu';

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
       * It uses these exposed environment variables internally:
       *
       * * LOGIN
       * * PASSWORD
       *
       * Prefixed, if testing production, see #isProduction
       * * PRODUCTION_LOGIN
       * * PRODUCTION_PASSWORD
       *
       * @example cy.login()
       */
      login(): Cypress.Chainable<null>;
      /**
       * Custom command to log out
       */
      logout(): void;
    }
  }
}

Cypress.Commands.add('login', (): Cypress.Chainable<null> => login());

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

const enterText = (text: string, params?: {withEnter: boolean}): Chainable<JQuery<HTMLInputElement>> => {
  const entered = cy
    .get<HTMLInputElement>(
      '[data-cy="edit-and-add-card"] .chakra-editable__input'
    )
    .should('be.enabled')
    .should('be.visible')
    .focus()
    .clear()
    .type(text);

  if(params?.withEnter) {
    return entered.type('{enter}')
  }

  return entered;
}

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
      enterText(text: string, params?: {withEnter: boolean}): Chainable<JQuery<HTMLInputElement>>;
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

      dragCardTo(
        sourceListIndex: number,
        targetListIndex: number
      ): Chainable<void>;
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
  query whoami {
    me {
      name
      id
    }
  }
`;

const login: () => Cypress.Chainable<null> = (): Cypress.Chainable<null> => cy.session(
    'coolboardSessionId',
    () => {
      // open main entrance page (home page is unrestricted, lacking Clerk, and loading unwanted stuff)
      cy.visit(`/boards`);

      const credPrefix = isProduction ? 'PRODUCTION_' : '';

      const userLoginKey = credPrefix + 'LOGIN';
      const passwordKey = credPrefix + 'PASSWORD';

      // This helper is using the setupClerkTestingToken internally!
      return cy.env([userLoginKey, passwordKey]).then((secrets: Record<string, string>) => {
        expect(secrets[userLoginKey], `env variable not set: ${userLoginKey} !`).to.be.a('string');

        // Signs in a user using Clerk. This custom command supports only password,
        // phone_code and email_code first factor strategies.
        cy.clerkSignIn({
          strategy: 'password',
          identifier: secrets[userLoginKey],
          password: secrets[passwordKey],
        });

        //It requires navigating explicitly to this page. Without that, it would stay on the
        // sign-in page (at least here in cypress!)
        cy.visit(`/boards`);
        cy.location('pathname').should('eq', '/boards');
      });
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
        }).then((response) => {
          expect(response.body.errors ?? []).to.have.lengthOf(0);
          expect(response.body.data.me.id)
            .to.be.a('string')
            .and.to.have.lengthOf.at.least(1);
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
 *
 * Uses native PointerEvent construction (new win.PointerEvent) instead of
 * cy.trigger() because cy.trigger() creates jQuery-wrapped CustomEvents that
 * fail dnd-kit's `event instanceof PointerEvent` check inside PointerSensor.
 *
 * Each event is fired in its own cy.window().then() so the Cypress command
 * queue yields to the event loop between events, giving dnd-kit's
 * signal/effect-based collision detection time to run.  An explicit cy.wait()
 * before pointerup ensures the rAF-scheduled collision pass has completed and
 * a valid drop target is recorded before the drag ends.
 */
Cypress.Commands.add(
  'dragCardTo',
  (sourceListIndex: number, targetListIndex: number) => {
    const cardSelector = '[data-cy="card"]';

    // Set up the intercept before any action fires the mutation.
    cy.intercept('POST', '/api/graphql').as('graphqlRequest');

    // Capture element references and coordinates into outer-scope variables
    // so they are available inside later cy.window().then() callbacks after
    // the Cypress queue has resolved them.
    // The '!' definite-assignment assertions satisfy TS strict mode — these are
    // assigned in earlier Cypress queue steps that always run before the
    // cy.window().then() callbacks below.
    let cardEl!: HTMLElement;
    let startX!: number, startY!: number;
    let endX!: number, endY!: number;

    getCardListByIndex(sourceListIndex)
      .find(cardSelector)
      .first()
      .then(($card) => {
        cardEl = $card[0];
        const r = cardEl.getBoundingClientRect();
        startX = Math.round(r.left + r.width / 2);
        startY = Math.round(r.top + r.height / 2);
      });

    getCardListByIndex(targetListIndex).then(($target) => {
      const r = $target[0].getBoundingClientRect();
      endX = Math.round(r.left + r.width / 2);
      endY = Math.round(r.top + r.height / 2);
    });

    // Helper invoked inside each cy.window().then() to build a real PointerEvent.
    // win is typed as Cypress.AUTWindow which extends Window & typeof globalThis,
    // so win.PointerEvent is the AUT's native constructor (important when the AUT
    // runs inside a Cypress iframe).
    const makeEvent = (
      win: Cypress.AUTWindow,
      type: string,
      x: number,
      y: number,
      buttons: number
    ) =>
      new win.PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        isPrimary: true,
        pointerId: 1,
        pointerType: 'mouse',
        button: 0,
        buttons,
        clientX: x,
        clientY: y,
      });

    // 1. pointerdown on the draggable card — activates PointerSensor and
    //    causes dnd-kit to attach its document-level pointermove/pointerup
    //    listeners.
    cy.window().then((win) => {
      cardEl.dispatchEvent(makeEvent(win, 'pointerdown', startX, startY, 1));
    });

    // 2. Initial pointermove to surpass the default 10px activation distance.
    //    Fired on document because dnd-kit's listener is there.
    cy.window().then((win) => {
      win.document.dispatchEvent(
        makeEvent(win, 'pointermove', startX + 20, startY, 1)
      );
    });

    // 3. Move to the center of the target list so collision detection resolves
    //    the droppable before we release.
    cy.window().then((win) => {
      win.document.dispatchEvent(makeEvent(win, 'pointermove', endX, endY, 1));
    });

    // 4. Give dnd-kit's rAF-scheduled collision detection a full frame to run
    //    so that event.operation.target is populated when pointerup fires.
    cy.wait(100);

    // 5. pointerup on document — ends the drag and triggers handleDragEnd with
    //    the previously computed drop target.
    cy.window().then((win) => {
      win.document.dispatchEvent(makeEvent(win, 'pointerup', endX, endY, 0));
    });

    // Wait for the moveCard GraphQL mutation network request.
    cy.wait('@graphqlRequest', WaitVeryLong);

    // Verify the card has actually moved.
    cy.getCardListByIndex(sourceListIndex)
      .find(':nth-child(1) > [data-cy="card"]')
      .should('have.length', 0);
    cy.getCardListByIndex(targetListIndex)
      .find(':nth-child(1) > [data-cy="card"]')
      .should('have.length', 1);
  }
);
