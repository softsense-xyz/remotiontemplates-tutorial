import { useColorPalette } from "../../../util/useColorPalette"
import { CirclesInFrame } from "../calculatePopcornSoundVisualizerMetadata"
import { useCurrentFrame } from "remotion"

export default ({
    circles: circlesInFrame,
}: {
    circles: CirclesInFrame
}) => {
    const { primary } = useColorPalette()
    const frame = useCurrentFrame()

    const circles = circlesInFrame[frame]

    return (
        <>
            {circles.map((circle, index) => {
                return (
                    <circle
                        key={index}
                        fill={primary}
                        cx={circle.center.x}
                        cy={circle.center.y}
                        r={circle.radius}
                    />
                )
            })}
        </>
    )
}
