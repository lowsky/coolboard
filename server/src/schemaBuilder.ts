import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import WithInputPlugin from '@pothos/plugin-with-input';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Prisma, PrismaClient } from '@prisma/client';
import { DateTimeResolver } from 'graphql-scalars';
import ws from 'ws';

// Using a type only import will help avoid issues with undeclared
// exports in esm mode
import type PrismaTypes from '@pothos/plugin-prisma/generated';

import { Ctxt } from './resolvers/Context';
import { isLocalDev } from './helpers/logging';

neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);

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
  // optional
  withInput: {
    typeOptions: {
      // default options for Input object types created by this plugin
    },
    argOptions: {
      // set required: false to override default behavior
    },
  },
  prisma: {
    dmmf: Prisma.dmmf,

    client: prisma,

    // defaults to false, uses /// comments from prisma schema as descriptions
    // for object types, relations and exposed fields.
    // descriptions can be omitted by setting description to false

    exposeDescriptions: false, ////boolean | { models: boolean, fields: boolean },

    // use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
    filterConnectionTotalCount: true,
  },
});

// for createAt, etc. field
builder.addScalarType('DateTime', DateTimeResolver, {});

builder.queryType({});

builder.mutationType({});

export default builder;
