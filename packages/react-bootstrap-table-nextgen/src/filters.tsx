/* eslint react/require-default-props: 0 */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';

// @ts-expect-error TS(6142): Module './filters-cell' was resolved to '/Users/te... Remove this comment to see the full error message
import FiltersCell from './filters-cell';
import Const from './const';
// @ts-expect-error TS(6142): Module './row/row-template' was resolved to '/User... Remove this comment to see the full error message
import RowTemplate from './row/row-template';

const Filters = (props: any) => {
  const {
    columns,
    onFilter,
    currFilters,
    filterPosition,
    onExternalFilter,
    className,
    selectRow,
    expandRow
  } = props;

  function renderContent() {
    const filterColumns: any = [];
    let showFiltersRow = false;

    columns.forEach((column: any, i: any) => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      filterColumns.push(<FiltersCell
        index={ i }
        key={ column.dataField }
        column={ column }
        currFilters={ currFilters }
        onExternalFilter={ onExternalFilter }
        onFilter={ onFilter }
      />);

      if (column.filterRenderer || column.filter) {
        if (!showFiltersRow) {
          showFiltersRow = true;
        }
      }
    });
    return filterColumns;
  }

  return (
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <tbody
      className={ className }
      style={ {
        display:
        filterPosition === Const.FILTERS_POSITION_TOP
          ? 'table-header-group'
          : 'table-footer-group'
      } }
    >
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <RowTemplate
        renderContent={ renderContent }
        selectRow={ selectRow }
        expandRow={ expandRow }
        cellEl="td"
      />
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </tbody>
  );
};

Filters.propTypes = {
  columns: PropTypes.array.isRequired,
  onFilter: PropTypes.func,
  filterPosition: PropTypes.oneOf([
    Const.FILTERS_POSITION_TOP,
    Const.FILTERS_POSITION_INLINE,
    Const.FILTERS_POSITION_BOTTOM
  ]),
  currFilters: PropTypes.object,
  onExternalFilter: PropTypes.func,
  className: PropTypes.string,
  selectRow: PropTypes.object,
  expandRow: PropTypes.object
};

Filters.defaultProps = {
  position: Const.FILTERS_POSITION_TOP
};

export default Filters;
