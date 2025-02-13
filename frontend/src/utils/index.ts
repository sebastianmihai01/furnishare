export * from './validation';
export * from './format';
export * from './storage';
export * from './errorHandler';
export * from './debounce';

// Common utility functions
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const isEmptyObject = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

export const removeEmptyValues = <T extends object>(obj: T): Partial<T> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
}; 