import { Vector2 } from "../../../util/math/Vector2"
import { type CirclesInFrame } from "../calculatePopcornSoundVisualizerMetadata"
import {
    getAudioData,
    visualizeAudio,
} from "@remotion/media-utils"
import { sampleMusicUrl } from "../sampleMusicUrl"
import { Circle } from "../../../util/math/Circle"

export async function precalculateCirclesFirstVersion({
    startPositions,
    durationInFrames,
    fps,
    screenSize,
    iterationCount,
    multiplier,
}: {
    startPositions: Vector2[]
    durationInFrames: number
    fps: number
    screenSize?: Vector2
    iterationCount: number
    multiplier: number
}): Promise<CirclesInFrame> {
    const audioData = await getAudioData(
        sampleMusicUrl,
    )

    const result: CirclesInFrame = []

    // Create an element for each frame.
    // Deliberately using a for-loop instead of `createArrayOfSize`,
    // to be able to access previous elements later.
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
            smoothing: true,
        })

        function getRadius(index: number) {
            return (
                visualization[index] * multiplier
            )
        }

        let circles = startPositions.map(
            (center, index) =>
                new Circle(
                    center,
                    getRadius(index),
                ),
        )

        circles =
            Circle.calculateCollisionBetweenAll({
                circles,
                iterationCount: iterationCount,
                rectangleSize: screenSize,
            })

        result.push(circles)
    }

    return result
}
