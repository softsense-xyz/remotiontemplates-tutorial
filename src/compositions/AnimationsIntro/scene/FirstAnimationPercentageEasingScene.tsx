import { useColorPalette } from "../../../util/useColorPalette"
import {
    Easing,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
} from "remotion"

export default () => {
    const { primary } = useColorPalette()

    const currentFrame = useCurrentFrame()

    const { fps } = useVideoConfig()

    // Animate the rectangle from 100 to a 1000 (left side's position)
    const [startPos, endPos] = [100, 1000]
    const x = interpolate(
        currentFrame,
        // inputRange
        [0, fps],
        // outputRange
        [startPos, endPos],
        {
            extrapolateRight: "clamp",
            // Learn more about the easing functions at:
            // https://www.remotion.dev/docs/easing
            //
            // This will give an animation that slows down at the end
            easing: Easing.out(Easing.cubic),
        },
    )

    return (
        <rect
            x={x}
            y={100}
            width={100}
            height={100}
            fill={primary}
        />
    )
}
