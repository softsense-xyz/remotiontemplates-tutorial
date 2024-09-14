import { CalculateMetadataFunction } from "remotion"
import { PopcornSoundVisualizerCompositionProps } from "./PopcornSoundVisualizerComposition"
import { Circle } from "../../util/math/Circle"
import { Vector2 } from "../../util/math/Vector2"
import { createArrayOfSize } from "../../util/createArrayOfSize"
import { type PopcornSoundVisualizerScene } from "./popcornSoundVisualizerCompositionSchema"
import { precalculateCirclesFirstVersion } from "./calculateMetadata/precalculateCirclesFirstVersion"
import { precalculateCirclesBlended } from "./calculateMetadata/precalculateCirclesBlended"
import { precalculateCircles } from "./calculateMetadata/precalculateCircles"

/**
 * An array that holds an array of circles for each frame.
 * Should be indexed by the current frame to get an array of circles.
 */
export type CirclesInFrame = Circle[][]

export type CalculatePopcornSoundVisualizerMetadataResult =
    {
        circlesInFrame: CirclesInFrame
    }

async function getCircles({
    scene,
    screenSize,
    fps,
    durationInFrames,
}: {
    scene: PopcornSoundVisualizerScene
    screenSize: Vector2
    fps: number
    durationInFrames: number
}): Promise<CirclesInFrame | undefined> {
    switch (scene) {
        case "FirstScene":
        case "FirstEffectorScene":
        case "FirstEffectorLowerFrequenciesScene":
        case "FirstPhysicsScene":
            return undefined
    }

    const circleCount = 16
    const startPositions = createArrayOfSize(
        circleCount,
    ).map((index) => {
        const verticalOffset =
            (index % 2 === 0 ? -1 : 1) * 10

        const space =
            screenSize.x / (circleCount + 1)
        return new Vector2(
            (index + 1) * space,
            screenSize.y / 2 + verticalOffset,
        )
    })

    switch (scene) {
        case "PrecalculatedPhysicsScene":
            return await precalculateCirclesFirstVersion(
                {
                    iterationCount: 5,
                    fps,
                    durationInFrames,
                    startPositions,
                    multiplier: 600, // Same as in FirstPhysicsScene
                    screenSize,
                },
            )
        case "PrecalculatedBlendedPhysicsScene":
            return await precalculateCirclesBlended(
                {
                    iterationCount: 5,
                    fps,
                    durationInFrames,
                    startPositions,
                    multiplier: 600,
                    screenSize,
                    positionBlend: 0.6,
                    radiusBlend: 0.2,
                },
            )
        case "FinalScene":
            return await precalculateCircles({
                iterationCount: 5,
                fps,
                durationInFrames,
                startPositions,
                multiplier: 600,
                screenSize,
                positionBlend: 0.6,
                radiusBlend: 0.2,
            })
        default:
            return undefined
    }
}

export const calculatePopcornSoundVisualizerMetadata: CalculateMetadataFunction<
    PopcornSoundVisualizerCompositionProps
> = async ({ props }) => {
    const fps = 60
    const width = 1200
    const height = 400
    const durationInFrames = fps * 4

    const screenSize = new Vector2(width, height)

    const circlesInFrame = await getCircles({
        scene: props.scene,
        durationInFrames,
        fps,
        screenSize,
    })

    return {
        fps,
        width,
        height,
        // Just make it a couple seconds for now
        durationInFrames,
        props: {
            ...props,
            calculated: circlesInFrame
                ? {
                      circlesInFrame,
                  }
                : undefined,
        } satisfies PopcornSoundVisualizerCompositionProps,
    }
}
