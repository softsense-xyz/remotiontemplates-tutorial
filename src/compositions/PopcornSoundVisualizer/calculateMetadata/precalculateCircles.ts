import { Vector2 } from "../../../util/math/Vector2"
import {
    getAudioData,
    visualizeAudio,
} from "@remotion/media-utils"
import { sampleMusicUrl } from "../sampleMusicUrl"
import { Circle } from "../../../util/math/Circle"
import { mix } from "../../../util/math/mix"
import { CirclesInFrame } from "../calculatePopcornSoundVisualizerMetadata"

export async function precalculateCircles({
    startPositions,
    durationInFrames,
    fps,
    screenSize,
    iterationCount,
    multiplier,
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

        if (frame === 0) {
            const circles = startPositions.map(
                (center, index) =>
                    new Circle(center, 0),
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

        const circles = result[frame - 1].map(
            (circle, index) => {
                const newPosition =
                    circle.center.mix(
                        startPositions[index],
                        positionBlend,
                    )

                const targetRadius =
                    getRadius(index)
                const currentRadius =
                    circle.radius

                const newRadius =
                    // Grows immediately, shrinks gradually.
                    // Gives a better effect when it comes to sudden sounds.
                    targetRadius > currentRadius
                        ? targetRadius
                        : mix(
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
