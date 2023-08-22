import React from "react";

import { INDICATOR_POSITION_LEFT } from "..";
import HeaderCell from "./header-cell";
import ExpandHeaderCell from "./row-expand/expand-header-cell";
import withHeaderExpansion from "./row-expand/expand-header-cell-consumer";
import SelectionHeaderCell from "./row-selection/selection-header-cell";
import withHeaderSelection from "./row-selection/selection-header-cell-consumer";

interface HeaderProps {
  columns: any[];
  onSort?: (column: any) => void;
  onFilter?: (filterData: Record<string, any>) => void;
  sortField?: string;
  sortOrder?: string;
  selectRow?: any;
  currFilters?: Record<string, any>;
  onExternalFilter?: (column: any, filterType: string) => (value: any) => void;
  globalSortCaret?: (order: string, column: any) => React.ReactNode;
  className?: string;
  wrapperClasses?: string;
  expandRow?: any;
  filterPosition?: string;
}

const Header: React.FC<HeaderProps> = (props) => {
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
    wrapperClasses,
  } = props;

  let SelectionHeaderCellComp: React.FC = () => null;
  let ExpansionHeaderCellComp: React.FC = () => null;

  if (expandRow?.showExpandColumn) {
    ExpansionHeaderCellComp = withHeaderExpansion(ExpandHeaderCell);
  }

  if (selectRow) {
    SelectionHeaderCellComp = withHeaderSelection(SelectionHeaderCell);
  }

  const isRenderFunctionColumnInLeft = (position = INDICATOR_POSITION_LEFT) =>
    position === INDICATOR_POSITION_LEFT;

  const childrens = columns.map((column, i) => {
    const currSort = column.dataField === sortField;
    const isLastSorting = column.dataField === sortField;

    return (
      <HeaderCell
        index={i}
        key={column.dataField}
        column={column}
        onSort={onSort}
        sorting={currSort}
        sortOrder={sortOrder}
        globalSortCaret={globalSortCaret}
        isLastSorting={isLastSorting}
        onFilter={onFilter}
        currFilters={currFilters}
        onExternalFilter={onExternalFilter}
        filterPosition={filterPosition}
      />
    );
  });

  if (selectRow && !selectRow.hideSelectColumn) {
    if (isRenderFunctionColumnInLeft(selectRow.selectColumnPosition)) {
      childrens.unshift(<SelectionHeaderCellComp key="selection" />);
    } else {
      childrens.push(<SelectionHeaderCellComp key="selection" />);
    }
  }

  if (expandRow?.showExpandColumn) {
    if (isRenderFunctionColumnInLeft(expandRow.expandColumnPosition)) {
      childrens.unshift(<ExpansionHeaderCellComp key="expansion" />);
    } else {
      childrens.push(<ExpansionHeaderCellComp key="expansion" />);
    }
  }

  return (
    <thead className={wrapperClasses}>
      <tr className={className}>{childrens}</tr>
    </thead>
  );
};

export default Header;
