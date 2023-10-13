/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { resolve } = require('path');
const root = resolve(__dirname);
module.exports = {
    rootDir: root,
    testEnvironment: 'node',
    clearMocks: true,
    preset: 'ts-jest',
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/main/**',
        '!<rootDir>/src/**/*protocols.ts',
        '!<rootDir>/src/presentation/protocols/*',
        '!<rootDir>/src/domain/**',
        '!<rootDir>/src/infra/logger/**',
        '!<rootDir>/src/shared/**'
    ],
    testPathIgnorePatterns: [
        '<rootDir>/dist'
    ],
    testMatch: [
        '**/?(*.)+(spec|test).ts?(x)'
    ],
};
