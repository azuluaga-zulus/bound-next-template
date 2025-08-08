import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  // Ignorar build y dependencias
  { ignores: ['node_modules', '.next', 'out', 'dist'] },

  // Reglas JS base
  js.configs.recommended,

  // Reglas para TS/React (aplica a src/*)
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: { jsx: true }  // soporte JSX moderno
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': hooksPlugin
    },
    settings: { react: { version: 'detect' } },
    rules: {
      // JSX moderno: no necesitas "import React from 'react'"
      'react/react-in-jsx-scope': 'off',
      // Evita el falso positivo "'React' is not defined" en JSX
      'no-undef': 'off',
      // Hooks esenciales
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  }
];
