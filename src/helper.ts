import { MicroCMSListAPI } from './types';

/**
 * Extracts only the properties of a type that are of type `MicroCMSListAPI`.
 *
 * @template T - The type to extract properties from.
 */
export type MicroCMSListAPIPropertiesOnly<T> = {
  [K in keyof T as T[K] extends MicroCMSListAPI<any> ? K : never]: T[K];
};
