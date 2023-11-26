export function getUniqueValuesInArray<T>(array: T[]): T[] {
  return [...new Set(array)];
}
