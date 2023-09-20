import EventEmitter from "events";
import { Component } from "react";
import _ from "../utils";

export default (ExtendBase: any) =>
  class RemoteResolver extends Component<typeof ExtendBase> {
    remoteEmitter: EventEmitter;

    DataContext: any;
    ColumnContext: any;
    SelectionContext: any;
    SearchContext: any;
    FilterContext: any;
    RowExpandContext: any;
    CellEditContext: any;
    PaginationContext: any;
    SortContext: any;
    Table: any;

    dataContext: any;
    columnContext: any;
    selectionContext: any;
    searchContext: any;
    filterContext: any;
    rowExpandContext: any;
    cellEditContext: any;
    paginationContext: any;
    sortContext: any;
    table: any;

    constructor(props: any) {
      super(props);
      this.remoteEmitter = new EventEmitter();
      this.remoteEmitter.on("paginationChange", this.handleRemotePageChange);
      this.remoteEmitter.on("isRemotePagination", this.isRemotePagination);
    }

    getNewestState = (state: any = {}) => {
      let sortOrder: string | undefined;
      let sortField: string | undefined;
      let page: number | undefined;
      let sizePerPage: number | undefined;
      let searchText: string | undefined;
      let filters: any = {};

      if (this.sortContext) {
        sortOrder = this.sortContext.state.sortOrder;
        sortField = this.sortContext.state.sortColumn
          ? this.sortContext.state.sortColumn.dataField
          : null;
      }

      if (this.filterContext) {
        filters = this.filterContext.currFilters;
      }

      if (this.paginationContext) {
        page = this.paginationContext.currPage;
        sizePerPage = this.paginationContext.currSizePerPage;
      }

      if (this.searchContext) {
        searchText = this.props.search.searchText;
      }

      return {
        sortOrder,
        sortField,
        filters,
        page,
        sizePerPage,
        searchText,
        ...state,
        data: this.props.data,
      };
    };

    isRemoteSearch = () => {
      const { remote } = this.props;
      return (
        remote === true ||
        (_.isObject(remote) && remote.search) ||
        this.isRemotePagination()
      );
    };

    isRemotePagination = (e: any = {}) => {
      const { remote } = this.props;
      e.result = remote === true || (_.isObject(remote) && remote.pagination);
      return e.result;
    };

    isRemoteFiltering = () => {
      const { remote } = this.props;
      return (
        remote === true ||
        (_.isObject(remote) && remote.filter) ||
        this.isRemotePagination()
      );
    };

    isRemoteSort = () => {
      const { remote } = this.props;
      return (
        remote === true ||
        (_.isObject(remote) && remote.sort) ||
        this.isRemotePagination()
      );
    };

    isRemoteCellEdit = () => {
      const { remote } = this.props;
      return remote === true || (_.isObject(remote) && remote.cellEdit);
    };

    handleRemotePageChange = (page: number, sizePerPage: number) => {
      this.props.onTableChange(
        "pagination",
        this.getNewestState({ page, sizePerPage })
      );
    };

    handleRemoteFilterChange = (filters: any) => {
      const newState: { filters: any; page?: number } = { filters };
      if (this.isRemotePagination()) {
        const options = this.props.pagination.options || {};
        newState.page = _.isDefined(options.pageStartIndex)
          ? options.pageStartIndex
          : 1;
      }
      this.props.onTableChange("filter", this.getNewestState(newState));
    };

    handleRemoteSortChange = (sortField: string, sortOrder: string | undefined) => {
      this.props.onTableChange(
        "sort",
        this.getNewestState({ sortField, sortOrder })
      );
    };

    handleRemoteCellChange = (rowId: any, dataField: string, newValue: any) => {
      const cellEdit = { rowId, dataField, newValue };
      this.props.onTableChange("cellEdit", this.getNewestState({ cellEdit }));
    };

    handleRemoteSearchChange = (searchText: string) => {
      this.props.onTableChange("search", this.getNewestState({ searchText }));
    };
  };
