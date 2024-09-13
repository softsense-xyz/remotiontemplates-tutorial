import React from "react"
import { CompositionRoot } from "../../components/CompositionRoot"
import { z } from "zod"
import { popcornSoundVisualizerCompositionSchema } from "./popcornSoundVisualizerCompositionSchema"
import { createArrayOfSize } from "../../util/createArrayOfSize"
import {
    Audio,
    random,
    staticFile,
    useCurrentFrame,
    useVideoConfig,
} from "remotion"
import {
    useAudioData,
    visualizeAudio,
} from "@remotion/media-utils"
import { Vector2 } from "../../util/math/Vector2"
import { Circle } from "../../util/math/Circle"
import type { CalculatePopcornSoundVisualizerMetadataResult } from "./calculatePopcornSoundVisualizerMetadata"

export type PopcornSoundVisualizerCompositionProps =
    z.infer<
        typeof popcornSoundVisualizerCompositionSchema
    > & {
        calculated?: CalculatePopcornSoundVisualizerMetadataResult
    }

export const PopcornSoundVisualizerComposition: React.FC<
    PopcornSoundVisualizerCompositionProps
> = ({ calculated }) => {
    const frame = useCurrentFrame()
    const { fps, width, height } =
        useVideoConfig()

    // const music = staticFile("/NeonNightsShort.m4a")
    // const audioData = useAudioData(music)

    if (!calculated) {
        return null
    }

    // const circleCount = 20
    //
    // const visualization = visualizeAudio({
    //     fps,
    //     frame,
    //     audioData,
    //     numberOfSamples: 1024,
    //     smoothing: true,
    // })
    //
    // const circleStartPositions =
    //     createArrayOfSize(circleCount).map(
    //         (index) => {
    //             const verticalOffset =
    //                 (random(`circle_${index}`) -
    //                     0.5) *
    //                 0.1
    //
    //             const space =
    //                 width / (circleCount + 1)
    //             return new Vector2(
    //                 (index + 1) * space,
    //                 height / 2 + verticalOffset,
    //             )
    //         },
    //     )
    //
    // const circles =
    //     Circle.calculateCollisionBetweenAll(
    //         circleStartPositions.map(
    //             (pos, index) => {
    //                 return new Circle(
    //                     pos,
    //                     visualization[index] *
    //                         400,
    //                 )
    //             },
    //         ),
    //         10,
    //         new Vector2(width, height),
    //     )

    const circles =
        calculated.circlesInFrame[frame]

    return (
        <>
            <Audio src={calculated.musicUrl} />
            <CompositionRoot>
                {circles.map((circle, index) => {
                    return (
                        <circle
                            fill="yellow"
                            cx={circle.center.x}
                            cy={circle.center.y}
                            key={index}
                            r={Math.max(
                                0,
                                circle.radius - 1,
                            )}
                        />
                    )
                })}
            </CompositionRoot>
        </>
    )
}
