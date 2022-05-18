import React from 'react';

import { getCellLinks } from '../../utils';


export const ImageCell= (props) => {
  const { field, cell, tableStyles, row, cellProps } = props;

  const displayValue = field.display(cell.value);

  const { link, onClick } = getCellLinks(field, row);

  return (
    <div {...cellProps} className={tableStyles.cellContainer}>
      {!link && <img alt={displayValue.text} src={displayValue.text} className={tableStyles.imageCell} />}
      {link && (
        <a
          href={link.href}
          onClick={onClick}
          target={link.target}
          title={link.title}
          className={tableStyles.imageCellLink}
        >
          <img alt={displayValue.text} src={displayValue.text} className={tableStyles.imageCell} />
        </a>
      )}
    </div>
  );
};