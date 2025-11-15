const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'], // Le dice a Jest dónde está tu código
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'] // Busca archivos .test.ts
};


