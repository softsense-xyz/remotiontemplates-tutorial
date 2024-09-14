import { Vector2 } from "./Vector2"

export class Circle {
    readonly center: Vector2
    readonly radius: number

    constructor(center: Vector2, radius: number) {
        this.center = center
        this.radius = radius
    }

    setCenter(position: Vector2): Circle {
        return new Circle(position, this.radius)
    }

    clampInRectangle(
        rectangleSize: Vector2,
    ): Circle {
        // Clamping x coordinate
        const clampedX = Math.max(
            this.radius,
            Math.min(
                this.center.x,
                rectangleSize.x - this.radius,
            ),
        )

        // Clamping y coordinate
        const clampedY = Math.max(
            this.radius,
            Math.min(
                this.center.y,
                rectangleSize.y - this.radius,
            ),
        )

        // Return the circle with its center clamped inside the rectangle
        const clampedPosition = new Vector2(
            clampedX,
            clampedY,
        )
        return this.setCenter(clampedPosition)
    }

    static calculateCollision(
        a: Circle,
        b: Circle,
    ): [Circle, Circle] {
        const delta = b.center.subtract(a.center)
        const distance = delta.length()

        const combinedRadii = a.radius + b.radius

        if (distance > combinedRadii) {
            return [a, b]
        }

        const overlap = combinedRadii - distance
        const separationDirection =
            delta.normalize()

        const weightA = b.radius / combinedRadii
        const weightB = a.radius / combinedRadii

        const moveA =
            separationDirection.multiply(
                overlap * weightA,
            )
        const moveB =
            separationDirection.multiply(
                overlap * weightB,
            )

        const newPositionA =
            a.center.subtract(moveA)
        const newPositionB = b.center.add(moveB)

        return [
            a.setCenter(newPositionA),
            b.setCenter(newPositionB),
        ]
    }

    static calculateCollisionBetweenAll({
        circles: input,
        iterationCount = 1,
        rectangleSize,
    }: {
        circles: Circle[]
        iterationCount?: number
        rectangleSize?: Vector2
    }): Circle[] {
        const circles = [...input]

        for (
            let iter = 0;
            iter < iterationCount;
            iter++
        ) {
            for (
                let i = 0;
                i < circles.length;
                i++
            ) {
                for (
                    let j = i + 1;
                    j < circles.length;
                    j++
                ) {
                    const circleA = circles[i]
                    const circleB = circles[j]

                    const [
                        newCircleA,
                        newCircleB,
                    ] = Circle.calculateCollision(
                        circleA,
                        circleB,
                    )

                    circles[i] = newCircleA
                    circles[j] = newCircleB
                }
            }

            if (rectangleSize) {
                for (
                    let i = 0;
                    i < circles.length;
                    i++
                ) {
                    circles[i] = circles[
                        i
                    ].clampInRectangle(
                        rectangleSize,
                    )
                }
            }
        }

        return circles
    }
}
