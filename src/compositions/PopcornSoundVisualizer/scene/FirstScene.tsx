import { createArrayOfSize } from "../../../util/createArrayOfSize"
import { useVideoConfig } from "remotion"
import { useColorPalette } from "../../../util/useColorPalette"

export default () => {
    // Retrieve the background color from a globally configured
    // color palette in this example.
    const { primary } = useColorPalette()

    const { width, height } = useVideoConfig()

    const circleCount = 19

    // Create a couple circles evenly distributed horizontally
    const circlePositions = createArrayOfSize(
        circleCount,
    ).map((index) => {
        const verticalOffset =
            (index % 2 === 0 ? -1 : 1) * 10
        const space = width / (circleCount + 1)
        return {
            x: (index + 1) * space,
            y: height / 2 + verticalOffset,
        }
    })

    return (
        <>
            {circlePositions.map(
                (position, index) => {
                    return (
                        <circle
                            fill={primary}
                            cx={position.x}
                            cy={position.y}
                            key={index}
                            r={10} // A fixed radius for now
                        />
                    )
                },
            )}
        </>
    )
}
