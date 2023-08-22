import React from "react";

import { FILTERS_POSITION_TOP } from "..";
import FiltersCell from "./filters-cell";
import RowTemplate from "./row/row-template";

interface FiltersProps {
  columns: any[];
  onFilter?: (filterData: Record<string, any>) => React.ReactNode;
  filterPosition?: string;
  currFilters?: Record<string, any>;
  onExternalFilter?: (column: any, filterType: string) => (value: any) => Function;
  className?: string;
  selectRow?: any;
  expandRow?: any;
  onSort?: (filterData: Record<string, any>) => void;
}

const Filters: React.FC<FiltersProps> = (props) => {
  const {
    columns,
    onFilter,
    currFilters,
    filterPosition = FILTERS_POSITION_TOP,
    onExternalFilter,
    className,
    selectRow,
    expandRow,
  } = props;

  function renderContent() {
    const filterColumns: JSX.Element[] = [];
    let showFiltersRow = false;

    columns.forEach((column, i) => {
      filterColumns.push(
        <FiltersCell
          index={i}
          key={column.dataField}
          column={column}
          currFilters={currFilters}
          onExternalFilter={onExternalFilter}
          onFilter={onFilter}
        />
      );

      if (column.filterRenderer || column.filter) {
        if (!showFiltersRow) {
          showFiltersRow = true;
        }
      }
    });
    return filterColumns;
  }

  return (
    <tbody
      className={className}
      style={{
        display:
          filterPosition === FILTERS_POSITION_TOP
            ? "table-header-group"
            : "table-footer-group",
      }}
    >
      <RowTemplate
        renderContent={renderContent}
        selectRow={selectRow}
        expandRow={expandRow}
        cellEl="td"
      />
    </tbody>
  );
};

export default Filters;
