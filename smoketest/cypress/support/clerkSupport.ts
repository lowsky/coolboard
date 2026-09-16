// adopted clerk testing code
// it was not compatible with cypress 16, while still using old Cypress.env
//
// from https://github.com/clerk/javascript/blob/71c3d0703e60870a1eb6074d1fbf4540c1bf905c/packages/testing/src/cypress/index.ts

// still hard-coded and needs adoption:
//    frontendApiUrl
//
// ---

import type { Clerk, SignOutOptions } from '@clerk/shared/types';


//--- constants
export const TESTING_TOKEN_PARAM = "__clerk_testing_token";

export const ERROR_MISSING_FRONTEND_API_URL =
  'The Clerk Frontend API URL is required to bypass bot protection. ' +
  'Make sure the clerkSetup function is called during your global setup before setupClerkTestingToken is called.';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Signs in a user using Clerk. This custom command supports only password, phone_code and email_code first factor strategies.
       * Multi-factor is not supported.
       * This helper is using the `setupClerkTestingToken` internally.
       * It is required to call `cy.visit` before calling this command, and navigate to a not protected page that loads Clerk.
       *
       * If the strategy is password, the command will sign in the user using the provided password and identifier.
       * If the strategy is phone_code, you are required to have a user with a test phone number as an identifier (e.g. +15555550100).
       * If the strategy is email_code, you are required to have a user with a test email as an identifier (e.g. your_email+clerk_test@example.com).
       *
       * @param signInParams - The sign in parameters.
       * @param signInParams.strategy - The sign in strategy. Supported strategies are 'password', 'phone_code' and 'email_code'.
       * @param signInParams.identifier - The user's identifier. Could be a username, a phone number or an email.
       * @param signInParams.password - The user's password. Required only if the strategy is 'password'.
       *
       * @example
       *  it("sign in", () => {
       *     cy.visit(`/`);
       *     cy.clerkSignIn({ strategy: 'phone_code', identifier: '+15555550100' });
       *     cy.visit('/protected');
       *  });
       */
      clerkSignIn(signInParams: ClerkSignInParams): Chainable<void>;
      /**
       * Signs out the current user using Clerk.
       * It is required to call `cy.visit` before calling this command, and navigate to a page that loads Clerk.
       * @param signOutOptions - A SignOutOptions object.
       *
       * @example
       *  it("sign out", () => {
       *     cy.visit(`/`);
       *     cy.clerkSignIn({ strategy: 'phone_code', identifier: '+15555550100' });
       *     cy.visit('/protected');
       *     cy.clerkSignOut();
       *  });
       */
      clerkSignOut(signOutOptions?: SignOutOptions): Chainable<void>;
      /**
       * Asserts that Clerk has been loaded.
       * It is required to call `cy.visit` before calling this command, and navigate to a page that loads Clerk.
       */
      clerkLoaded(): Chainable<void>;
    }
  }
  interface Window {
    Clerk: Clerk;
  }
}

type AddClerkCommandsParams = {
  Cypress: typeof Cypress;
  cy: Cypress.Chainable;
};
export type SetupClerkTestingTokenOptions = {
  frontendApiUrl?: string;
};
type SetupClerkTestingTokenParams = {
  options?: SetupClerkTestingTokenOptions;
};

const setupClerkTestingToken = (params?: SetupClerkTestingTokenParams) => {
  const fapiUrl = params?.options?.frontendApiUrl
  if (!fapiUrl) {
    throw new Error(ERROR_MISSING_FRONTEND_API_URL);
  }
  const apiUrl = `https://${fapiUrl}/v1/**`;

  cy.env(
    ['CLERK_TESTING_TOKEN']).then(({ CLERK_TESTING_TOKEN }) => {
    const testingToken = CLERK_TESTING_TOKEN;
    cy.log('testing token:', testingToken);
    expect(testingToken).to.be.a('string');

    cy.intercept(apiUrl, req => {
      if (testingToken) {
        req.query[TESTING_TOKEN_PARAM] = testingToken;
      }

      req.continue();

      req.on('response', res => {
        // Override captcha_bypass in /v1/client
        if (res.body?.response?.captcha_bypass === false) {
          res.body.response.captcha_bypass = true;
        }

        // Override captcha_bypass in piggybacking
        if (res.body?.client?.captcha_bypass === false) {
          res.body.client.captcha_bypass = true;
        }
      });
    });
  });
};

export const addClerkCommands = ({ Cypress, cy }: AddClerkCommandsParams) => {
  Cypress.Commands.add(`clerkSignIn`, signInParams => {
    let params:SetupClerkTestingTokenParams = {options: {
        frontendApiUrl: 'clerk.coolboard.eu'// or Cypress.env('CLERK_FAPI');
      }
    };
    setupClerkTestingToken(params);

    cy.log(`Clerk: Signing in...`);

    cy.window()
      .should(window => {
        expect(window).to.not.have.property(`Clerk`, undefined);
        expect(window.Clerk.loaded).to.eq(true);
      })
      .then(async window => {
        await signInHelper({ windowObject: window, signInParams });
        cy.log(`Clerk: Finished signing in.`);
      });
  });

  Cypress.Commands.add(`clerkSignOut`, signOutOptions => {
    cy.log(`Clerk: Signing out...`);

    cy.window()
      .should(window => {
        expect(window).to.not.have.property(`Clerk`, undefined);
        expect(window.Clerk.loaded).to.eq(true);
      })
      .then(async window => {
        await window.Clerk.signOut(signOutOptions);
        cy.log(`Clerk: Finished signing out.`);
      });
  });

  Cypress.Commands.add(`clerkLoaded`, () => {
    cy.window().should(window => {
      expect(window).to.not.have.property(`Clerk`, undefined);
      expect(window.Clerk.loaded).to.eq(true);
    });
  });
};



import type { EmailCodeFactor, PhoneCodeFactor, SignInFirstFactor } from '@clerk/shared/types';


export type ClerkSignInParams =
  | {
  strategy: 'password';
  password: string;
  identifier: string;
}
  | {
  strategy: 'phone_code' | 'email_code';
  identifier: string;
}
  | {
  strategy: 'ticket';
  ticket: string;
};

export type SignInHelperParams = {
  signInParams: ClerkSignInParams;
  windowObject?: Window;
};
//import type { SignInHelperParams } from './types';

// This function is serialized and executed in the browser context
export const signInHelper = async ({ signInParams, windowObject }: SignInHelperParams) => {
  try {
    const w = windowObject || window;
    if (!w.Clerk.client) {
      return;
    }

    const signIn = w.Clerk.client.signIn;

    switch (signInParams.strategy) {
      case 'password': {
        const res = await signIn.create(signInParams);
        await w.Clerk.setActive({
          session: res.createdSessionId,
        });
        break;
      }

      case 'ticket': {
        const res = await signIn.create({
          strategy: 'ticket',
          ticket: signInParams.ticket,
        });

        if (res.status === 'complete') {
          await w.Clerk.setActive({
            session: res.createdSessionId,
          });
        } else {
          throw new Error(`Sign-in with ticket failed. Status: ${res.status}`);
        }
        break;
      }

      case 'phone_code': {
        // Assert that the identifier is a test phone number
        if (!/^\+1\d{3}55501\d{2}$/.test(signInParams.identifier)) {
          throw new Error(
            `Phone number should be a test phone number.\n
       Example: +1XXX55501XX.\n
       Learn more here: https://clerk.com/docs/testing/test-emails-and-phones#phone-numbers`,
          );
        }

        // Sign in with phone code
        const { supportedFirstFactors } = await signIn.create({
          identifier: signInParams.identifier,
        });
        const phoneFactor = supportedFirstFactors?.find(
          (factor: SignInFirstFactor): factor is PhoneCodeFactor => factor.strategy === 'phone_code',
        );

        if (phoneFactor) {
          await signIn.prepareFirstFactor({
            strategy: 'phone_code',
            phoneNumberId: phoneFactor.phoneNumberId,
          });
          const signInAttempt = await signIn.attemptFirstFactor({
            strategy: 'phone_code',
            code: '424242',
          });

          if (signInAttempt.status === 'complete') {
            await w.Clerk.setActive({ session: signInAttempt.createdSessionId });
          } else {
            throw new Error(`Status is ${signInAttempt.status}`);
          }
        } else {
          throw new Error('phone_code is not enabled.');
        }
        break;
      }

      case 'email_code': {
        // Assert that the identifier is a test email
        if (!signInParams.identifier.includes('+clerk_test')) {
          throw new Error(
            `Email should be a test email.\n
       Any email with the +clerk_test subaddress is a test email address.\n
       Learn more here: https://clerk.com/docs/testing/test-emails-and-phones#email-addresses`,
          );
        }

        // Sign in with email code
        const { supportedFirstFactors } = await signIn.create({
          identifier: signInParams.identifier,
        });
        const emailFactor = supportedFirstFactors?.find(
          (factor: SignInFirstFactor): factor is EmailCodeFactor => factor.strategy === 'email_code',
        );

        if (emailFactor) {
          await signIn.prepareFirstFactor({
            strategy: 'email_code',
            emailAddressId: emailFactor.emailAddressId,
          });
          const signInAttempt = await signIn.attemptFirstFactor({
            strategy: 'email_code',
            code: '424242',
          });

          if (signInAttempt.status === 'complete') {
            await w.Clerk.setActive({ session: signInAttempt.createdSessionId });
          } else {
            throw new Error(`Status is ${signInAttempt.status}`);
          }
        } else {
          throw new Error('email_code is not enabled.');
        }
        break;
      }

      default:
        throw new Error(`Unsupported strategy: ${(signInParams as any).strategy}`);
    }
  } catch (err: any) {
    throw new Error(`Clerk: Failed to sign in: ${err?.message}`);
  }
};
