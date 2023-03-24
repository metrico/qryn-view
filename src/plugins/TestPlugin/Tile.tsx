import { useState } from "react";
interface TileProps {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    tooltipMsg: string;
  }
  
  function Tile(props: TileProps) {
    const [tooltip, setTooltip] = useState<string>('');
  
    const handleMouseOver = (event: React.MouseEvent<SVGRectElement, MouseEvent>) => {
      setTooltip(props.tooltipMsg);
    }
  
    const handleMouseOut = (event: React.MouseEvent<SVGRectElement, MouseEvent>) => {
      setTooltip('');
    }
  
    return (
      <rect
        fill={props.color}
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
        stroke="black"
        strokeWidth="1"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <title>{props.tooltipMsg}</title>
      </rect>
    );
  }
  
  export default Tile;