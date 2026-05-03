import type { CodegenConfig } from '@graphql-codegen/cli';
import { lexicographicSortSchema, printSchema } from 'graphql';

import { buildSchema } from './server/src/buildSchema';
import type { Types } from '@graphql-codegen/plugin-helpers';

const clientSide: Types.ConfiguredOutput | Types.ConfiguredPlugin[] = {
  //schema: printSchema(buildSchema()),
  //schema: 'server/src/schema/schema.graphql',
  documents: ['src/**/*.tsx'],
  preset: 'client',
  //plugins: [
  //
  //'typescript',
  //'typescript-operations',
  //'typescript-react-apollo',
  //],
  presetConfig: {
    // codegen's masking is incompatible with apollo with preset-client:
    // https://www.apollographql.com/docs/react/data/fragments#with-the-client-preset
    // disables the incompatible GraphQL Codegen fragment masking feature:
    fragmentMasking: false,
  },
  config: {
    reactApolloVersion: 4,

    // need to add when fragmentMasking is disabled:
    // https://www.apollographql.com/docs/react/data/fragments#with-the-client-preset
    customDirectives: {
      apolloUnmask: true,
    },
    inlineFragmentTypes: 'mask',
  },
};

const config: CodegenConfig = {
  schema: 'server/src/schema/schema.graphql',
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    /* LATER
    'server/src/schema/schema.graphql': {
      schema: printSchema(lexicographicSortSchema(buildSchema())),
      plugins: ['schema-ast'],
      watchPattern: 'server/src/buildSchema.*',
    },
     */
    'src/gql/': clientSide,
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};
export default config;
