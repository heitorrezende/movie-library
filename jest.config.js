const nextJest = require('next/jest');

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  dir: './',
});

const config = {
  coverageProvider: 'v8',
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    "/node_modules/(?!swiper|swiper/react).+\\.js$"
  ]
};

module.exports = createJestConfig(config);