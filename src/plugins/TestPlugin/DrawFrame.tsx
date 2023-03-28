import React, { FC } from "react";

/* Style Controls */
const backElementColor = "rgba(0,0,0,0.1)";

interface Props {
    height: number;
}

const drawFrame: FC<Props> = ({ height }) => {
    return (
        <rect
            id="frame"
            width="1200"
            height={height}
            stroke={backElementColor}
            strokeWidth="2"
            fill="none"
        />
    );
};

export default drawFrame;
