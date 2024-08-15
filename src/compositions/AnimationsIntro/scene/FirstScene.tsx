import { useColorPalette } from "../../../util/useColorPalette"

/**
 * First scene illustrating the project setup.
 *
 * Key code elements are highlighted here. For the full setup,
 * you can refer to the GitHub repository.
 */
export default () => {
    // Retrieve the background color from a globally configured
    // color palette in this example.
    const { primary } = useColorPalette()

    // Rect is an SVG element. This example can render SVGs because
    // a parent element has already opened an <svg /> tag.
    return (
        <rect
            x={100}
            y={100}
            width={100}
            height={100}
            fill={primary}
        />
    )
}
