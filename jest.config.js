// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    testPathIgnorePatterns: [],
    // setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
    // coveragePathIgnorePatterns: [ ],
    collectCoverageFrom: ["**/*.{jsx,ts,tsx}"],
    moduleFileExtensions: ["js", "json", "jsx", "ts", "d.ts", "tsx"],
    modulePathIgnorePatterns: ["./dist/*"],
    coverageThreshold: {
        global: {
            branches: 100,
            lines: 100,
            statements: 100,
        },
    },
    testTimeout: 1000,
};
