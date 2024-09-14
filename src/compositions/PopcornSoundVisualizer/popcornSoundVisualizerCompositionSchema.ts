import { commonVideoConfigSchema } from "../../util/schema/config"
import { z } from "zod"

export const popcornSoundVisualizerScenes = [
    // Circles are rendered out
    "FirstScene",
    // The effector is working on circles
    "FirstEffectorScene",
    // Same as effector, but the lower frequencies are filtered
    "FirstEffectorLowerFrequenciesScene",
    // Physics is introduced, balls are effecting each other
    "FirstPhysicsScene",
    // First scene where the same physics is precalculated
    "PrecalculatedPhysicsScene",
    // Blended and starting out with zero radius
    "PrecalculatedBlendedPhysicsScene",
    // Faster pop, but slower shrink
    "FinalScene",
] as const

export type PopcornSoundVisualizerScene =
    (typeof popcornSoundVisualizerScenes)[number]

export const popcornSoundVisualizerCompositionSchema =
    commonVideoConfigSchema.extend(
        z.object({
            scene: z.enum(
                popcornSoundVisualizerScenes,
            ),
        }).shape,
    )
