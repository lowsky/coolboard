import type { CodegenConfig } from '@graphql-codegen/cli';
import { lexicographicSortSchema, printSchema } from 'graphql';
import { buildSchema } from './server/src/buildSchema';
import type { Types } from '@graphql-codegen/plugin-helpers';

const REGENERATE_STATIC_SCHEMA = false;
const schema = REGENERATE_STATIC_SCHEMA
  ? printSchema(lexicographicSortSchema(buildSchema()))
  : 'server/src/schema/schema.graphql';

const clientSide: Types.ConfiguredOutput | Types.ConfiguredPlugin[] = {
  schema,
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
    // if REGENERATE_STATIC_SCHEMA ??
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
