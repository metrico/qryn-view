import React, { ReactElement } from 'react';

interface MetricRow {
  text: string | ReactElement;
  [key: string]: any;
}

interface MetricsGridProps {
  metricsArray: MetricRow[];
  startY: number;
  x: number;
}

function MetricsGrid(props: MetricsGridProps): { currentY: number, fragment: ReactElement } {
  const { metricsArray, startY, x } = props;
  const rowHeight = 20;

  let rows = [];
  let currentY = startY;
  for (let row of metricsArray) {
    console.log('ROW', row);
    rows.push(
      <g key={`${x},${currentY}`} transform={`translate(${x},${currentY})`}>
        {row.text}
      </g>
    );
    currentY += rowHeight;
  }

  return {
    currentY,
    fragment: <>{rows}</>
  };
}

export default MetricsGrid;