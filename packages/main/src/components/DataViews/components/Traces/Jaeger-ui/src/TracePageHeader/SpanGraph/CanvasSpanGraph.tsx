import React, { useEffect, useRef } from "react";
import { getRgbColorByKey } from "../../utils/color-generator";
import renderIntoCanvas from "./render-into-canvas";
import styled from "@emotion/styled";
import useTheme from "@ui/theme/useTheme";

const StyledCanvas = styled.canvas<{ theme: any }>`
    height: 60px;
    position: absolute;
    width: 100%;
`;

type CanvasSpanGraphProps = {
    items: Array<{
        valueWidth: number;
        valueOffset: number;
        serviceName: string;
    }>;
    valueWidth: number;
};

const UnthemedCanvasSpanGraph: React.FC<CanvasSpanGraphProps> = ({
    items,
    valueWidth,
}) => {
    const canvasElm = useRef<HTMLCanvasElement | null>(null);
    const theme = useTheme();

    const getColor = (key: string) => getRgbColorByKey(key, theme);

    useEffect(() => {
        draw();
    }, [items, valueWidth, theme]);

    const draw = () => {
        if (canvasElm.current) {
            renderIntoCanvas(
                canvasElm.current,
                items,
                valueWidth,
                getColor,
                theme.activeBg //autoColor(theme)
            );
        }
    };

    return <StyledCanvas theme={theme} ref={canvasElm} />;
};

export default UnthemedCanvasSpanGraph;
