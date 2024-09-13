import { random } from "remotion"
import { clampNormal } from "./clamp"

export class Vector2 {
    readonly x: number
    readonly y: number

    static readonly ZERO = new Vector2(0, 0)

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    static random(seed: string | number) {
        return new Vector2(
            random(`${seed}-x`),
            random(`${seed}-y`),
        )
    }

    add(value: number | Vector2): Vector2 {
        if (value instanceof Vector2) {
            return new Vector2(
                this.x + value.x,
                this.y + value.y,
            )
        }
        return new Vector2(
            this.x + value,
            this.y + value,
        )
    }

    subtract(value: number | Vector2): Vector2 {
        if (value instanceof Vector2) {
            return new Vector2(
                this.x - value.x,
                this.y - value.y,
            )
        }
        return new Vector2(
            this.x - value,
            this.y - value,
        )
    }

    multiply(value: number | Vector2): Vector2 {
        if (value instanceof Vector2) {
            return new Vector2(
                this.x * value.x,
                this.y * value.y,
            )
        }
        return new Vector2(
            this.x * value,
            this.y * value,
        )
    }

    divide(value: number | Vector2): Vector2 {
        if (value instanceof Vector2) {
            return new Vector2(
                this.x / value.x,
                this.y / value.y,
            )
        }
        return new Vector2(
            this.x / value,
            this.y / value,
        )
    }

    mix(other: Vector2, alpha: number): Vector2 {
        alpha = clampNormal(alpha)

        return this.multiply(1 - alpha).add(
            other.multiply(alpha),
        )
    }

    length(): number {
        return Math.sqrt(
            this.x * this.x + this.y * this.y,
        )
    }

    normalize(): Vector2 {
        const magnitude = this.length()
        if (magnitude === 0) return Vector2.ZERO
        return new Vector2(
            this.x / magnitude,
            this.y / magnitude,
        )
    }

    clampLength(): Vector2 {
        const len = this.length()
        if (len > 1) {
            return this.normalize()
        }
        return this
    }

    toString(): string {
        return `Vector2 [X: ${this.x}, Y: ${this.y}]`
    }
}
