/**
 * @type {Config}
 */
export default {
  rootDir: '.',
  verbose: true,
  resetModules: true,
  clearMocks: true,
  silent: true,
  testMatch: ['**/src/**/*.test.js'],
  reporters: ['default', ['github-actions', { silent: false }], 'summary'],
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.server',
    '<rootDir>/.public',
    '<rootDir>/src/__fixtures__',
    '<rootDir>/src/server/common/test-helpers',
    '<rootDir>/.*index\\.js$',
    '<rootDir>/src/server/common/',
    '<rootDir>/src/client/'
  ],
  coverageDirectory: '<rootDir>/coverage',
  transformIgnorePatterns: []
}

/**
 * @import { Config } from 'jest'
 */
