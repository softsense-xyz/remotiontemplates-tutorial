import { useColorPalette } from "../../../util/useColorPalette"

/**
 * First scene explaining the project setup.
 *
 * Important code is shown here, you can check out the full setup
 * in the GitHub repository.
 */
export default () => {
    // Access the background color from a color palette
    // that is configured globally in this example.
    const { primary } = useColorPalette()

    // Rect is an svg element. This example can render SVGs,
    // because a parent element has opened an <svg /> tag.
    return <rect x={100} y={100} width={100} height={100} fill={primary} />
}
