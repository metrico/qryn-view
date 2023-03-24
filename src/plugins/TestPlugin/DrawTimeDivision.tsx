import React, { FC, useEffect, useRef } from 'react';

interface Props {
  timeWindow: number;
  height: number;
}

const DrawTimeDivision: FC<Props> = ({ timeWindow, height }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const divSize = 1200 / (timeWindow || 60);
    let x = 0 + divSize;
    while (x < 1200) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttributeNS(null, 'id', `div${x}`);
      line.setAttributeNS(null, 'x1', `${x}`);
      line.setAttributeNS(null, 'x2', `${x}`);
      line.setAttributeNS(null, 'y1', `${5}`);
      line.setAttributeNS(null, 'y2', `${height - 5}`);
      line.setAttributeNS(null, 'stroke', 'black');
      line.setAttributeNS(null, 'stroke-width', '1');

      if (svgRef.current) {
        svgRef.current.appendChild(line);
      }

      x += divSize;
    }
  }, [timeWindow, height]);

  return <svg ref={svgRef} width="1200" height={height}></svg>;
};

export default DrawTimeDivision;