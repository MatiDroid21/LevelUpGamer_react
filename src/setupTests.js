// src/setupTests.js
import { cleanup } from '@testing-library/react';

// Limpia el DOM después de cada test
afterEach(() => {
  cleanup();
});
