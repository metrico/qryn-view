import React, { ReactElement } from 'react';
import Tile from './Tile';

interface TileRow {
  stream?: object;
  [key: string]: any;
}

interface TileGridProps {
  array: TileRow[];
  color: string;
  x: number;
  y: number;
  rowHeight: number;
}

function TileGrid(props: TileGridProps): {currentY: number, fragment: ReactElement} {
  const { array, color, x, y, rowHeight } = props;

  let tiles = [];
  let currentY = y;
  for (let row of array) {
    let tooltipMsg = '';
    if (row.stream) {
      tooltipMsg = JSON.stringify(row.stream);
    } else {
      tooltipMsg = row.toString();
    }
    tiles.push(
      <Tile
        key={`${x},${currentY}`}
        x={x}
        y={currentY}
        width={20}
        height={rowHeight}
        color={color}
        tooltipMsg={tooltipMsg}
      />
    );
    currentY += rowHeight;
  }

  return {
    currentY,
    fragment: <>{tiles}</>
  };
}

export default TileGrid;
