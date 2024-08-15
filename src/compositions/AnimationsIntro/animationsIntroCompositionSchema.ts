import { z } from "zod"
import { commonVideoConfigSchema } from "../../util/schema/config"

export const animationsIntroScenes = [
    "FirstScene",
    "FirstAnimationScene",
    "FirstAnimationFpsScene",
    "FirstAnimationPercentageScene",
    "FirstAnimationPercentageEasingScene",
    "AnimateLoopAttempt",
    "AnimateBackAndForth",
] as const

export type AnimationIntroScene =
    (typeof animationsIntroScenes)[number]

export const animationsIntroCompositionSchema =
    commonVideoConfigSchema.extend(
        z.object({
            scene: z.enum(animationsIntroScenes),
        }).shape,
    )
