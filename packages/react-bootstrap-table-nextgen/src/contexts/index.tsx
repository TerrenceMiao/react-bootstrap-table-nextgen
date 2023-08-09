/* eslint camelcase: 0 */
/* eslint no-return-assign: 0 */
/* eslint no-param-reassign: 0 */
/* eslint class-methods-use-this: 0 */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'even... Remove this comment to see the full error message
import EventEmitter from "events";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Component } from "react";
import _ from "../utils";
// @ts-expect-error TS(6142): Module './data-context' was resolved to '/Users/te... Remove this comment to see the full error message
import createDataContext from "./data-context";
// @ts-expect-error TS(6142): Module './column-context' was resolved to '/Users/... Remove this comment to see the full error message
import createColumnMgtContext from "./column-context";
// @ts-expect-error TS(6142): Module './sort-context' was resolved to '/Users/te... Remove this comment to see the full error message
import createSortContext from "./sort-context";
// @ts-expect-error TS(6142): Module './selection-context' was resolved to '/Use... Remove this comment to see the full error message
import SelectionContext from "./selection-context";
// @ts-expect-error TS(6142): Module './row-expand-context' was resolved to '/Us... Remove this comment to see the full error message
import remoteResolver from "../props-resolver/remote-resolver";
import dataOperator from "../store/operators";
import { BootstrapContext } from "./bootstrap";
import RowExpandContext from "./row-expand-context";

const withContext = (Base: any) =>
  class BootstrapTableContainer extends remoteResolver(Component) {
    constructor(props: any) {
      super(props);
      this.DataContext = createDataContext();

      if (props.registerExposedAPI) {
        const exposedAPIEmitter = new EventEmitter();
        exposedAPIEmitter.on(
          "get.table.data",
          (payload: any) => (payload.result = this.table.getData())
        );
        exposedAPIEmitter.on(
          "get.selected.rows",
          (payload: any) =>
            (payload.result = this.selectionContext.getSelected())
        );
        exposedAPIEmitter.on("get.filtered.rows", (payload: any) => {
          if (this.searchContext) {
            payload.result = this.searchContext.getSearched();
          } else if (this.filterContext) {
            payload.result = this.filterContext.getFiltered();
          } else {
            payload.result = this.table.getData();
          }
        });
        props.registerExposedAPI(exposedAPIEmitter);
      }

      if (props.columns.filter((col: any) => col.sort).length > 0) {
        this.SortContext = createSortContext(
          dataOperator,
          this.isRemoteSort,
          this.handleRemoteSortChange
        );
      }

      if (
        props.columnToggle ||
        props.columns.filter((col: any) => col.hidden).length > 0
      ) {
        this.ColumnManagementContext = createColumnMgtContext();
      }

      if (props.selectRow) {
        this.SelectionContext = SelectionContext;
      }

      if (props.expandRow) {
        this.RowExpandContext = RowExpandContext;
      }

      if (props.cellEdit && props.cellEdit.createContext) {
        this.CellEditContext = props.cellEdit.createContext(
          _,
          dataOperator,
          this.isRemoteCellEdit,
          this.handleRemoteCellChange
        );
      }

      if (props.filter) {
        this.FilterContext = props.filter.createContext(
          _,
          this.isRemoteFiltering,
          this.handleRemoteFilterChange
        );
      }

      if (props.pagination) {
        this.PaginationContext = props.pagination.createContext();
      }

      if (props.search && props.search.searchContext) {
        this.SearchContext = props.search.searchContext(
          _,
          this.isRemoteSearch,
          this.handleRemoteSearchChange
        );
      }

      if (props.setDependencyModules) {
        props.setDependencyModules(_);
      }

      if (props.setPaginationRemoteEmitter) {
        props.setPaginationRemoteEmitter(this.remoteEmitter);
      }
    }

    UNSAFE_componentWillReceiveProps(nextProps: any) {
      if (nextProps.columns.filter((col: any) => col.sort).length <= 0) {
        this.SortContext = null;
      } else if (!this.SortContext) {
        this.SortContext = createSortContext(
          dataOperator,
          this.isRemoteSort,
          this.handleRemoteSortChange
        );
      }
      if (!nextProps.pagination && this.props.pagination) {
        this.PaginationContext = null;
      }
      if (nextProps.pagination && !this.props.pagination) {
        this.PaginationContext = nextProps.pagination.createContext(
          this.isRemotePagination,
          this.handleRemotePageChange
        );
      }
      if (!nextProps.cellEdit && this.props.cellEdit) {
        this.CellEditContext = null;
      }
      if (nextProps.cellEdit && !this.props.cellEdit) {
        this.CellEditContext = nextProps.cellEdit.createContext(
          _,
          dataOperator,
          this.isRemoteCellEdit,
          this.handleRemoteCellChange
        );
      }
    }

    renderBase() {
      return (
        rootProps: any,
        filterProps: any,
        searchProps: any,
        sortProps: any,
        paginationProps: any,
        columnToggleProps: any
      ) => (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Base
          ref={(n: any) => (this.table = n)}
          {...this.props}
          {...sortProps}
          {...filterProps}
          {...searchProps}
          {...paginationProps}
          {...columnToggleProps}
          data={rootProps.getData(
            filterProps,
            searchProps,
            sortProps,
            paginationProps
          )}
        />
      );
    }

    renderWithColumnManagementCtx(base: any, baseProps: any) {
      return (
        rootProps: any,
        filterProps: any,
        searchProps: any,
        sortProps: any,
        paginationProps: any
      ) => (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <this.ColumnManagementContext.Provider
          {...baseProps}
          toggles={
            this.props.columnToggle ? this.props.columnToggle.toggles : null
          }
        >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag
          is provided... Remove this comment to see the full error message
          <this.ColumnManagementContext.Consumer>
            {(columnToggleProps: any) =>
              base(
                rootProps,
                filterProps,
                searchProps,
                sortProps,
                paginationProps,
                columnToggleProps
              )
            }
          </this.ColumnManagementContext.Consumer>
        </this.ColumnManagementContext.Provider>
      );
    }

    renderWithSelectionCtx(base: any, baseProps: any) {
      return (
        rootProps: any,
        filterProps: any,
        searchProps: any,
        sortProps: any,
        paginationProps: any
      ) => (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <this.SelectionContext.Provider
          {...baseProps}
          ref={(n: any) => (this.selectionContext = n)}
          selectRow={this.props.selectRow}
          data={rootProps.getData(
            filterProps,
            searchProps,
            sortProps,
            paginationProps
          )}
        >
          {base(
            rootProps,
            filterProps,
            searchProps,
            sortProps,
            paginationProps
          )}
        </this.SelectionContext.Provider>
      );
    }

    renderWithRowExpandCtx(base: any, baseProps: any) {
      return (
        rootProps: any,
        filterProps: any,
        searchProps: any,
        sortProps: any,
        paginationProps: any
      ) => (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <this.RowExpandContext.Provider
          {...baseProps}
          ref={(n: any) => (this.rowExpandContext = n)}
          expandRow={this.props.expandRow}
          data={rootProps.getData(
            filterProps,
            searchProps,
            sortProps,
            paginationProps
          )}
        >
          {base(
            rootProps,
            filterProps,
            searchProps,
            sortProps,
            paginationProps
          )}
        </this.RowExpandContext.Provider>
      );
    }

    renderWithPaginationCtx(base: any) {
      return (
        rootProps: any,
        filterProps: any,
        searchProps: any,
        sortProps: any
      ) => (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <this.PaginationContext.Provider
          ref={(n: any) => (this.paginationContext = n)}
          pagination={this.props.pagination}
          data={rootProps.getData(filterProps, searchProps, sortProps)}
          bootstrap4={this.props.bootstrap4}
          isRemotePagination={this.isRemotePagination}
          remoteEmitter={this.remoteEmitter}
          onDataSizeChange={this.props.onDataSizeChange}
          tableId={this.props.id}
        >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag
          is provided... Remove this comment to see the full error message
          <this.PaginationContext.Consumer>
            {(paginationProps: any) =>
              base(
                rootProps,
                filterProps,
                searchProps,
                sortProps,
                paginationProps
              )
            }
          </this.PaginationContext.Consumer>
        </this.PaginationContext.Provider>
      );
    }

    renderWithSortCtx(base: any, baseProps: any) {
      return (rootProps: any, filterProps: any, searchProps: any) => (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <this.SortContext.Provider
          {...baseProps}
          ref={(n: any) => (this.sortContext = n)}
          defaultSorted={this.props.defaultSorted}
          defaultSortDirection={this.props.defaultSortDirection}
          sort={this.props.sort}
          data={rootProps.getData(filterProps, searchProps)}
        >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag
          is provided... Remove this comment to see the full error message
          <this.SortContext.Consumer>
            {(sortProps: any) =>
              base(rootProps, filterProps, searchProps, sortProps)
            }
          </this.SortContext.Consumer>
        </this.SortContext.Provider>
      );
    }

    renderWithSearchCtx(base: any, baseProps: any) {
      return (rootProps: any, filterProps: any) => (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <this.SearchContext.Provider
          {...baseProps}
          ref={(n: any) => (this.searchContext = n)}
          data={rootProps.getData(filterProps)}
          searchText={this.props.search.searchText}
          dataChangeListener={this.props.dataChangeListener}
        >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag
          is provided... Remove this comment to see the full error message
          <this.SearchContext.Consumer>
            {(searchProps: any) => base(rootProps, filterProps, searchProps)}
          </this.SearchContext.Consumer>
        </this.SearchContext.Provider>
      );
    }

    renderWithFilterCtx(base: any, baseProps: any) {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      return (rootProps: any) => (
        <this.FilterContext.Provider
          {...baseProps}
          ref={(n: any) => (this.filterContext = n)}
          data={rootProps.getData()}
          filter={this.props.filter.options || {}}
          dataChangeListener={this.props.dataChangeListener}
        >
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag
          is provided... Remove this comment to see the full error message
          <this.FilterContext.Consumer>
            {(filterProps: any) => base(rootProps, filterProps)}
          </this.FilterContext.Consumer>
        </this.FilterContext.Provider>
      );
    }

    renderWithCellEditCtx(base: any, baseProps: any) {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      return (rootProps: any) => (
        <this.CellEditContext.Provider
          {...baseProps}
          ref={(n: any) => (this.cellEditContext = n)}
          selectRow={this.props.selectRow}
          cellEdit={this.props.cellEdit}
          data={rootProps.getData()}
        >
          {base(rootProps)}
        </this.CellEditContext.Provider>
      );
    }

    render() {
      const { keyField, columns, bootstrap4 } = this.props;
      const baseProps = { keyField, columns };

      let base = this.renderBase();

      if (this.ColumnManagementContext) {
        base = this.renderWithColumnManagementCtx(base, baseProps);
      }

      if (this.SelectionContext) {
        base = this.renderWithSelectionCtx(base, baseProps);
      }

      if (this.RowExpandContext) {
        base = this.renderWithRowExpandCtx(base, baseProps);
      }

      if (this.PaginationContext) {
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
        base = this.renderWithPaginationCtx(base, baseProps);
      }

      if (this.SortContext) {
        base = this.renderWithSortCtx(base, baseProps);
      }

      if (this.SearchContext) {
        base = this.renderWithSearchCtx(base, baseProps);
      }

      if (this.FilterContext) {
        base = this.renderWithFilterCtx(base, baseProps);
      }

      if (this.CellEditContext) {
        base = this.renderWithCellEditCtx(base, baseProps);
      }

      return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapContext.Provider value={{ bootstrap4 }}>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag
          is provided... Remove this comment to see the full error message
          <this.DataContext.Provider {...baseProps} data={this.props.data}>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx'
            flag is provided... Remove this comment to see the full error
            message
            <this.DataContext.Consumer>{base}</this.DataContext.Consumer>
          </this.DataContext.Provider>
        </BootstrapContext.Provider>
      );
    }
  };

export default withContext;
