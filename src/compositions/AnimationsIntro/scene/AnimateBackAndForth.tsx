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

    // A value of either 0 (indicating forward) or 1 (indicating backward)
    const direction = Math.floor(currentFrame / loopFrameCount) % 2
    const isAnimatingBackward = direction === 1

    const interpolatedFrame = isAnimatingBackward
        ? loopFrameCount - remainder
        : remainder

    return interpolate(
        interpolatedFrame,
        // inputRange
        [0, loopFrameCount],
        outputRange,
        {
            extrapolateRight: "clamp",
            easing: isAnimatingBackward
                ? // Also invert the easing function
                  Easing.cubic
                : Easing.out(Easing.cubic),
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
