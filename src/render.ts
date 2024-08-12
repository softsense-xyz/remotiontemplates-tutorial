import {
    BrowserLog,
    LogLevel,
    renderFrames,
    RenderFramesOptions,
    renderMedia,
    RenderMediaOptions,
    selectComposition,
} from "@remotion/renderer"
import { bundle } from "@remotion/bundler"
import { animationsIntroScenes } from "./compositions/AnimationsIntro/animationsIntroCompositionSchema"
import { CommonVideoConfig } from "./util/schema/config"
import path from "path"
import { darkColorPalette, lightColorPalette } from "./util/schema/colors"
import * as fs from "node:fs"

main().catch(console.error).then(console.log)

// ===

const renders = [
    { compositionId: "AnimationsIntro", scenes: animationsIntroScenes },
] as const

const colorPalettes = [
    { name: "light", palette: lightColorPalette },
    { name: "dark", palette: darkColorPalette },
]

async function main() {
    const bundleLocation = await bundle({
        entryPoint: "./src/index.ts",
    })

    const logLevel: LogLevel = "info"

    for (const renderArgs of renders) {
        const { compositionId, scenes } = renderArgs

        for (const scene of scenes) {
            for (const colorPalette of colorPalettes) {
                const renderArgs: RenderArgs = {
                    compositionId,
                    bundleLocation,
                    logLevel,
                    outDirBase: `out/${compositionId}/${scene}/${colorPalette.name}`,
                    inputProps: {
                        colorPalette: colorPalette.palette,
                        scene,
                    },
                }

                await renderFrame(renderArgs)
            }
        }
    }
}

type SceneConfig<SceneType = unknown> = CommonVideoConfig & { scene: SceneType }

type RenderArgs = {
    bundleLocation: string
    logLevel: LogLevel
    compositionId: string
    outDirBase: string
    inputProps: SceneConfig
}

async function renderFrame({
    bundleLocation,
    logLevel,
    compositionId,
    outDirBase,
    inputProps,
}: RenderArgs) {
    const videoConfig = await selectComposition({
        serveUrl: bundleLocation,
        id: compositionId,
        onBrowserLog,
        inputProps,
        logLevel,
    })

    const commonOptions = {
        composition: videoConfig,
        serveUrl: bundleLocation,
        scale: 1,
        onStart,
        onBrowserLog,
        logLevel,
    } satisfies Partial<RenderFramesOptions> & Partial<RenderMediaOptions>

    // Render first frame of the video
    {
        const frameOutputLocation = path.join(outDirBase, "frame")
        await renderFrames({
            ...commonOptions,
            outputDir: frameOutputLocation,
            frameRange: 0,
            onFrameUpdate,
            inputProps,
        })

        const outputLocation = path.join(frameOutputLocation, "element-0.jpeg")
        const targetLocation = path.join(outDirBase, "frame.jpeg")
        fs.renameSync(outputLocation, targetLocation)
        fs.rmSync(frameOutputLocation, { force: true, recursive: true })
    }

    // Render the video
    {
        const videoOutputLocation = path.join(outDirBase, "video.mp4")
        await renderMedia({
            ...commonOptions,
            outputLocation: videoOutputLocation,
            inputProps,
            codec: "h264",
            imageFormat: "jpeg",
            jpegQuality: 85,
        })
    }
}

function onStart() {
    console.log("Starting rendering...")
}

function onFrameUpdate(
    framesRendered: number,
    frame: number,
    timeToRenderInMilliseconds: number,
) {
    console.log(`${framesRendered} frames rendered.`)
    console.log(`Frame ${frame} was just rendered.`)
    console.log(`It took ${timeToRenderInMilliseconds}ms to render that frame.`)
}

function onBrowserLog(info: BrowserLog) {
    console.log(`${info.type}: ${info.text}`)
    console.log(
        info.stackTrace
            .map((stack) => {
                return `  ${stack.url}:${stack.lineNumber}:${stack.columnNumber}`
            })
            .join("\n"),
    )
}
