const getWindow = (): Window | null =>
  typeof window === 'undefined' ? null : window;

// eslint-disable-next-line import/prefer-default-export
export { getWindow };
