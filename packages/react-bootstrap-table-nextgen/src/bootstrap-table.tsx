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

let propsWithDefault: BootstrapTableProps;

class BootstrapTable extends PropsBaseResolver(
  React.Component<BootstrapTableProps>
) {
  constructor(props: BootstrapTableProps) {
    super(props);

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
    propsWithDefault.noDataIndication = props.noDataIndication ?? undefined;
    propsWithDefault.selectRow = props.selectRow ?? {
      mode: ROW_SELECT_DISABLED,
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
      props.filterPosition ?? FILTERS_POSITION_INLINE;

    this.validateProps();
  }

  componentDidUpdate(nextProps: BootstrapTableProps) {
    if (nextProps.onDataSizeChange && !nextProps.pagination) {
      if (nextProps.data.length !== this.props.data.length) {
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

    const hasFilters = columns.some((col) => col.filter || col.filterRenderer);

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
          {hasFilters && filterPosition !== FILTERS_POSITION_INLINE && (
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
