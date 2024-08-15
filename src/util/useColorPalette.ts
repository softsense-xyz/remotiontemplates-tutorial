import { useVideoConfig } from "remotion"
import { z } from "zod"
import {
    ColorPalette,
    commonColorPaletteObjectSchema,
} from "./schema/colors"

export function useColorPalette(): ColorPalette {
    const props = useVideoConfig()
        .props as z.infer<
        typeof commonColorPaletteObjectSchema
    >
    return props.colorPalette
}
