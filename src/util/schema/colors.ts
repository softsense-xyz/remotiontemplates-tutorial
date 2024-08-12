import { z } from "zod"
import { zColor } from "@remotion/zod-types"

export const colorPaletteSchema = z.object({
    background: zColor(),
    primary: zColor(),
})

export const commonColorPaletteObjectSchema = z.object({
    colorPalette: colorPaletteSchema,
})

export type ColorPalette = z.infer<typeof colorPaletteSchema>

export const lightColorPalette: ColorPalette = {
    background: "#fafafa",
    primary: "#EC4899FF",
}

export const darkColorPalette: ColorPalette = {
    background: "#000000",
    primary: "#EC4899FF",
}
