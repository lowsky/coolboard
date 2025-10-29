import type { Types } from '@graphql-codegen/plugin-helpers';
import { defineConfig } from '@eddeee888/gcg-operation-location-migration';

import type { CodegenConfig } from '@graphql-codegen/cli';
import { lexicographicSortSchema, printSchema } from 'graphql';

import { buildSchema } from './server/src/buildSchema';

const clientSide: Types.ConfiguredOutput | Types.ConfiguredPlugin[] = {
  schema: printSchema(lexicographicSortSchema(buildSchema())),
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
  schema: printSchema(lexicographicSortSchema(buildSchema())),
  //schema: 'src/**/*.graphqls', // 👈 This points to your usual GraphQL schema endpoint or files.
  documents: ['src/common/**/*.graphql', 'src/components/**/*.graphql'],
  //documents: 'src/**/*.graphql', // 👈 This points to your operation files.
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
    // 'src/graphql/types.ts': {
    //   plugins: ['typescript'],
    // },
    // './src/': {
    //   preset: 'near-operation-file',
    //   presetConfig: {
    //     baseTypesPath: './graphql/types.ts',
    //     extension: '.generated.ts',
    //   },
    //   plugins: ['typescript-operations', 'typescript-react-apollo'],
    // },

    // 💡 Codemod config example
    // `src/` is the base path where we want to run the codemod.
    'src/': defineConfig({
      tsConfigFilePath: './tsconfig.json', // 👈 Path from project root to your project tsconfig.json (Note: not from the base path).
      gqlTag: {
        name: 'graphql', // 👈 The tag used to parse operation documents.
        importFrom: './gql', // 👈 The the module to import the graphql tag.
        importType: 'relative', // 👈 Whether `importFrom` is relative or absolute. If relative, the path from the base path to the module.
      },
      hooksImportFrom: '@apollo/client/react', // 👈 The module to import Apollo Client hooks. Use @apollo/client for older Apollo Client v3 versions.
    }),
  },
};

const config2: CodegenConfig = {
  overwrite: true,
  //schema: 'server/src/schema/schema.graphql',
  generates: {
    'server/src/schema/schema.graphql': {
      schema: printSchema(lexicographicSortSchema(buildSchema())),
      plugins: ['schema-ast'],
      watchPattern: 'server/src/buildSchema.*',
    },
    'src/generated/': clientSide,
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};
export default config;
