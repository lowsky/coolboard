import Chainable = Cypress.Chainable;
import Loggable = Cypress.Loggable;
import Timeoutable = Cypress.Timeoutable;

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

Cypress.Commands.add('dataCy', (selector, options) =>
  cy.get(`[data-cy="${selector}"]`, options)
);

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      enterText(text: string): Chainable<JQuery<HTMLInputElement>>;
    }
  }
}

Cypress.Commands.add('enterText', enterText);
function enterText(text: string): Chainable<JQuery<HTMLInputElement>> {
  return cy
    .get<HTMLInputElement>(
      '[data-cy="edit-and-add-card"] .chakra-editable__input'
    )
    .should('be.enabled')
    .should('be.visible')
    .focus()
    .clear()
    .type(text);
}

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      getBoardsList(): Chainable<JQuery<HTMLDivElement>>;
    }
  }
}

const getBoardsList: () => Chainable<JQuery<HTMLDivElement>> = () => {
  return cy
    .dataCy<HTMLDivElement>('full-container')
    .dataCy<HTMLDivElement>('boards-list', WaitVeryLong)
    .should('exist');
};
Cypress.Commands.add('getBoardsList', getBoardsList);

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      getBoardListItem(name: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

function getBoardListItem(name: string): Chainable<JQuery<HTMLElement>> {
  return cy
    .getBoardsList()
    .find('[data-cy="board-list-item_' + name + '"]', LogAndWaitLong);
}
Cypress.Commands.add('getBoardListItem', getBoardListItem);

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      getBoardsList_FirstEntry(name: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

const getBoardsList_FirstEntry: (
  name: string
) => Chainable<JQuery<HTMLElement>> = (name: string) => {
  return cy.getBoardListItem(name).first();
};
Cypress.Commands.add('getBoardsList_FirstEntry', getBoardsList_FirstEntry);

function getCardListButton(buttonName: string) {
  return cy.dataCy('board-container-inner').find('button').contains(buttonName);
}

Cypress.Commands.add('getCardListButton', getCardListButton);

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
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
    interface Chainable<Subject> {
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
    interface Chainable<Subject> {
      clickAddNewCard(): Chainable<JQuery<HTMLButtonElement>>;
    }
  }
}

// This is catching this exception to avoid failing test:
//
// While we have a failing fetch request (because of expired, short living
// clerk auth session cookie)
Cypress.on('uncaught:exception', (error, runnable, promise) => {
  if (promise) {
    return false;
  }
});

const graphqlQuery = `
query CardList($cardListId: ID!) {
  list(where: {id: $cardListId} ) {
    id name __typename
  }
}`;

export const login = (
  userLogin: string,
  password: string
): Cypress.Chainable<null> =>
  cy.session(
    'coolboardSessionId',
    () => {
      cy.visit('/boards', {
        // to ignore any error (while not authenticated)
        failOnStatusCode: false,
      });

      // This was only needed, when /boards was a public page:
      // … .contains('Log in', { log: true, timeout: 6000, }).first().click();
      // This could be deleted soon, if not needed anymore?

      fillLoginForm(userLogin, password);
      cy.location('pathname').should('eq', '/boards');
    },
    {
      validate: () => {
        {
          const someAPIgraphqlQuery = {
            operationName: 'CardList',
            variables: { cardListId: 'clsq1w75z0002gnafx71y3v8d' },
            query: graphqlQuery,
          };
          cy.request({
            body: someAPIgraphqlQuery,
            method: 'POST',
            url: '/api/graphql',
          });
        }
      },
      cacheAcrossSpecs: true,
    }
  );

export const isProduction =
  Cypress.config().baseUrl === 'https://www.coolboard.fun';

const credPrefix = isProduction ? 'PRODUCTION_' : '';
export const userLogin = Cypress.env(credPrefix + 'LOGIN');
export const password = Cypress.env(credPrefix + 'PASSWORD');

export const LogAndWaitLong = {
  log: true,
  timeout: 8000,
};

export const WaitVeryLong = {
  log: true,
  timeout: 5000 * 4,
};

function fillLoginForm(userLogin: string, password: string): void {
  cy.get('#identifier-field', LogAndWaitLong).type(userLogin + '{enter}');
  cy.contains('Enter your password');
  cy.get('#password-field').type(password + '{enter}', {
    log: false,
  });
}

Cypress.Commands.add('dataCy', (selector, options) =>
  cy.get(`[data-cy="${selector}"]`, options)
);
