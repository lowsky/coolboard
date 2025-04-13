import { createYoga, YogaServer } from 'graphql-yoga';
import { Plugin } from 'graphql-yoga';
import { useDisableIntrospection } from '@graphql-yoga/plugin-disable-introspection';
import { blockFieldSuggestionsPlugin } from '@escape.tech/graphql-armor-block-field-suggestions';

import { getAuth } from '@clerk/nextjs/server';
import type { PrismaClient } from '@prisma/client';

import { isLocalDev } from 'server/src/helpers/logging';
import type { Ctxt } from 'server/src/resolvers/Context';
import { buildSchema, prisma } from 'server/src/buildSchema';

import { REQ_HEADER_x_coolboard_readonly } from 'src/headers';
import { NextRequest } from 'next/server';

type ServerCtxt = object;

const authenticatedHandler: YogaServer<ServerCtxt, Ctxt> = createYoga<
  ServerCtxt,
  Ctxt
>({
  schema: buildSchema(),
  batching: true,
  landingPage: true,
  plugins: [
    useDisableIntrospection({
      isDisabled: () => !isLocalDev,
    }),
    blockFieldSuggestionsPlugin(),
    useAuth(),
  ],
  context: async ({ request }) => {
    return {
      // casting from request to next-Request, required by clerk ...
      req: request as NextRequest,
      prisma: prisma as unknown as PrismaClient,
    };
  },
  graphqlEndpoint: '/api/graphql',
});

function useAuth(): Plugin {
  return {
    onRequest({ request, fetchAPI, endResponse }) {
      const readOnlyHeader = request.headers[REQ_HEADER_x_coolboard_readonly];
      const isReadOnlyHeader = readOnlyHeader === 'true';

      if (!isReadOnlyHeader) {
        const { userId } = getAuth(request as NextRequest);
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

export default authenticatedHandler;
