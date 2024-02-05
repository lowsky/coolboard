import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';

import { buildSchema } from './server/src/buildSchema';

const clientSide = {
  schema: printSchema(buildSchema()),
  //schema: 'server/src/schema/schema.graphql',
  documents: ['src/**/*.graphql'],
  plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
};
const config: CodegenConfig = {
  overwrite: true,
  generates: {
    'server/src/schema/schema.graphql': {
      schema: printSchema(buildSchema()),
      plugins: ['schema-ast'],
      watchPattern: 'server/src/buildSchema.*',
    },
    'src/generated/graphql.tsx': clientSide,
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};
export default config;
