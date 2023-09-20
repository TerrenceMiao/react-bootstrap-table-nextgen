import EventEmitter from "events";
import React from "react";
import RemoteResolver from "../props-resolver/remote-resolver";
import dataOperator from "../store/operators";
import _ from "../utils";
import { BootstrapContext } from "./bootstrap";
import createColumnContext from "./column-context";
import createDataContext from "./data-context";
import createRowExpandContext from "./row-expand-context";
import createSelectionContext from "./selection-context";
import createSortContext from "./sort-context";

const withContext = (Base: any) =>
  class BootstrapTableContainer extends RemoteResolver(Base) {
    constructor(props: any) {
      super(props);
      this.DataContext = createDataContext();

      if (props.registerExposedAPI) {
        const exposedAPIEmitter = new EventEmitter();
        exposedAPIEmitter.on(
          "get.table.data",
          (payload) => (payload.result = this.table.getData())
        );
        exposedAPIEmitter.on(
          "get.selected.rows",
          (payload) => (payload.result = this.selectionContext.getSelected())
        );
        exposedAPIEmitter.on("get.filtered.rows", (payload) => {
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
        this.ColumnContext = createColumnContext();
      }

      if (props.selectRow) {
        this.SelectionContext = createSelectionContext();
      }

      if (props.expandRow) {
        this.RowExpandContext = createRowExpandContext();
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

    componentDidUpdate(nextProps: any) {
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
        rootProps: {
          getData: (
            filterProps: any,
            searchProps: any,
            sortProps: any,
            paginationProps: any
          ) => any;
        },
        filterProps: any,
        searchProps: any,
        sortProps: any,
        paginationProps: any,
        columnToggleProps: any
      ) => (
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

    renderWithColumnContext(base: any, baseProps: any) {
      return (
        rootProps: any,
        filterProps: any,
        searchProps: any,
        sortProps: any,
        paginationProps: any
      ) => (
        <this.ColumnContext.Provider
          {...baseProps}
          toggles={
            this.props.columnToggle ? this.props.columnToggle.toggles : null
          }
        >
          <this.ColumnContext.Consumer>
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
          </this.ColumnContext.Consumer>
        </this.ColumnContext.Provider>
      );
    }

    renderWithSelectionContext(base: any, baseProps: any) {
      return (
        rootProps: {
          getData: (
            filterProps: any,
            searchProps: any,
            sortProps: any,
            paginationProps: any
          ) => any;
        },
        filterProps: any,
        searchProps: any,
        sortProps: any,
        paginationProps: any
      ) => (
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

    renderWithRowExpandContext(base: any, baseProps: any) {
      return (
        rootProps: {
          getData: (
            filterProps: any,
            searchProps: any,
            sortProps: any,
            paginationProps: any
          ) => any;
        },
        filterProps: any,
        searchProps: any,
        sortProps: any,
        paginationProps: any
      ) => (
        <this.RowExpandContext.Provider
          {...baseProps}
          ref={(n: any) => {
            this.rowExpandContext = n;
          }}
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

    renderWithPaginationContext(base: any) {
      return (
        rootProps: {
          getData: (
            filterProps: any,
            searchProps: any,
            sortProps: any,
            paginationProps?: any
          ) => any;
        },
        filterProps: any,
        searchProps: any,
        sortProps: any
      ) => (
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

    renderWithSortContext(base: any, baseProps: any) {
      return (
        rootProps: {
          getData: (
            filterProps: any,
            searchProps: any,
            sortProps?: any,
            paginationProps?: any
          ) => any;
        },
        filterProps: any,
        searchProps: any
      ) => (
        <this.SortContext.Provider
          {...baseProps}
          ref={(n: any) => (this.sortContext = n)}
          defaultSorted={this.props.defaultSorted}
          defaultSortDirection={this.props.defaultSortDirection}
          sort={this.props.sort}
          data={rootProps.getData(filterProps, searchProps)}
        >
          <this.SortContext.Consumer>
            {(sortProps: any) =>
              base(rootProps, filterProps, searchProps, sortProps)
            }
          </this.SortContext.Consumer>
        </this.SortContext.Provider>
      );
    }

    renderWithSearchContext(base: any, baseProps: any) {
      return (
        rootProps: {
          getData: (
            filterProps: any,
            searchProps?: any,
            sortProps?: any,
            paginationProps?: any
          ) => any;
        },
        filterProps: any
      ) => (
        <this.SearchContext.Provider
          {...baseProps}
          ref={(n: any) => (this.searchContext = n)}
          data={rootProps.getData(filterProps)}
          searchText={this.props.search.searchText}
          dataChangeListener={this.props.dataChangeListener}
        >
          <this.SearchContext.Consumer>
            {(searchProps: any) => base(rootProps, filterProps, searchProps)}
          </this.SearchContext.Consumer>
        </this.SearchContext.Provider>
      );
    }

    renderWithFilterContext(base: any, baseProps: any) {
      return (rootProps: any) => (
        <this.FilterContext.Provider
          {...baseProps}
          ref={(n: any) => (this.filterContext = n)}
          data={rootProps.getData()}
          filter={this.props.filter.options || {}}
          dataChangeListener={this.props.dataChangeListener}
        >
          <this.FilterContext.Consumer>
            {(filterProps: any) => base(rootProps, filterProps)}
          </this.FilterContext.Consumer>
        </this.FilterContext.Provider>
      );
    }

    renderWithCellEditContext(base: any, baseProps: any) {
      return (rootProps: {
        getData: (
          filterProps?: any,
          searchProps?: any,
          sortProps?: any,
          paginationProps?: any
        ) => any;
      }) => (
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

      if (this.ColumnContext) {
        base = this.renderWithColumnContext(base, baseProps);
      }

      if (this.SelectionContext) {
        base = this.renderWithSelectionContext(base, baseProps);
      }

      if (this.RowExpandContext) {
        base = this.renderWithRowExpandContext(base, baseProps);
      }

      if (this.PaginationContext) {
        base = this.renderWithPaginationContext(base);
      }

      if (this.SortContext) {
        base = this.renderWithSortContext(base, baseProps);
      }

      if (this.SearchContext) {
        base = this.renderWithSearchContext(base, baseProps);
      }

      if (this.FilterContext) {
        base = this.renderWithFilterContext(base, baseProps);
      }

      if (this.CellEditContext) {
        base = this.renderWithCellEditContext(base, baseProps);
      }

      return (
        <BootstrapContext.Provider value={{ bootstrap4 }}>
          <this.DataContext.Provider {...baseProps} data={this.props.data}>
            <this.DataContext.Consumer>{base}</this.DataContext.Consumer>
          </this.DataContext.Provider>
        </BootstrapContext.Provider>
      );
    }
  };

export default withContext;
