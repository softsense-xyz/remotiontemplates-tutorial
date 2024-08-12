import { useColorPalette } from "../../../util/useColorPalette"
import { useCurrentFrame } from "remotion"

export default () => {
    const { primary } = useColorPalette()

    // Do something based on the index of the current frame
    // In this case the value is between 0 and 50
    const currentFrame = useCurrentFrame()

    const speed = 20
    const x = speed * currentFrame + 100

    return <rect x={x} y={100} width={100} height={100} fill={primary} />
}
