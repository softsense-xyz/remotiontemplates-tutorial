import {
    CalculateMetadataFunction,
    random,
    staticFile,
} from "remotion"
import { PopcornSoundVisualizerCompositionProps } from "./PopcornSoundVisualizerComposition"
import { Circle } from "../../util/math/Circle"
import { Vector2 } from "../../util/math/Vector2"
import {
    getAudioData,
    visualizeAudio,
} from "@remotion/media-utils"
import { mix } from "../../util/math/mix"
import { createArrayOfSize } from "../../util/createArrayOfSize"

type CirclesInFrame = Circle[][]

export type CalculatePopcornSoundVisualizerMetadataResult =
    {
        musicUrl: string
        circlesInFrame: CirclesInFrame
    }

const musicUrl = staticFile(
    "/NeonNightsShort.m4a",
)

async function calculateCirclesForEachFrame({
    startPositions,
    durationInFrames,
    fps,
    screenSize,
    iterationCount,
    multiplier,
    movementBlend = 1,
    radiusBlend = 1,
}: {
    startPositions: Vector2[]
    durationInFrames: number
    fps: number
    screenSize?: Vector2
    iterationCount: number
    multiplier: number
    movementBlend?: number
    radiusBlend?: number
}): Promise<CirclesInFrame> {
    const audioData = await getAudioData(musicUrl)

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
                    new Circle(
                        center,
                        // Initialize with zero so it does not get overblown
                        0, // getRadius(index),
                    ),
            )

            result.push(
                Circle.calculateCollisionBetweenAll(
                    circles,
                    iterationCount,
                    screenSize,
                ),
            )
            continue
        }

        const newCircles = result[frame - 1].map(
            (circle, index) => {
                const newPosition =
                    circle.center.mix(
                        startPositions[index],
                        movementBlend,
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
            Circle.calculateCollisionBetweenAll(
                newCircles,
                iterationCount,
                screenSize,
            ),
        )
    }

    return result
}

export const calculatePopcornSoundVisualizerMetadata: CalculateMetadataFunction<
    PopcornSoundVisualizerCompositionProps
> = async ({ props }) => {
    const fps = 60
    const width = 1200
    const height = 800

    const durationInFrames = fps * 8

    const circleCount = 16

    const screenSize = new Vector2(width, height)
    // const startPositions = createArrayOfSize(
    //     circleCount,
    // ).map((index) => {
    //     const verticalOffset =
    //         (random(`circle_${index}`) - 0.5) *
    //         0.1
    //
    //     const space = width / (circleCount + 1)
    //     return new Vector2(
    //         (index + 1) * space,
    //         height / 2 + verticalOffset,
    //     )
    // })

    const center = screenSize.divide(2)
    const spiralSpacing = 5 // Control the tightness of the spiral
    const angleIncrement = Math.PI / 6 // Increment angle for each circle (adjust for density)

    const startPositions = createArrayOfSize(
        circleCount,
    ).map((index) => {
        // Calculate the angle and radius for the current circle
        const angle = index * angleIncrement // Each circle moves further along the spiral
        const radius = spiralSpacing * index // The radius increases with each circle

        // Convert polar coordinates to Cartesian coordinates
        const x =
            center.x + radius * Math.cos(angle)
        const y =
            center.y + radius * Math.sin(angle)

        return new Vector2(x, y)
    })

    const circlesInFrame =
        await calculateCirclesForEachFrame({
            iterationCount: 5,
            screenSize,
            fps,
            durationInFrames,
            startPositions,
            multiplier: 250,
            movementBlend: 0.6,
            radiusBlend: 0.8,
        })

    return {
        fps,
        width,
        height,
        // Just make it a couple seconds for now
        durationInFrames,
        props: {
            ...props,
            calculated: {
                musicUrl,
                circlesInFrame,
            },
        },
    }
}
