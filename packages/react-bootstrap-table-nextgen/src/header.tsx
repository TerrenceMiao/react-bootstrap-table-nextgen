/* eslint react/require-default-props: 0 */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';

// @ts-expect-error TS(6142): Module './header-cell' was resolved to '/Users/ter... Remove this comment to see the full error message
import HeaderCell from './header-cell';
// @ts-expect-error TS(6142): Module './row-selection/selection-header-cell' was... Remove this comment to see the full error message
import SelectionHeaderCell from './row-selection/selection-header-cell';
// @ts-expect-error TS(6142): Module './row-expand/expand-header-cell' was resol... Remove this comment to see the full error message
import ExpandHeaderCell from './row-expand/expand-header-cell';
// @ts-expect-error TS(6142): Module './row-selection/selection-header-cell-cons... Remove this comment to see the full error message
import withHeaderSelection from './row-selection/selection-header-cell-consumer';
// @ts-expect-error TS(6142): Module './row-expand/expand-header-cell-consumer' ... Remove this comment to see the full error message
import withHeaderExpansion from './row-expand/expand-header-cell-consumer';
import Const from './const';

const Header = (props: any) => {
  const {
    className,
    columns,
    onSort,
    onFilter,
    sortField,
    sortOrder,
    selectRow,
    expandRow,
    currFilters,
    onExternalFilter,
    filterPosition,
    globalSortCaret,
    wrapperClasses
  } = props;

  let SelectionHeaderCellComp = () => null;
  let ExpansionHeaderCellComp = () => null;

  if (expandRow.showExpandColumn) {
    ExpansionHeaderCellComp = withHeaderExpansion(ExpandHeaderCell);
  }

  if (selectRow) {
    SelectionHeaderCellComp = withHeaderSelection(SelectionHeaderCell);
  }

  const isRenderFunctionColumnInLeft = (
    position = Const.INDICATOR_POSITION_LEFT
  ) => position === Const.INDICATOR_POSITION_LEFT;

  const childrens = [
    columns.map((column: any, i: any) => {
      const currSort = column.dataField === sortField;
      const isLastSorting = column.dataField === sortField;

      return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <HeaderCell
          index={ i }
          key={ column.dataField }
          column={ column }
          onSort={ onSort }
          sorting={ currSort }
          sortOrder={ sortOrder }
          globalSortCaret={ globalSortCaret }
          isLastSorting={ isLastSorting }
          onFilter={ onFilter }
          currFilters={ currFilters }
          onExternalFilter={ onExternalFilter }
          filterPosition={ filterPosition }
        />);
    })
  ];

  if (!selectRow.hideSelectColumn) {
    if (isRenderFunctionColumnInLeft(selectRow.selectColumnPosition)) {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      childrens.unshift(<SelectionHeaderCellComp key="selection" />);
    } else {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      childrens.push(<SelectionHeaderCellComp key="selection" />);
    }
  }

  if (expandRow.showExpandColumn) {
    if (isRenderFunctionColumnInLeft(expandRow.expandColumnPosition)) {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      childrens.unshift(<ExpansionHeaderCellComp key="expansion" />);
    } else {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      childrens.push(<ExpansionHeaderCellComp key="expansion" />);
    }
  }

  return (
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <thead className={ wrapperClasses }>
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <tr className={ className }>
        { childrens }
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </tr>
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </thead>
  );
};

Header.propTypes = {
  columns: PropTypes.array.isRequired,
  onSort: PropTypes.func,
  onFilter: PropTypes.func,
  sortField: PropTypes.string,
  sortOrder: PropTypes.string,
  selectRow: PropTypes.object,
  currFilters: PropTypes.object,
  onExternalFilter: PropTypes.func,
  globalSortCaret: PropTypes.func,
  className: PropTypes.string,
  wrapperClasses: PropTypes.string,
  expandRow: PropTypes.object,
  filterPosition: PropTypes.oneOf([
    Const.FILTERS_POSITION_TOP,
    Const.FILTERS_POSITION_INLINE,
    Const.FILTERS_POSITION_BOTTOM
  ])
};

export default Header;
