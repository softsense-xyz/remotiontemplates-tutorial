describe("mutable", () => {
    class Vector2 {
        x: number
        y: number

        constructor(x: number, y: number) {
            this.x = x
            this.y = y
        }

        // Does this function create a copy
        // or this is just a convenience return?
        add(other: Vector2): Vector2 {
            this.x += other.x
            this.y += other.y
            return this
        }
    }

    class Circle {
        center: Vector2
        radius: number

        constructor(
            center: Vector2,
            radius: number,
        ) {
            this.center = center
            this.radius = radius
        }
    }

    test("same reference problems", () => {
        const center = new Vector2(0, 0)

        const circleA = new Circle(center, 0)
        const circleB = new Circle(center, 0)

        // Both circles have the (0, 0) as their center
        expect(circleA.center.x).toEqual(0)
        expect(circleA.center.y).toEqual(0)
        expect(circleB.center.x).toEqual(0)
        expect(circleB.center.y).toEqual(0)

        // Update only one circle
        circleA.center.x = 10
        expect(circleA.center.x).toEqual(10)
        // But then the other circle is also updated
        // Using "expect" for the test,
        // but actually this is unexpected.
        expect(circleB.center.x).toEqual(10)
    })

    describe("unexpected problem with add", () => {
        test("issue 1", () => {
            const offset = new Vector2(10, 10)

            const resultOffset = offset.add(
                new Vector2(5, 10),
            )

            expect(resultOffset.x).toEqual(15)
            expect(resultOffset.y).toEqual(20)

            // Very hard to follow what is happening,
            // because offset changed as well
            expect(offset.x).toEqual(15)
            expect(offset.y).toEqual(20)
        })

        test("issue 2", () => {
            const offset = new Vector2(1, 1)

            const result = offset
                // Apply the offset twice
                .add(offset) // Adding (1, 1)
                .add(offset) // Adding ?

            expect(result.x).toEqual(4)
            expect(result.y).toEqual(4)
        })
    })
})

class Vector2 {
    // 1) Every field in the object is `readonly`
    readonly x: number
    readonly y: number

    // 2) At least one constructor that initializes all fields
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    // 3) All operations return a new instance
    add(other: Vector2): Vector2 {
        return new Vector2(
            this.x + other.x,
            this.y + other.y,
        )
    }

    // 4) (Optional) Convenience methods to easily copy
    //     Expects
    copy({
        x,
        y,
    }: {
        x?: number
        y?: number
    }): Vector2 {
        return new Vector2(
            typeof x === "undefined" ? this.x : x,
            typeof y === "undefined" ? this.y : y,
        )
    }
}
