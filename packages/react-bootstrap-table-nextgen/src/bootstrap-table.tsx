import cs from "classnames";
import React from "react";

import Body from "./body";
import Caption from "./caption";
import Const from "./const";
import Filters from "./filters";
import Footer from "./footer";
import Header from "./header";
import PropsBaseResolver from "./props-resolver";
import _ from "./utils";

interface BootstrapTableProps {
  keyField: string;
  data: any[];
  columns: any[];
  bootstrap4: boolean;
  remote: boolean | { pagination: boolean };
  noDataIndication: any;
  striped: boolean;
  bordered: boolean;
  hover: boolean;
  tabIndexCell?: boolean;
  id?: string;
  classes?: string;
  headerClasses?: string;
  bodyClasses?: string;
  wrapperClasses?: string;
  headerWrapperClasses?: string;
  condensed: boolean;
  caption?: React.ReactNode | string;
  pagination?: any;
  filter?: any;
  currFilters?: any;
  cellEdit: any;
  selectRow: any;
  expandRow: any;
  rowStyle?:
    | React.CSSProperties
    | ((row: any, rowIndex: number) => React.CSSProperties);
  rowEvents?: Record<string, any>;
  rowClasses?: string | ((row: any, rowIndex: number) => string);
  filtersClasses?: string;
  filterPosition: string;
  footerClasses?: string;
  sortField?: string;
  sortOrder?: string;
  defaultSorted?: Array<{ dataField: string; order: string }>;
  sort?: {
    dataField: string;
    order: string;
    sortFunc?: (a: any, b: any, order: string, dataField: string) => number;
    sortCaret?: (order: string, column: any) => JSX.Element;
  };
  defaultSortDirection?: string;
  loading?: boolean;
  overlay?: (loading: boolean) => any;
  onTableChange?: (type: string, newState: Record<string, any>) => void;
  onSort?: () => void;
  onFilter?: (filterData: Record<string, any>) => void;
  onExternalFilter?: () => () => void;
  onDataSizeChange?: (options: { dataSize: number }) => void;
  search?: {
    searchText: string;
    searchContext: (cell: any, filterValue: string, row: any) => boolean;
  };
  setDependencyModules?: (deps: Record<string, any>) => void;
}

let propsWithDefault: BootstrapTableProps;

class BootstrapTable extends PropsBaseResolver(
  React.Component<BootstrapTableProps>
) {
  constructor(props: BootstrapTableProps) {
    propsWithDefault = { ...props };
    propsWithDefault.keyField = props.keyField ?? "";
    propsWithDefault.data = props.data ?? [];
    propsWithDefault.columns = props.columns ?? [];
    propsWithDefault.bootstrap4 = props.bootstrap4 ?? false;
    propsWithDefault.remote = props.remote ?? false;
    propsWithDefault.striped = props.striped ?? false;
    propsWithDefault.bordered = props.bordered ?? true;
    propsWithDefault.hover = props.hover ?? false;
    propsWithDefault.condensed = props.condensed ?? false;
    propsWithDefault.noDataIndication = props.noDataIndication ?? null;
    propsWithDefault.selectRow = props.selectRow ?? {
      mode: Const.ROW_SELECT_DISABLED,
      selected: [],
      hideSelectColumn: true,
    };
    propsWithDefault.expandRow = props.expandRow ?? {
      renderer: undefined,
      expanded: [],
      nonExpandable: [],
    };
    propsWithDefault.cellEdit = props.cellEdit ?? {
      mode: null,
      nonEditableRows: [],
    };
    propsWithDefault.filterPosition =
      props.filterPosition ?? Const.FILTERS_POSITION_INLINE;

    super(propsWithDefault);

    this.validateProps();
  }

  componentDidUpdate(nextProps: BootstrapTableProps) {
    if (nextProps.onDataSizeChange && !nextProps.pagination) {
      if (nextProps.data.length !== propsWithDefault.data.length) {
        nextProps.onDataSizeChange({ dataSize: nextProps.data.length });
      }
    }
  }

  // Exposed APIs
  getData = () => this.visibleRows();

  render() {
    const { loading, overlay } = propsWithDefault;
    if (overlay) {
      const LoadingOverlay = overlay(loading!);
      return <LoadingOverlay>{this.renderTable()}</LoadingOverlay>;
    }
    return this.renderTable();
  }

  renderTable() {
    const {
      columns,
      keyField,
      tabIndexCell,
      id,
      classes,
      bootstrap4,
      striped,
      hover,
      bordered,
      condensed,
      noDataIndication,
      caption,
      rowStyle,
      rowClasses,
      wrapperClasses,
      rowEvents,
      selectRow,
      expandRow,
      cellEdit,
      filterPosition,
    } = propsWithDefault;

    const tableWrapperClass = cs("react-bootstrap-table", wrapperClasses);

    const tableClass = cs(
      "table",
      {
        "table-striped": striped,
        "table-hover": hover,
        "table-bordered": bordered,
        [bootstrap4 ? "table-sm" : "table-condensed"]: condensed,
      },
      classes
    );

    const hasFilters = columns.some(
      (col: { filter: any; filterRenderer: any }) =>
        col.filter || col.filterRenderer
    );

    const hasFooter =
      _.filter(columns, (col) => _.has(col, "footer")).length > 0;

    const tableCaption = caption && (
      <Caption bootstrap4={bootstrap4}>{caption}</Caption>
    );

    return (
      <div className={tableWrapperClass}>
        <table id={id} className={tableClass}>
          {tableCaption}
          <Header
            columns={columns}
            className={propsWithDefault.headerClasses}
            wrapperClasses={propsWithDefault.headerWrapperClasses}
            sortField={propsWithDefault.sortField}
            sortOrder={propsWithDefault.sortOrder}
            onSort={propsWithDefault.onSort}
            globalSortCaret={
              propsWithDefault.sort && propsWithDefault.sort.sortCaret
            }
            onFilter={propsWithDefault.onFilter}
            currFilters={propsWithDefault.currFilters}
            onExternalFilter={propsWithDefault.onExternalFilter}
            selectRow={selectRow}
            expandRow={expandRow}
            filterPosition={filterPosition}
          />
          {hasFilters && filterPosition !== Const.FILTERS_POSITION_INLINE && (
            <Filters
              columns={columns}
              className={propsWithDefault.filtersClasses}
              onSort={propsWithDefault.onSort}
              onFilter={propsWithDefault.onFilter}
              currFilters={propsWithDefault.currFilters}
              filterPosition={propsWithDefault.filterPosition}
              onExternalFilter={propsWithDefault.onExternalFilter}
              selectRow={selectRow}
              expandRow={expandRow}
            />
          )}
          <Body
            className={propsWithDefault.bodyClasses}
            data={this.getData()}
            keyField={keyField}
            tabIndexCell={tabIndexCell}
            columns={columns}
            isEmpty={this.isEmpty()}
            visibleColumnSize={this.visibleColumnSize()}
            noDataIndication={noDataIndication}
            cellEdit={cellEdit}
            selectRow={selectRow}
            expandRow={expandRow}
            rowStyle={rowStyle}
            rowClasses={rowClasses}
            rowEvents={rowEvents}
          />
          {hasFooter && (
            <Footer
              data={this.getData()}
              columns={columns}
              selectRow={selectRow}
              expandRow={expandRow}
              className={propsWithDefault.footerClasses}
            />
          )}
        </table>
      </div>
    );
  }
}

export default BootstrapTable;
