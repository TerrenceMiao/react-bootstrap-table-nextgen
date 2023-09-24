import cs from "classnames";
import React from "react";

import {
  BootstrapTableProps,
  FILTERS_POSITION_INLINE,
  ROW_SELECT_DISABLED,
} from "..";
import Body from "./body";
import Caption from "./caption";
import Filters from "./filters";
import Footer from "./footer";
import Header from "./header";
import PropsBaseResolver from "./props-resolver";
import _ from "./utils";

class BootstrapTable extends PropsBaseResolver(
  React.Component<BootstrapTableProps>
) {
  constructor(props: BootstrapTableProps) {
    super(props);

    this.validateProps();
  }

  componentDidUpdate(nextProps: BootstrapTableProps) {
    if (nextProps.onDataSizeChange && !nextProps.pagination) {
      if (nextProps.data.length !== this.props.data.length) {
        nextProps.onDataSizeChange({ dataSize: this.props.data.length });
      }
    }
  }

  // Exposed APIs
  getData = () => this.visibleRows();

  render() {
    const { loading, overlay } = this.props;
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
      bootstrap4 = false,
      striped = false,
      hover = false,
      bordered = true,
      condensed = false,
      noDataIndication = null,
      caption,
      rowStyle,
      rowClasses,
      wrapperClasses,
      rowEvents,
      selectRow = {
        mode: ROW_SELECT_DISABLED,
        selected: [],
        hideSelectColumn: true,
      },
      expandRow = {
        renderer: undefined,
        expanded: [],
        nonExpandable: [],
      },
      cellEdit = {
        mode: null,
        nonEditableRows: [],
      },
      filterPosition = FILTERS_POSITION_INLINE,
    } = this.props;

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
      (col: any) => col.filter || col.filterRenderer
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
            className={this.props.headerClasses}
            wrapperClasses={this.props.headerWrapperClasses}
            sortField={this.props.sortField}
            sortOrder={this.props.sortOrder}
            onSort={this.props.onSort}
            globalSortCaret={this.props.sort && this.props.sort.sortCaret}
            onFilter={this.props.onFilter}
            currFilters={this.props.currFilters}
            onExternalFilter={this.props.onExternalFilter}
            selectRow={selectRow}
            expandRow={expandRow}
            filterPosition={filterPosition}
          />
          {hasFilters && filterPosition !== FILTERS_POSITION_INLINE && (
            <Filters
              columns={columns}
              className={this.props.filtersClasses}
              onSort={this.props.onSort}
              onFilter={this.props.onFilter}
              currFilters={this.props.currFilters}
              filterPosition={this.props.filterPosition}
              onExternalFilter={this.props.onExternalFilter}
              selectRow={selectRow}
              expandRow={expandRow}
            />
          )}
          <Body
            className={this.props.bodyClasses}
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
              className={this.props.footerClasses}
            />
          )}
        </table>
      </div>
    );
  }
}

export default BootstrapTable;
