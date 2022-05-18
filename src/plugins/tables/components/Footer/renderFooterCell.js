export function renderFooterCell(column, tableStyles, height) {
    const footerProps = column.getHeaderProps();
  
    if (!footerProps) {
      return null;
    }
  
    footerProps.style = footerProps.style ?? {};
    footerProps.style.position = 'absolute';
    footerProps.style.justifyContent = (column ).justifyContent;

    if (height) {

      footerProps.style.height = height;

    }
  
    return (
      <th className={tableStyles.headerCell} {...footerProps}>
        {column.render('Footer')}
      </th>
    );
  }
  