import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'server/src/schema/schema.graphql',
  overwrite: true,
  generates: {
    'src/generated/graphql.tsx': {
      documents: ['src/**/*.graphql'],
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};
export default config;
