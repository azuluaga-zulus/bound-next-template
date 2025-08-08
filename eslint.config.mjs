// eslint.config.mjs — ESLint 9 (flat) + Next 15 + TS + React

import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import nextPlugin from 'eslint-plugin-next';
import globals from 'globals';

export default [
  // Ignorar build y dependencias
  { ignores: ['node_modules', '.next', 'out', 'dist'] },

  // 👇 Next en nivel raíz (así lo detecta Next.js)
  ...nextPlugin.configs['core-web-vitals'],

  // Reglas base JS
  js.configs.recommended,

  // Capa TS/React para tu código en src/**
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': hooksPlugin
    },
    settings: { react: { version: 'detect' } },
    rules: {
      // JSX moderno: no requiere importar React
      'react/react-in-jsx-scope': 'off',
      // Evita falsos positivos con JSX
      'no-undef': 'off',
      // Hooks esenciales
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  }
];
