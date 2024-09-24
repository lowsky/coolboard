// @ts-check

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import prettierConfigRecommended from 'eslint-plugin-prettier/recommended';
import { FlatCompat } from '@eslint/eslintrc';
import { fixupConfigRules } from '@eslint/compat';
import { includeIgnoreFile } from '@eslint/compat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const patchedNextConfig = fixupConfigRules([...compat.extends('next')]);
const gitignorePath = path.resolve(__dirname, '.gitignore');

const config = [
  ...patchedNextConfig,
  ...ts.configs.recommended,
  prettierConfigRecommended,
  includeIgnoreFile(gitignorePath),
  {
    //    ignores: ['.next/', 'smoketest/', '.yarn/', '.idea/', '.github/'],
    ignores: ['smoketest/', '.yarn/'],
    //ignores: ['smoketest/'],
  },
  { rules: { '@typescript-eslint/no-explicit-any': 'off' } },
];

export default config;
