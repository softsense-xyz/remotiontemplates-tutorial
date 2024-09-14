import React from "react"
import { CompositionRoot } from "../../components/CompositionRoot"
import { z } from "zod"
import { popcornSoundVisualizerCompositionSchema } from "./popcornSoundVisualizerCompositionSchema"
import type { CalculatePopcornSoundVisualizerMetadataResult } from "./calculatePopcornSoundVisualizerMetadata"
import FirstScene from "./scene/FirstScene"
import FirstEffectorScene from "./scene/FirstEffectorScene"
import { Audio } from "remotion"
import { sampleMusicUrl } from "./sampleMusicUrl"
import FirstPhysicsScene from "./scene/FirstPhysicsScene"
import PrecalculatedPhyicsScene from "./scene/PrecalculatedPhyicsScene"

export type PopcornSoundVisualizerCompositionProps =
    z.infer<
        typeof popcornSoundVisualizerCompositionSchema
    > & {
        calculated?: CalculatePopcornSoundVisualizerMetadataResult
    }

export const PopcornSoundVisualizerComposition: React.FC<
    PopcornSoundVisualizerCompositionProps
> = ({ calculated, scene }) => {
    function renderScene() {
        switch (scene) {
            case "FirstScene":
                return <FirstScene />
            case "FirstEffectorScene":
                return <FirstEffectorScene />
            case "FirstEffectorLowerFrequenciesScene":
                return (
                    <FirstEffectorScene
                        lowerFrequencies
                    />
                )
            case "FirstPhysicsScene":
                return <FirstPhysicsScene />
            case "PrecalculatedPhysicsScene":
            case "PrecalculatedBlendedPhysicsScene":
            case "FinalScene":
                return (
                    <PrecalculatedPhyicsScene
                        circles={
                            calculated?.circlesInFrame!
                        }
                    />
                )
            default:
                return null
        }
    }

    return (
        <>
            {/*
                Audio can only be declared in the root, otherwise
                the following error would appear:
                "_a.pause is not a function"
             */}
            <Audio src={sampleMusicUrl} />
            <CompositionRoot>
                {renderScene()}
            </CompositionRoot>
        </>
    )
}
