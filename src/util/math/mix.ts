import { clampNormal } from "./clamp"

export function mix(x: number, y: number, alpha: number) {
  alpha = clampNormal(alpha)

  return x * (1 - alpha) + y * alpha
}
