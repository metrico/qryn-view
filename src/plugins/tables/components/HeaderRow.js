import React from 'react';
import { useStyles2 } from '../../themes';
import { getFieldTypeIcon } from '../../types';
import { Icon } from '../Icon/Icon';
import { Filter } from './Filter';
import { getTableStyles } from './styles';
export const HeaderRow = (props) => {
  const { headerGroups, data, showTypeIcons } = props;
  const tableStyles = useStyles2(getTableStyles);

  return (
    <div role="rowgroup">
      {headerGroups.map((headerGroup) => {
        const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
        return (
          <div
            className={tableStyles.thead}
            {...headerGroupProps}
            key={key}
            role="row"
          >
            {headerGroup.headers.map((column, index) =>
              renderHeaderCell(column, tableStyles, data.fields[index], showTypeIcons)
            )}
          </div>
        );
      })}
    </div>
  );
};

function renderHeaderCell(column, tableStyles, field=null, showTypeIcons=null) {
  const headerProps = column.getHeaderProps();

  if (column.canResize) {
    headerProps.style.userSelect = column.isResizing ? 'none' : 'auto'; // disables selecting text while resizing
  }

  headerProps.style.position = 'absolute';
  headerProps.style.justifyContent = column.justifyContent;

  return (
    <div className={tableStyles.headerCell} {...headerProps} role="columnheader">
      {column.canSort && (
        <>
          <button {...column.getSortByToggleProps()} className={tableStyles.headerCellLabel}>
            {showTypeIcons && (
              <Icon name={getFieldTypeIcon(field)} title={field?.type} size="sm" className={tableStyles.typeIcon} />
            )}
            <div>{column.render('Header')}</div>
            <div>
              {column.isSorted && (column.isSortedDesc ? <Icon name="arrow-down" /> : <Icon name="arrow-up" />)}
            </div>
          </button>
          {column.canFilter && <Filter column={column} tableStyles={tableStyles} field={field} />}
        </>
      )}
      {!column.canSort && column.render('Header')}
      {!column.canSort && column.canFilter && <Filter column={column} tableStyles={tableStyles} field={field} />}
      {column.canResize && <div {...column.getResizerProps()} className={tableStyles.resizeHandle} />}
    </div>
  );
}
