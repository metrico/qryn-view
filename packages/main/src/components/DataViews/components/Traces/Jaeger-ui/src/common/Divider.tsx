import { css, cx } from "@emotion/css";
import React from "react";



const DividerStyle = css`
    background: #ddd;
`;

const DividerVertical = css`
    display: inline-block;
    width: 1px;
    height: 0.9em;
    margin: 0 8px;
    vertical-align: middle;
`;

const DividerHorizontal = css`
    display: block;
    height: 1px;
    width: 100%;
    margin: 24px 0;
    clear: both;
    position: relative;
    top: -0.06em;
`;

interface Props {
    className?: string;
    style?: React.CSSProperties;
    type?: "vertical" | "horizontal";
}
export function Divider({ className, style, type }: Props) {
    return (
        <div
            style={style}
              className={cx(
                DividerStyle,
                type === 'horizontal' ? DividerHorizontal : DividerVertical,
                className
              )}
        />
    );
}
