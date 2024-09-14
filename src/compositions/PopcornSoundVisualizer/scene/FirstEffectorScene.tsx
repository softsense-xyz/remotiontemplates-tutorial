import {
    useCurrentFrame,
    useVideoConfig,
} from "remotion"
import { useColorPalette } from "../../../util/useColorPalette"
import { createArrayOfSize } from "../../../util/createArrayOfSize"
import { Vector2 } from "../../../util/math/Vector2"
import {
    useAudioData,
    visualizeAudio,
} from "@remotion/media-utils"
import { Circle } from "../../../util/math/Circle"
import { sampleMusicUrl } from "../sampleMusicUrl"

export default ({
    lowerFrequencies = false,
}: {
    lowerFrequencies?: boolean
}) => {
    // staticFile("/NeonNightsShort.m4a")
    const musicUrl = sampleMusicUrl

    const { primary } = useColorPalette()

    const frame = useCurrentFrame()
    const { fps, width, height } =
        useVideoConfig()

    const audioData = useAudioData(musicUrl)
    if (!audioData) {
        return null
    }

    const visualization = visualizeAudio({
        fps,
        frame,
        audioData,
        numberOfSamples: lowerFrequencies
            ? 1024
            : 32,
        smoothing: true,
    })

    const circleCount = 19
    // Create a couple circles evenly distributed horizontally
    const circles = createArrayOfSize(
        circleCount,
    ).map((index) => {
        const verticalOffset =
            (index % 2 === 0 ? -1 : 1) * 10
        const space = width / (circleCount + 1)

        // Keep the center position for now
        const center = new Vector2(
            (index + 1) * space,
            height / 2 + verticalOffset,
        )

        // Adjust the radius based on the visualization.
        // Multiply it by a value to make the circle larger.
        const radius = visualization[index] * 200

        // Use a custom Circle class
        return new Circle(center, radius)
    })

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
