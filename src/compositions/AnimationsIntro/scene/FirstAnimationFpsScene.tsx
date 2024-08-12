import { useColorPalette } from "../../../util/useColorPalette"
import { useCurrentFrame, useVideoConfig } from "remotion"

export default () => {
    const { primary } = useColorPalette()

    const currentFrame = useCurrentFrame()

    const { fps } = useVideoConfig()
    const elapsedSeconds = currentFrame / fps

    // Adjusted the earlier speed of 20 units for 30fps
    const speed = 600
    const x = speed * elapsedSeconds + 100

    return <rect x={x} y={100} width={100} height={100} fill={primary} />
}
