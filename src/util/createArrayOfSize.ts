export function createArrayOfSize(size: number): number[] {
  return [...Array(size).keys()]
}
