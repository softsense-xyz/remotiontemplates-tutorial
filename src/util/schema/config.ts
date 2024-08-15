import { z } from "zod"
import { commonColorPaletteObjectSchema } from "./colors"

export const commonVideoConfigSchema =
    commonColorPaletteObjectSchema

export type CommonVideoConfig = z.infer<
    typeof commonVideoConfigSchema
>
