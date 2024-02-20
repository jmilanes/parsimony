module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.ts?$": "ts-jest"
  },
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["<rootDir>/jest.polyfills.js"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["node_modules"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
    uuid: require.resolve("uuid")
  },
  testEnvironmentOptions: {
    customExportConditions: ["node"]
  },
  testPathIgnorePatterns: ["<rootDir>/src/testUtils"],
  // The app tests are integration test, so they test app/backend flow
  // That is why this test time out has been increased
  testTimeout: 15000
};
