import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import WithInputPlugin from '@pothos/plugin-with-input';
import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Prisma, PrismaClient } from '@prisma/client';
import { DateTimeResolver } from 'graphql-scalars';
import ws from 'ws';

// Using a type only import will help avoid issues with undeclared
// Exports in esm mode
import type PrismaTypes from '@pothos/plugin-prisma/generated';

import type { Ctxt } from './resolvers/Context';
import { isLocalDev } from './helpers/logging';

neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaNeon({ connectionString });

export const prisma = new PrismaClient({
  errorFormat: 'pretty',
  adapter,
  log:
    //false &&
    isLocalDev // only for query-debugging:
      ? ['query', 'info', `warn`, `error`]
      : ['info', 'warn', 'error'],
});

const builder = new SchemaBuilder<{
  Context: Ctxt;
  Scalars: {
    DateTime: {
      Output: Date;
      Input: Date;
    };
    ID: {
      Output: string;
      Input: string;
    };
  };
  PrismaTypes: PrismaTypes;
}>({
  plugins: [WithInputPlugin, PrismaPlugin],
  // Optional
  withInput: {
    typeOptions: {
      // Default options for Input object types created by this plugin
    },
    argOptions: {
      // Set required: false to override default behavior
    },
  },
  prisma: {
    dmmf: Prisma.dmmf,

    client: prisma,

    // Defaults to false, uses /// comments from prisma schema as descriptions
    // For object types, relations and exposed fields.
    // Descriptions can be omitted by setting description to false

    exposeDescriptions: false, ////boolean | { models: boolean, fields: boolean },

    // Use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
    filterConnectionTotalCount: true,
  },
});

// For createAt, etc. field
builder.addScalarType('DateTime', DateTimeResolver, {});

builder.queryType({});

builder.mutationType({});

export default builder;
