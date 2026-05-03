import { defineConfig } from '@eddeee888/gcg-operation-location-migration';

import type { CodegenConfig } from '@graphql-codegen/cli';
import type { Types } from '@graphql-codegen/plugin-helpers';
import { lexicographicSortSchema, printSchema } from 'graphql';

import { buildSchema } from './server/src/buildSchema';

const clientSide: Types.ConfiguredOutput | Types.ConfiguredPlugin[] = {
  //schema: printSchema(lexicographicSortSchema(buildSchema())),
  schema: 'server/src/schema/schema.graphql',
  documents: ['src/common/**/*.graphql', 'src/components/**/*.graphql'],
  preset: 'client',
  plugins: [
    //'typescript', #
    //'typescript-operations',
    //'typescript-react-apollo',
    ///nope'typescript-apollo-client-helpers',
  ],
  presetConfig: {
    // codegen's masking is incompatible with apollo with preset-client:
    // https://www.apollographql.com/docs/react/data/fragments#with-the-client-preset
    // disables the incompatible GraphQL Codegen fragment masking feature:
    fragmentMasking: false,
  },
  config: {
    reactApolloVersion: 4,
    withHooks: true,

    // need to add when fragmentMasking is disabled:
    // https://www.apollographql.com/docs/react/data/fragments#with-the-client-preset
    customDirectives: {
      apolloUnmask: true,
    },
    inlineFragmentTypes: 'mask',
  },
};

const config: CodegenConfig = {
  overwrite: true,
  //schema: printSchema(lexicographicSortSchema(buildSchema())),
  schema: 'server/src/schema/schema.graphql', // 👈 This points to your usual GraphQL schema endpoint or files.
  documents: 'src/**/*.graphql', // 👈 This points to your operation files.
  generates: {
    /*
     * 💡 Example of index file generation approach
     * Once migrated, you can remove this completely
     */
    // 'src/generated/types.ts': {
    //  plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    // },

    /*
     * 💡 Example of near-operation file approach
     * Once migrated, you can remove this completely
     */
    /*
    'src/generated/graphql.ts': {
      plugins: ['typescript'],
    },
    './src/': {
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: './graphql/types.ts',
        extension: '.generated.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
    },

     */

    // 💡 Codemod config example
    // `src/` is the base path where we want to run the codemod.
    'src/': defineConfig({
      //  targetStyle: 'near-operation-file',
      tsConfigFilePath: './tsconfig.json', // 👈 Path from project root to your project tsconfig.json (Note: not from the base path).
      gqlTag: {
        name: 'gql', // 👈 The tag used to parse operation documents.
        importFrom: './gql', // 👈 The the module to import the graphql tag.
        importType: 'relative', // 👈 Whether `importFrom` is relative or absolute. If relative, the path from the base path to the module.
      },
      hooksImportFrom: '@apollo/client/react', // 👈 The module to import Apollo Client hooks. Use @apollo/client for older Apollo Client v3 versions.
    }),
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};

export default config;
