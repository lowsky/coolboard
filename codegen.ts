import type { CodegenConfig } from '@graphql-codegen/cli';
import { lexicographicSortSchema, printSchema } from 'graphql';

import { buildSchema } from './server/src/buildSchema';

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    'server/src/schema/schema.graphql': {
      schema: printSchema(lexicographicSortSchema(buildSchema())),
      plugins: ['schema-ast'],
      watchPattern: 'server/src/buildSchema.*',
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};
export default config;
