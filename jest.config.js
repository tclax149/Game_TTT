// jest.config.js
// jest.setup.js
import '@testing-library/jest-dom/extend-expect';  

export default {
    transform: {
      "^.+\\.js$": "babel-jest", // Use babel-jest to transpile ES Modules
    },
    testEnvironment: "jsdom", // Use jsdom for DOM-related tests
    moduleFileExtensions: ["js", "json", "jsx", "node"],
    transformIgnorePatterns: [
      "/node_modules/" // Ignore node_modules except for modules you need to transform
    ],
  };
  