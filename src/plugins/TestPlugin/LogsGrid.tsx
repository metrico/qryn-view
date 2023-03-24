import React, { ReactElement } from "react";

interface LogRow {
    stream: any;
    [key: string]: any;
}

interface LogsGridProps {
    logArray: LogRow[];
    startY: number;
    x: number;
}

function LogsGrid(props: LogsGridProps): {
    currentY: number;
    fragment: ReactElement;
} {
    const { logArray, startY, x } = props;
    const rowHeight = 20;

    let rows = [];
    let currentY = startY;
    for (let row of logArray) {
        console.log("ROW", row);
        rows.push(
            <g
                key={`${x},${currentY}`}
                transform={`translate(${x},${currentY})`}
            >
                <rect
                    fill="#4c7391"
                    x={x}
                    y={currentY}
                    width={20}
                    height={rowHeight}
                    stroke="black"
                    strokeWidth={1}
                />
                <text
                    id={`log${x}`}
                    x={x}
                    y={currentY + rowHeight / 2}
                    z={1000}
                    className="rowText"
                >
                    {JSON.stringify(row.stream)}
                </text>
            </g>
        );
        currentY += rowHeight;
    }

    return {
        currentY,
        fragment: <>{rows}</>,
    };
}

export default LogsGrid;
