import { CalculateMetadataFunction } from "remotion"
import { type AnimationsIntroCompositionProps } from "./AnimationsIntroComposition"
import { AnimationIntroScene } from "./animationsIntroCompositionSchema"

function calculateDurationInFrames(
    scene: AnimationIntroScene,
    fps: number,
): number {
    switch (scene) {
        case "AnimateLoopAttempt":
        case "AnimateBackAndForth":
            return fps * 2
        default:
            return fps + 10
    }
}

export const calculateAnimationsIntroMetadata: CalculateMetadataFunction<
    AnimationsIntroCompositionProps
> = async ({ props }) => {
    const fps = 30
    const width = 1200
    const height = 300

    return {
        fps,
        width,
        height,
        durationInFrames:
            calculateDurationInFrames(
                props.scene,
                fps,
            ),
        props,
    }
}
