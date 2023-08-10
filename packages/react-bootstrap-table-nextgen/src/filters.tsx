import React from "react";

import Const from "./const";
import FiltersCell from "./filters-cell";
import RowTemplate from "./row/row-template";

interface FiltersProps {
  columns: any[];
  onFilter?: (filterData: Record<string, any>) => void;
  filterPosition?: string;
  currFilters?: Record<string, any>;
  onExternalFilter?: (column: any, filterType: string) => (value: any) => void;
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
    filterPosition,
    onExternalFilter,
    className,
    selectRow,
    expandRow
  } = props;

  function renderContent() {
    const filterColumns: JSX.Element[] = [];
    let showFiltersRow = false;

    columns.forEach((column, i) => {
      filterColumns.push(
        <FiltersCell
          index={ i }
          key={ column.dataField }
          column={ column }
          currFilters={ currFilters }
          onExternalFilter={ onExternalFilter }
          onFilter={ onFilter }
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
      className={ className }
      style={ {
        display:
          filterPosition === Const.FILTERS_POSITION_TOP
            ? "table-header-group"
            : "table-footer-group"
      } }
    >
      <RowTemplate
        renderContent={ renderContent }
        selectRow={ selectRow }
        expandRow={ expandRow }
        cellEl="td"
      />
    </tbody>
  );
};

// Filters.propTypes = {
//   columns: PropTypes.array.isRequired,
//   onFilter: PropTypes.func,
//   filterPosition: PropTypes.oneOf([
//     Const.FILTERS_POSITION_TOP,
//     Const.FILTERS_POSITION_INLINE,
//     Const.FILTERS_POSITION_BOTTOM,
//   ]),
//   currFilters: PropTypes.object,
//   onExternalFilter: PropTypes.func,
//   className: PropTypes.string,
//   selectRow: PropTypes.object,
//   expandRow: PropTypes.object,
// };

// Filters.defaultProps = {
//   filterPosition: Const.FILTERS_POSITION_TOP,
// };

export default Filters;
