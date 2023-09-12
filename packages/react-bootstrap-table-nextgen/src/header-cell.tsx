import cs from "classnames";
import React, { Component } from "react";

import { Property } from "csstype";
import { FILTERS_POSITION_INLINE, SORT_DESC } from "..";
import eventDelegater from "./cell-event-delegater";
import SortCaret from "./sort/caret";
import SortSymbol from "./sort/symbol";
import _ from "./utils";

interface HeaderCellProps {
  column: {
    dataField: string;
    text: string;
    type?: string;
    isDummyField?: boolean;
    hidden?: boolean;
    headerFormatter?: (
      column: any,
      index: number,
      extraData: any
    ) => React.ReactNode;
    formatter?: (
      cell: any,
      row: any,
      rowIndex: number,
      formatExtraData: any
    ) => React.ReactNode;
    formatExtraData?: any;
    headerClasses?: string | ((column: any, index: number) => string);
    classes?: string | ((cell: any, row: any, rowIndex: number) => string);
    headerStyle?:
      | React.CSSProperties
      | ((column: any, index: number) => React.CSSProperties);
    headerSortingClasses?:
      | string
      | ((
          column: any,
          sortOrder: string,
          isLastSorting: boolean,
          index: number
        ) => string);
    headerSortingStyle?:
      | React.CSSProperties
      | ((
          column: any,
          sortOrder: string,
          isLastSorting: boolean,
          index: number
        ) => React.CSSProperties);
    style?:
      | React.CSSProperties
      | ((cell: any, row: any, rowIndex: number) => React.CSSProperties);
    headerTitle?: boolean | ((column: any, index: number) => boolean | string);
    title?:
      | boolean
      | ((cell: any, row: any, rowIndex: number) => boolean | string);
    headerEvents?: Record<string, (e: React.MouseEvent) => void>;
    events?: Record<
      string,
      (cell: any, row: any, rowIndex: number, e: React.MouseEvent) => void
    >;
    headerAlign?:
      | Property.TextAlign
      | ((column: any, index: number) => Property.TextAlign);
    align?: string | ((cell: any, row: any, rowIndex: number) => string);
    headerAttrs?:
      | React.HTMLAttributes<HTMLTableHeaderCellElement>
      | ((
          column: any,
          index: number
        ) => React.HTMLAttributes<HTMLTableHeaderCellElement>);
    attrs?:
      | React.HTMLAttributes<HTMLTableCellElement>
      | ((
          cell: any,
          row: any,
          rowIndex: number
        ) => React.HTMLAttributes<HTMLTableCellElement>);
    sort?: boolean;
    sortFunc?: (a: any, b: any, order: string, column: any) => number;
    onSort?: (column: any, sortOrder: string) => void;
    sortCaret?: any;
    editor?: object;
    editable?: boolean | ((cell: any, row: any, rowIndex: number) => boolean);
    editCellStyle?:
      | React.CSSProperties
      | ((cell: any, row: any, rowIndex: number) => React.CSSProperties);
    editCellClasses?:
      | string
      | ((cell: any, row: any, rowIndex: number) => string);
    editorStyle?:
      | React.CSSProperties
      | ((cell: any, row: any, rowIndex: number) => React.CSSProperties);
    editorClasses?:
      | string
      | ((cell: any, row: any, rowIndex: number) => string);
    editorRenderer?: (
      editorProps: any,
      value: any,
      row: any,
      column: any,
      rowIndex: number,
      columnIndex: number
    ) => React.ReactNode;
    validator?: (newValue: any, row: any, column: any) => boolean | string;
    filter?: any;
    filterRenderer?: (
      onCustomFilter: (value: any) => void,
      column: any
    ) => React.ReactNode;
    filterValue?: (cell: any, row: any) => string;
    searchable?: boolean;
  };
  index: number;
  onSort?: (column: any) => void;
  sorting?: boolean;
  sortOrder?: string;
  sortCaret?: any;
  isLastSorting?: boolean;
  onFilter?: (filterData: Record<string, any>) => void;
  filterPosition?: string;
  currFilters?: Record<string, any>;
  onExternalFilter?: (column: any, filterType: string) => (value: any) => void;
  globalSortCaret?: (order: string, column: any) => React.ReactNode;
}

class HeaderCell extends eventDelegater(Component)<HeaderCellProps> {
  render() {
    const {
      column,
      index,
      onSort,
      sorting,
      sortOrder,
      isLastSorting,
      onFilter,
      currFilters,
      filterPosition,
      onExternalFilter,
      globalSortCaret,
    } = this.props;

    const {
      text,
      sort,
      sortCaret,
      filter,
      filterRenderer,
      headerTitle,
      headerAlign,
      headerFormatter,
      headerEvents,
      headerClasses,
      headerStyle,
      headerAttrs,
      headerSortingClasses,
      headerSortingStyle,
    } = column;

    const sortCaretfunc = sortCaret || globalSortCaret;

    const delegateEvents = this.delegate(headerEvents);

    const customAttrs = _.isFunction(headerAttrs)
      ? headerAttrs(column, index)
      : headerAttrs || {};

    const cellAttrs: React.HTMLAttributes<HTMLTableHeaderCellElement> = {
      ...customAttrs,
      ...delegateEvents,
      tabIndex: _.isDefined(customAttrs.tabIndex) ? customAttrs.tabIndex : 0,
    };

    let sortSymbol: React.ReactNode;
    let filterElement: React.ReactNode;
    let cellStyle: React.CSSProperties = {};
    let cellClasses = _.isFunction(headerClasses)
      ? headerClasses(column, index)
      : headerClasses;

    if (headerStyle) {
      cellStyle = _.isFunction(headerStyle)
        ? headerStyle(column, index)
        : headerStyle;
      cellStyle = cellStyle ? { ...cellStyle } : cellStyle;
    }

    if (headerTitle) {
      cellAttrs.title = _.isFunction(headerTitle)
        ? (headerTitle(column, index) as string)
        : text;
    }

    if (headerAlign) {
      cellStyle.textAlign = _.isFunction(headerAlign)
        ? headerAlign(column, index)
        : headerAlign;
    }

    if (sort) {
      const customClick = cellAttrs.onClick;
      const customKeyDown = cellAttrs.onKeyDown;
      cellAttrs["aria-label"] = sorting
        ? `${text} sort ${sortOrder}`
        : `${text} sortable`;
      cellAttrs.onKeyUp = (e) => {
        if (e.key === "Enter") {
          onSort?.(column);
          // TODO
          // Error: Argument of type 'KeyboardEvent<HTMLTableHeaderCellElement>' is not assignable to
          // parameter of type 'MouseEvent<HTMLTableHeaderCellElement, MouseEvent>'.
          // if (_.isFunction(customClick)) customClick(e);
          if (_.isFunction(customKeyDown)) customKeyDown(e);
        }
      };
      cellAttrs.onClick = (e) => {
        onSort?.(column);
        if (_.isFunction(customClick)) customClick(e);
      };
      cellAttrs.className = cs(cellAttrs.className, "sortable");

      if (sorting) {
        sortSymbol = sortCaretfunc ? (
          sortCaretfunc(sortOrder || SORT_DESC, column)
        ) : (
          <SortCaret order={sortOrder!} />
        );

        cellClasses = cs(
          cellClasses,
          _.isFunction(headerSortingClasses)
            ? headerSortingClasses(column, sortOrder!, isLastSorting!, index)
            : headerSortingClasses
        );

        cellStyle = {
          ...cellStyle,
          ...(_.isFunction(headerSortingStyle)
            ? headerSortingStyle(column, sortOrder!, isLastSorting!, index)
            : headerSortingStyle),
        };
      } else {
        sortSymbol = sortCaretfunc ? (
          sortCaretfunc(undefined, column)
        ) : (
          <SortSymbol />
        );
      }
    }

    if (cellClasses) cellAttrs.className = cs(cellAttrs.className, cellClasses);
    if (!_.isEmptyObject(cellStyle)) cellAttrs.style = cellStyle;

    if (filterPosition === FILTERS_POSITION_INLINE) {
      if (filterRenderer) {
        const onCustomFilter = onExternalFilter?.(
          column,
          filter?.props.type || ""
        );
        filterElement = filterRenderer(onCustomFilter!, column);
      } else if (filter) {
        filterElement = (
          <filter.Filter
            {...filter.props}
            filterState={currFilters?.[column.dataField]}
            onFilter={onFilter}
            column={column}
          />
        );
      }
    }

    const children: React.ReactNode = headerFormatter
      ? headerFormatter(column, index, {
          sortElement: sortSymbol,
          filterElement,
        })
      : text;

    if (headerFormatter) {
      return React.createElement("th", cellAttrs, children);
    }

    return React.createElement(
      "th",
      cellAttrs,
      children,
      sortSymbol,
      filterElement
    );
  }
}

export default HeaderCell;
