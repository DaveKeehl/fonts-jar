import js from '@eslint/js';
import ts from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: [
      '**/node_modules**',
      '**/dist/**',
      '**/.plasmo/**',
      '**/build/**',
      '**/.DS_Store',
      "**/*.config.*"
    ]
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  prettier,
  {
    plugins: { '@typescript-eslint': ts.plugin },
    languageOptions: {
      parser: ts.parser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  }
];