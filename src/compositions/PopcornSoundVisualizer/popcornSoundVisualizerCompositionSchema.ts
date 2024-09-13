import { commonVideoConfigSchema } from "../../util/schema/config"
import { z } from "zod"

export const popcornSoundVisualizerCompositionSchema =
    commonVideoConfigSchema.extend(
        z.object({
            //
        }).shape,
    )
