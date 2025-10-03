// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import jasmineDom from '@testing-library/jasmine-dom';
import { cleanup } from '@testing-library/react';

beforeAll(() => {
    // Registra todos los matchers: toBeInTheDocument, toHaveTextContent, etc.
    jasmine.addMatchers(jasmineDom);
});

afterEach(() => {
    cleanup();
});