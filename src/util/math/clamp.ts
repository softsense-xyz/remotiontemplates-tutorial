export function clamp(x: number, min: number, max: number): number {
  return Math.min(max, Math.max(x, min))
}

export function clampNormal(x: number): number {
  return clamp(x, 0, 1)
}
