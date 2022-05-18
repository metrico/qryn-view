import React from 'react';

import tinycolor from 'tinycolor2';

import { getTextColorForBackground, getCellLinks } from '../../utils';

import { CellActions } from './CellActions';

import { TableCellDisplayMode } from './types';

export function formattedValueToString(val) {
    return `${val.prefix ?? ''}${val.text}${val.suffix ?? ''}`;
  }
export const DefaultCell = (props) => {
  const { field, cell, tableStyles, row, cellProps } = props;

  const inspectEnabled = Boolean((field.config.custom)?.inspect);
  const displayValue = field.display(cell.value);

  let value;
  
  if (React.isValidElement(cell.value)) {
    value = cell.value;
  } else {
    value = formattedValueToString(displayValue);
  }

  const showFilters = field.config.filterable;
  const showActions = (showFilters && cell.value !== undefined) || inspectEnabled;
  const cellStyle = getCellStyle(tableStyles, field, displayValue, inspectEnabled);

  const { link, onClick } = getCellLinks(field, row);

  return (
    <div {...cellProps} className={cellStyle}>
      {!link && <div className={tableStyles.cellText}>{value}</div>}
      {link && (
        <a href={link.href} onClick={onClick} target={link.target} title={link.title} className={tableStyles.cellLink}>
          {value}
        </a>
      )}
      {showActions && <CellActions {...props} previewMode="text" />}
    </div>
  );
};

function getCellStyle(
  tableStyles,
  field,
  displayValue,
  disableOverflowOnHover = false
) {
  if (field.config.custom?.displayMode === TableCellDisplayMode.ColorText) {
    return tableStyles.buildCellContainerStyle(displayValue.color, undefined, !disableOverflowOnHover);
  }

  if (field.config.custom?.displayMode === TableCellDisplayMode.ColorBackgroundSolid) {
    const bgColor = tinycolor(displayValue.color);
    const textColor = getTextColorForBackground(displayValue.color);
    return tableStyles.buildCellContainerStyle(textColor, bgColor.toRgbString(), !disableOverflowOnHover);
  }

  if (field.config.custom?.displayMode === TableCellDisplayMode.ColorBackground) {
    const themeFactor = tableStyles.theme.isDark ? 1 : -0.7;
    const bgColor2 = tinycolor(displayValue.color)
      .darken(10 * themeFactor)
      .spin(5)
      .toRgbString();

    const textColor = getTextColorForBackground(displayValue.color);

    return tableStyles.buildCellContainerStyle(
      textColor,
      `linear-gradient(120deg, ${bgColor2}, ${displayValue.color})`,
      !disableOverflowOnHover
    );
  }

  return disableOverflowOnHover ? tableStyles.cellContainerNoOverflow : tableStyles.cellContainer;
}
