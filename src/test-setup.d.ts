/// <reference types="@testing-library/jest-dom" />
/// <reference types="jest-axe" />

import 'vitest';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'vitest' {
  interface Assertion<T = any> extends TestingLibraryMatchers<T, void> {
    toHaveNoViolations(): T;
  }
  interface AsymmetricMatchersContaining<T = any> extends TestingLibraryMatchers<T, void> {
    toHaveNoViolations(): T;
  }
}