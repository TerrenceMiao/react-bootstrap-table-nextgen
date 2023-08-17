import EventEmitter from "events";
import { Component } from "react";
import _ from "../utils";

export default (ExtendBase: any) =>
  class RemoteResolver extends Component<typeof ExtendBase> {
    public remoteEmitter: EventEmitter;
    public DataContext: any;
    public SortContext: any;
    public ColumnManagementContext: any;
    public SelectionContext: any;
    public rowExpandContext: any;
    public CellEditContext: any;
    public FilterContext: any;
    public PaginationContext: any;
    public SearchContext: any;
    public table: any;

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

      if (this.SortContext) {
        sortOrder = this.SortContext.state.sortOrder;
        sortField = this.SortContext.state.sortColumn
          ? this.SortContext.state.sortColumn.dataField
          : null;
      }

      if (this.FilterContext) {
        filters = this.FilterContext.currFilters;
      }

      if (this.PaginationContext) {
        page = this.PaginationContext.currPage;
        sizePerPage = this.PaginationContext.currSizePerPage;
      }

      if (this.SearchContext) {
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

    handleRemoteSortChange = (sortField: string, sortOrder: string) => {
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
