/* eslint-disable */
module.exports = {
	testMatch: ['**/*.test.ts'],
	testTimeout: 60000,
	coveragePathIgnorePatterns: [
		'/node_modules/',
		'.*.xtest.ts',
		'/generated/',
	],
	transform: {
		'^.+\\.(t|j)sx?$': ['@swc-node/jest'],
	},
	testEnvironment: 'node',
	globalSetup: './jest/setup.js',
	globalTeardown: './jest/teardown.js',
}
