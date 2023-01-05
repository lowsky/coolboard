import type { CodegenConfig } from '@graphql-codegen/cli';
import { printSchema } from 'graphql';

import { buildSchema } from './server/src/buildSchema';

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    'server/src/schema/schema.new.graphql': {
      schema: printSchema(buildSchema()),
      plugins: ['schema-ast'],
    },
    'src/generated/graphql.tsx': {
      schema: 'server/src/schema/schema.new.graphql',
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
