/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const config = require('./jest.config');
config.displayName = 'integration-tests';
// config.setupFilesAfterEnv = "<rootDir>/jest-setup.ts"; //Will be used to configure ExpressAPP to test
config.testMatch = ['**/*.test.ts'];
module.exports = config;
