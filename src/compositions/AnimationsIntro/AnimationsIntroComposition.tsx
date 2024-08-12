import React from "react"
import { z } from "zod"
import { animationsIntroCompositionSchema } from "./animationsIntroCompositionSchema"
import { CompositionRoot } from "../../components/CompositionRoot"
import FirstScene from "./scene/FirstScene"
import FirstAnimationScene from "./scene/FirstAnimationScene"
import FirstAnimationFpsScene from "./scene/FirstAnimationFpsScene"
import FirstAnimationPercentageScene from "./scene/FirstAnimationPercentageScene"
import FirstAnimationPercentageEasingScene from "./scene/FirstAnimationPercentageEasingScene"
import AnimateBackAndForth from "./scene/AnimateBackAndForth"
import AnimateLoopAttempt from "./scene/AnimateLoopAttempt"

export type AnimationsIntroCompositionProps = z.infer<
    typeof animationsIntroCompositionSchema
>

export const AnimationsIntroComposition: React.FC<
    AnimationsIntroCompositionProps
> = ({ scene }) => {
    function renderScene() {
        switch (scene) {
            case "FirstScene":
                return <FirstScene />
            case "FirstAnimationScene":
                return <FirstAnimationScene />
            case "FirstAnimationFpsScene":
                return <FirstAnimationFpsScene />
            case "FirstAnimationPercentageScene":
                return <FirstAnimationPercentageScene />
            case "FirstAnimationPercentageEasingScene":
                return <FirstAnimationPercentageEasingScene />
            case "AnimateLoopAttempt":
                return <AnimateLoopAttempt />
            case "AnimateBackAndForth":
                return <AnimateBackAndForth />
            default:
                return <FirstScene />
        }
    }

    return <CompositionRoot>{renderScene()}</CompositionRoot>
}
