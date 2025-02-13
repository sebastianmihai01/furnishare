import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import "jest-localstorage-mock";

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  })),
});
