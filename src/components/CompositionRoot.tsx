import { AbsoluteFill, useVideoConfig } from "remotion"
import React from "react"
import { useColorPalette } from "../util/useColorPalette"

type CompositionRootProps = React.PropsWithChildren

export const CompositionRoot: React.FC<CompositionRootProps> = ({
    children,
}: CompositionRootProps) => {
    const { background } = useColorPalette()
    const { width, height } = useVideoConfig()

    return (
        <AbsoluteFill style={{ background }}>
            <svg width={width} height={height}>
                {children}
            </svg>
        </AbsoluteFill>
    )
}
