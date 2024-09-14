import { z } from "zod"
import { zColor } from "@remotion/zod-types"

export const colorPaletteSchema = z.object({
    background: zColor(),
    background2: z.optional(zColor()),
    primary: zColor(),
})

export const commonColorPaletteObjectSchema =
    z.object({
        colorPalette: colorPaletteSchema,
    })

export type ColorPalette = z.infer<
    typeof colorPaletteSchema
>

// const primary100 = "#fce7f3"
// const primary200 = "#fbcfe8"
// const primary300 = "#f9a8d4"
const primary400 = "#f472b6"
const primary500 = "#ec4899"
// const primary600 = "#db2777"
// const primary700 = "#be185d"
// const primary800 = "#9d174d"
// const primary900 = "#831843"

export const animationsIntroColorPalettes = {
    light: {
        background: "#fafafa",
        primary: primary500,
    },
    dark: {
        background: "#000000",
        primary: primary500,
    },
} satisfies { [key: string]: ColorPalette }

export const popcornSoundVisualizerColorPalettes =
    {
        light: {
            background: "#fafafa",
            primary: primary500,
        },
        dark: {
            background: "#190B28",
            background2: "#321650",
            primary: primary400,
        },
    } satisfies { [key: string]: ColorPalette }

export const darkColorPalette: ColorPalette = {
    background: "#000000",
    primary: primary500,
}
