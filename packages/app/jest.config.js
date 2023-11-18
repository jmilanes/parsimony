module.exports = {
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest"
  },
  testEnvironment: "jest-environment-jsdom",
  testEnvironmentOptions: {
    html: `<html><script></script></html>`,
    url: "https://localhost",
    customExportConditions: ["node"]
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFiles: ["<rootDir>/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },
  testPathIgnorePatterns: ["<rootDir>/setupTests.ts/dist"]
};
