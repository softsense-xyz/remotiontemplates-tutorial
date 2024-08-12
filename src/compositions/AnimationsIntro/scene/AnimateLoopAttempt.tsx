import { useColorPalette } from "../../../util/useColorPalette"
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion"

function calculateAnimation({
    currentFrame,
    loopFrameCount,
    outputRange,
}: {
    currentFrame: number
    loopFrameCount: number
    outputRange: readonly [number, number]
}): number {
    const remainder = currentFrame % loopFrameCount

    return interpolate(
        remainder,
        // inputRange
        [0, loopFrameCount],
        outputRange,
        {
            // Setting it to "wrap" would result in the same output.
            // Calculating the remainder would not be needed.
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
        },
    )
}

export default () => {
    const { primary } = useColorPalette()

    const currentFrame = useCurrentFrame()

    const { fps } = useVideoConfig()

    const x = calculateAnimation({
        currentFrame,
        loopFrameCount: fps,
        outputRange: [100, 1000],
    })

    return <rect x={x} y={100} width={100} height={100} fill={primary} />
}
