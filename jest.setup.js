// Jest setup file
// Mock environment variables
process.env.VITE_FMP_API_KEY = 'test-api-key';
process.env.VITE_FMP_BASE_URL = 'https://financialmodelingprep.com/stable';

// Mock global fetch
global.fetch = jest.fn();

// Mock console.log for testing debug output
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
};

// Setup testing library
require('@testing-library/jest-dom');