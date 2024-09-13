import { Composition } from "remotion"
import { animationsIntroCompositionSchema } from "./compositions/AnimationsIntro/animationsIntroCompositionSchema"
import { AnimationsIntroComposition } from "./compositions/AnimationsIntro/AnimationsIntroComposition"
import { calculateAnimationsIntroMetadata } from "./compositions/AnimationsIntro/calculateAnimationsIntroMetadata"
import { darkColorPalette } from "./util/schema/colors"
import { PopcornSoundVisualizerComposition } from "./compositions/PopcornSoundVisualizer/PopcornSoundVisualizerComposition"
import { popcornSoundVisualizerCompositionSchema } from "./compositions/PopcornSoundVisualizer/popcornSoundVisualizerCompositionSchema"
import { calculatePopcornSoundVisualizerMetadata } from "./compositions/PopcornSoundVisualizer/calculatePopcornSoundVisualizerMetadata"

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
    // Some default value provided for type safety,
    // but these will be calculated in the
    // calculateMetadata function.
    const overwrittenProperties = {
        durationInFrames: 1,
        fps: 1,
        width: 10,
        height: 10,
    }

    return (
        <>
            <Composition
                {...overwrittenProperties}
                id={"AnimationsIntro"}
                component={
                    AnimationsIntroComposition
                }
                schema={
                    animationsIntroCompositionSchema
                }
                calculateMetadata={
                    calculateAnimationsIntroMetadata
                }
                defaultProps={{
                    colorPalette:
                        darkColorPalette,
                    scene: "AnimateBackAndForth" as const,
                }}
            />

            <Composition
                {...overwrittenProperties}
                id={"PopcornSoundVisualizer"}
                component={
                    PopcornSoundVisualizerComposition
                }
                schema={
                    popcornSoundVisualizerCompositionSchema
                }
                calculateMetadata={
                    calculatePopcornSoundVisualizerMetadata
                }
                defaultProps={{
                    colorPalette:
                        darkColorPalette,
                    // scene: "AnimateBackAndForth" as const,
                }}
            />
        </>
    )
}
