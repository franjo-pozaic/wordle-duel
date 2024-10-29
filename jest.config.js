export default {
    preset: 'ts-jest', // Enables TypeScript support
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    transformIgnorePatterns: [
        'node_modules/(?!(some-esm-module|another-esm-module)/)' // If needed to transpile ESM modules
    ],
};
