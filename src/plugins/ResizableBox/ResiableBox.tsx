import { ResizableBox as ReactResizableBox } from "react-resizable";
import { css, cx } from "@emotion/css";
import { useSelector } from "react-redux";
import { useCallback, useMemo } from "react";

interface ResizableBoxProps {
    height: number;
    minHeight: number;
    maxHeight: number;
    width: number;
    minWidth: number;
    maxWidth: number;
    children: any;
    handle: any;
    axis: Axis;
    resizeHandles?: Array<ResizeHandleAxis>
    onResize: any;
    className: string;
}
type Axis = 'both' | 'x' | 'y' | undefined
type ResizeHandleAxis = 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne';

const getStyles = (theme: string): any =>  {
    return {
    "react-resizable": css`
        position: relative;
    `,
    "react-resizable-handle": css`
        position: absolute;
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-origin: content-box;
        box-sizing: border-box;
        filter: ${theme !== 'dark' ? 'none' : 'invert(100%)'};
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDYiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmYwMCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI2cHgiIGhlaWdodD0iNnB4Ij48ZyBvcGFjaXR5PSIwLjMwMiI+PHBhdGggZD0iTSA2IDYgTCAwIDYgTCAwIDQuMiBMIDQgNC4yIEwgNC4yIDQuMiBMIDQuMiAwIEwgNiAwIEwgNiA2IEwgNiA2IFoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9zdmc+");
        background-position: bottom right;
        padding: 0 3px 3px 0;
    `,
    "react-resizable-handle-sw": css`
        bottom: 0;
        left: 0;
        cursor: sw-resize;
        transform: rotate(90deg);
    `,
    "react-resizable-handle-se": css`
        bottom: -5px;
        right: 10px;
        cursor: se-resize;
    `,
    "react-resizable-handle-nw": css`
        top: 0;
        left: 0;
        cursor: nw-resize;
        transform: rotate(180deg);
    `,
    "react-resizable-handle-ne": css`
        top: 0;
        right: 0;
        cursor: ne-resize;
        transform: rotate(270deg);
    `,
    "react-resizable-handle-w": css`
        top: 50%;
        margin-top: -10px;
        cursor: ew-resize;
        left: 0;
        transform: rotate(135deg);
    `,
    "react-resizable-handle-e": css`
        top: 50%;
        margin-top: -10px;
        cursor: ew-resize;
        right: 0;
        transform: rotate(315deg);
    `,
    "react-resizable-handle-n": css`
        left: 50%;
        margin-left: -10px;
        cursor: ns-resize;
        top: 0;
        transform: rotate(225deg);
    `,
    "react-resizable-handle-s": css`
        left: 50%;
        margin-left: -10px;
        cursor: ns-resize;
        bottom: 0;
        transform: rotate(45deg);
    `
}};
export function ResizableBox(props: ResizableBoxProps) {
    
    const storeTheme = useSelector(({ theme }: any) => theme);
    const { height, width, children, minWidth, maxWidth, minHeight, maxHeight, resizeHandles, onResize, axis, className } = props;
    const styles = getStyles(storeTheme);
    const handleFn = useCallback((axis: ResizeHandleAxis, ref: any) => {
        return <span className={cx(styles[`react-resizable-handle`],styles[`react-resizable-handle-${axis}`])} ref={ref} />;
    },[axis]);  
    const minConstraints = useMemo(():[number, number] => [minWidth, minHeight], [minWidth, minHeight])
    const maxConstraints = useMemo(():[number, number] => [maxWidth, maxHeight], [maxWidth, maxHeight])
    return (
        <ReactResizableBox height={height} width={width} className={cx(styles['react-resizable'], className)}
        minConstraints={minConstraints}
        maxConstraints={maxConstraints}
        axis={axis}
        resizeHandles={resizeHandles}
        onResize={onResize}
        handle={handleFn}>
            {children}
        </ReactResizableBox>
    );
}
