import { useColorPalette } from "../../../util/useColorPalette"
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion"

export default () => {
    const { primary } = useColorPalette()

    const currentFrame = useCurrentFrame()

    const { fps } = useVideoConfig()

    // Move the rectangle from 100 to a 1000 (left side's position)
    const [startPos, endPos] = [100, 1000]
    const x = interpolate(
        currentFrame,
        // inputRange
        [0, fps],
        // outputRange
        [startPos, endPos],
        {
            // It means it should stop at the endPos after reaching it
            extrapolateRight: "clamp",
        },
    )

    return <rect x={x} y={100} width={100} height={100} fill={primary} />
}
