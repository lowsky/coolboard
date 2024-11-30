// @ts-check

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import prettierConfigRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import reactPlugin from 'eslint-plugin-react';
import nextPlugin from '@next/eslint-plugin-next';

import { fixupPluginRules, includeIgnoreFile } from '@eslint/compat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gitignorePath = path.resolve(__dirname, '.gitignore');

const config = [
  {
    files: ['**/*.{js,ts,tsx}'],
    plugins: {
      '@next/next': fixupPluginRules(nextPlugin),
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  prettierConfigRecommended,
  {
    files: ['** / *.{js,tsx}'],
    plugins: {
      react: reactPlugin,
    },
    settings: { react: { version: '18.3' } },
    rules: {
      ...reactPlugin.configs.recommended.rules,
    },
  },
  {
    // Hint: specifying files was needed - else context.getContext failed
    files: ['**/*.{js,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    // ...
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  includeIgnoreFile(gitignorePath),
  {
    // ignore the smoketest folder
    ignores: ['smoketest/', '.yarn/'],
  },
];

export default config;
