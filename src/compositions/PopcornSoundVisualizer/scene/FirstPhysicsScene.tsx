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

export default () => {
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
        numberOfSamples: 1024,
        smoothing: true,
    })

    const circleCount = 19

    let circles = createArrayOfSize(
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

        const radius = visualization[index] * 600
        return new Circle(center, radius)
    })

    circles = Circle.calculateCollisionBetweenAll(
        {
            // The circles are created the same way as in the previous example.
            circles,
            // How many iterations the collision will run.
            // Less iteration means there can still be overlapping circles.
            // More iteration is more resource-intensive.
            iterationCount: 5,
            rectangleSize: new Vector2(
                width,
                height,
            ),
        },
    )

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
