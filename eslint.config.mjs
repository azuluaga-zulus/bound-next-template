// eslint.config.mjs — ESLint 9 (flat) + TS + React (sin next plugin roto)

import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  // Ignorar build y dependencias
  { ignores: ['node_modules', '.next', 'out', 'dist'] },

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
  },

  // --- Reglas para separar Server vs Client por convención .client.tsx ---
  {
    files: ['src/app/**/*.{ts,tsx}'],
    ignores: ['**/*.client.tsx'], // excluye componentes cliente de este bloque
    rules: {
      // Prohíbe APIs de navegador en server
      'no-restricted-globals': ['error',
        'window',
        'document',
        'navigator',
        'localStorage',
        'location',
        'history',
        'Worker',
        'File',
        'Blob',
        'BroadcastChannel'
      ],
      'no-restricted-imports': ['error', {
        paths: [
          { name: 'next/router', message: 'App Router: usa next/navigation en client o APIs de server equivalentes.' },
          { name: 'react-dom/client', message: 'Solo en componentes cliente.' }
        ]
      }]
    }
  },
  {
    files: ['**/*.client.{ts,tsx}'],
    // En archivos cliente se permiten APIs de navegador
    rules: {
      'no-restricted-globals': 'off',
      'no-restricted-imports': 'off'
    }
  }
];

