import { Vector2 } from "../../../util/math/Vector2"
import {
    getAudioData,
    visualizeAudio,
} from "@remotion/media-utils"
import { sampleMusicUrl } from "../sampleMusicUrl"
import { Circle } from "../../../util/math/Circle"
import { mix } from "../../../util/math/mix"
import { CirclesInFrame } from "../calculatePopcornSoundVisualizerMetadata"

export async function precalculateCirclesBlended({
    startPositions,
    durationInFrames,
    fps,
    screenSize,
    iterationCount,
    multiplier,
    // Specify a "blend" value for both movement and radius.
    // The value must be in the range [0, 1].
    // A value of 1 means only the latest value is considered, ignoring the previous one.
    // If the value is less than 1, the circle will gradually transition toward the target position,
    // instead of instantly updating its size.
    positionBlend = 1,
    radiusBlend = 1,
}: {
    startPositions: Vector2[]
    durationInFrames: number
    fps: number
    screenSize?: Vector2
    iterationCount: number
    multiplier: number
    positionBlend?: number
    radiusBlend?: number
}): Promise<CirclesInFrame> {
    const audioData = await getAudioData(
        sampleMusicUrl,
    )

    const result: CirclesInFrame = []

    for (
        let frame = 0;
        frame < durationInFrames;
        frame++
    ) {
        const visualization = visualizeAudio({
            fps,
            frame,
            numberOfSamples: 1024,
            audioData,
        })

        function getRadius(index: number) {
            return (
                visualization[index] * multiplier
            )
        }

        // Treat the first frame as it was treated in the precalculation scene.
        if (frame === 0) {
            const circles = startPositions.map(
                (center) =>
                    new Circle(
                        center,
                        // Initialize with zero so it does not get overblown
                        0,
                    ),
            )

            result.push(
                Circle.calculateCollisionBetweenAll(
                    {
                        circles,
                        iterationCount:
                            iterationCount,
                        rectangleSize: screenSize,
                    },
                ),
            )
            continue
        }

        // The rest of the frames rely on the previous calculation.
        const circles = result[frame - 1].map(
            (circle, index) => {
                const newPosition =
                    circle.center.mix(
                        startPositions[index],
                        positionBlend,
                    )

                const newRadius = mix(
                    circle.radius,
                    getRadius(index),
                    radiusBlend,
                )

                return new Circle(
                    newPosition,
                    newRadius,
                )
            },
        )
        result.push(
            Circle.calculateCollisionBetweenAll({
                circles,
                iterationCount: iterationCount,
                rectangleSize: screenSize,
            }),
        )
    }

    return result
}
