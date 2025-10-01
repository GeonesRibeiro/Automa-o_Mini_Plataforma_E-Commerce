module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/unit'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  reporters: [
    "default",
    ["jest-junit", {
      outputDirectory: "./reports/junit",
      outputName: "results.xml"
    }]
  ]
};

