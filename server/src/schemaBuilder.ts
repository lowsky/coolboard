import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import WithInputPlugin from '@pothos/plugin-with-input';
import { DateTimeResolver } from 'graphql-scalars';
import { PrismaClient } from './schema/generated/prisma/client';

import { adapter } from './schema/db';

import PrismaTypes, {
  getDatamodel,
} from './schema/generated/pothos-prisma-types';

import type { Ctxt } from './resolvers/Context';
import { isLocalDev } from './helpers/logging';

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
  DefaultFieldNullability: false;
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
  defaultFieldNullability: false,
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
    dmmf: getDatamodel(),

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
