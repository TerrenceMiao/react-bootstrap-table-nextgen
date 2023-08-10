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
  bootstrap4?: boolean;
  remote?: boolean | { pagination: boolean };
  noDataIndication?: React.ReactNode | (() => React.ReactNode);
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  tabIndexCell?: boolean;
  id?: string;
  classes?: string;
  headerClasses?: string;
  bodyClasses?: string;
  wrapperClasses?: string;
  headerWrapperClasses?: string;
  condensed?: boolean;
  caption?: React.ReactNode | string;
  pagination?: any;
  filter?: any;
  cellEdit?: any;
  selectRow?: any;
  expandRow?: any;
  rowStyle?:
    | React.CSSProperties
    | ((row: any, rowIndex: number) => React.CSSProperties);
  rowEvents?: Record<string, any>;
  rowClasses?: string | ((row: any, rowIndex: number) => string);
  filtersClasses?: string;
  filterPosition?: string;
  footerClasses?: string;
  defaultSorted?: Array<{ dataField: string; order: string }>;
  sort?: {
    dataField: string;
    order: string;
    sortFunc?: (a: any, b: any, order: string, dataField: string) => number;
    sortCaret?: (order: string, column: any) => JSX.Element;
  };
  defaultSortDirection?: string;
  overlay?: (loading: boolean) => JSX.Element;
  onTableChange?: (type: string, newState: Record<string, any>) => void;
  onSort?: (field: string, order: string) => void;
  onFilter?: (filterData: Record<string, any>) => void;
  onExternalFilter?: (filterData: Record<string, any>) => void;
  onDataSizeChange?: (options: { dataSize: number }) => void;
  search?: {
    searchText: string;
    searchContext: (cell: any, filterValue: string, row: any) => boolean;
  };
  setDependencyModules?: (deps: Record<string, any>) => void;
}

class BootstrapTable extends PropsBaseResolver(
  React.Component<BootstrapTableProps>
) {
  constructor(props: BootstrapTableProps) {
    super();
    this.validateProps();
  }

  // TODO
  UNSAFE_componentWillReceiveProps(nextProps: BootstrapTableProps) {
    if (nextProps.onDataSizeChange && !nextProps.pagination) {
      if (nextProps.data.length !== this.props.data.length) {
        nextProps.onDataSizeChange({ dataSize: nextProps.data.length });
      }
    }
  }

  // Exposed APIs
  getData = () => this.visibleRows();

  render() {
    const { loading, overlay } = this.props;
    if (overlay) {
      const LoadingOverlay = overlay(loading);
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
      filterPosition
    } = this.props;

    const tableWrapperClass = cs("react-bootstrap-table", wrapperClasses);

    const tableClass = cs(
      "table",
      {
        "table-striped": striped,
        "table-hover": hover,
        "table-bordered": bordered,
        [bootstrap4 ? "table-sm" : "table-condensed"]: condensed
      },
      classes
    );

    const hasFilters = columns.some((col: { filter: any; filterRenderer: any; }) => col.filter || col.filterRenderer);

    const hasFooter =
      _.filter(columns, (col) => _.has(col, "footer")).length > 0;

    const tableCaption = caption && (
      <Caption bootstrap4={ bootstrap4 }>{caption}</Caption>
    );

    return (
      <div className={ tableWrapperClass }>
        <table id={ id } className={ tableClass }>
          {tableCaption}
          <Header
            columns={ columns }
            className={ this.props.headerClasses }
            wrapperClasses={ this.props.headerWrapperClasses }
            sortField={ this.props.sortField }
            sortOrder={ this.props.sortOrder }
            onSort={ this.props.onSort }
            globalSortCaret={ this.props.sort && this.props.sort.sortCaret }
            onFilter={ this.props.onFilter }
            currFilters={ this.props.currFilters }
            onExternalFilter={ this.props.onExternalFilter }
            selectRow={ selectRow }
            expandRow={ expandRow }
            filterPosition={ filterPosition }
          />
          {hasFilters && filterPosition !== Const.FILTERS_POSITION_INLINE && (
            <Filters
              columns={ columns }
              className={ this.props.filtersClasses }
              onSort={ this.props.onSort }
              onFilter={ this.props.onFilter }
              currFilters={ this.props.currFilters }
              filterPosition={ this.props.filterPosition }
              onExternalFilter={ this.props.onExternalFilter }
              selectRow={ selectRow }
              expandRow={ expandRow }
            />
          )}
          <Body
            className={ this.props.bodyClasses }
            data={ this.getData() }
            keyField={ keyField }
            tabIndexCell={ tabIndexCell }
            columns={ columns }
            isEmpty={ this.isEmpty() }
            visibleColumnSize={ this.visibleColumnSize() }
            noDataIndication={ noDataIndication }
            cellEdit={ cellEdit }
            selectRow={ selectRow }
            expandRow={ expandRow }
            rowStyle={ rowStyle }
            rowClasses={ rowClasses }
            rowEvents={ rowEvents }
          />
          {hasFooter && (
            <Footer
              data={ this.getData() }
              columns={ columns }
              selectRow={ selectRow }
              expandRow={ expandRow }
              className={ this.props.footerClasses }
            />
          )}
        </table>
      </div>
    );
  }
}

export default BootstrapTable;
