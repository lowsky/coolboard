import { createYoga, type Plugin } from 'graphql-yoga';
import { useDisableIntrospection } from '@graphql-yoga/plugin-disable-introspection';
import { blockFieldSuggestionsPlugin } from '@escape.tech/graphql-armor-block-field-suggestions';
import type { NextApiRequest, NextApiHandler } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

import { isLocalDev } from 'server/src/helpers/logging';
import type { Ctxt } from 'server/src/resolvers/Context';
import { buildSchema, prisma } from 'server/src/buildSchema';
import { REQ_HEADER_x_coolboard_readonly } from 'src/headers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Server context for Yoga
interface ServerCtxt {
  request: NextApiRequest;
  params: Promise<Record<string, string>>;
}

const authenticatedHandler = createYoga<ServerCtxt>({
  schema: buildSchema(),
  batching: true,
  landingPage: true,
  plugins: [
    useDisableIntrospection({
      isDisabled: () => !isLocalDev,
    }),
    /* This plugin will disable the suggestions in a GraphQL query.
     * GraphQL suggestions are messages (`Did you mean ...`) that help you to adjust your query.
     */
    blockFieldSuggestionsPlugin(),
    useAuth(),
  ],
  context: async ({ request }) => {
    return {
      request,
      prisma,
    } satisfies Ctxt;
  },
  graphqlEndpoint: '/api/graphql',
  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
}) satisfies NextApiHandler;

function useAuth(): Plugin<object, ServerCtxt> {
  return {
    onRequest({ request, fetchAPI, endResponse }) {
      const readOnlyHeader = request.headers.get(
        REQ_HEADER_x_coolboard_readonly
      );
      const isReadOnlyHeader = readOnlyHeader === 'true';

      if (!isReadOnlyHeader) {
        // Clerk expects a NextRequest; cast from the standard Request
        const { userId } = getAuth(request as unknown as NextRequest);
        if (!userId) {
          if (isLocalDev) console.error('    userId is not yet set!');

          endResponse(
            new fetchAPI.Response(null, {
              status: 401,
              headers: {
                'Content-Type': 'application/json',
              },
            })
          );
        }
      }
    },
  };
}

export {
  authenticatedHandler as GET,
  authenticatedHandler as POST,
  authenticatedHandler as OPTIONS,
};
