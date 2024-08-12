import { Composition } from "remotion"
import { animationsIntroCompositionSchema } from "./compositions/AnimationsIntro/animationsIntroCompositionSchema"
import { AnimationsIntroComposition } from "./compositions/AnimationsIntro/AnimationsIntroComposition"
import { calculateAnimationsIntroMetadata } from "./compositions/AnimationsIntro/calculateAnimationsIntroMetadata"
import { darkColorPalette } from "./util/schema/colors"

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
                component={AnimationsIntroComposition}
                schema={animationsIntroCompositionSchema}
                calculateMetadata={calculateAnimationsIntroMetadata}
                defaultProps={{
                    colorPalette: darkColorPalette,
                    scene: "AnimateBackAndForth" as const,
                }}
            />
        </>
    )
}
