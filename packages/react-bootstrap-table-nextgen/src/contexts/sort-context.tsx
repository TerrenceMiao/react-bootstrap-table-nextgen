import PropTypes from "prop-types";
import React, { Component, createContext, ReactNode } from "react";
import Const from "../const";

interface SortContextValue {
  data: any[];
  sortOrder: string;
  onSort: (column: any) => void;
  sortField: string | null;
}

interface SortProviderProps {
  data: any[];
  columns: any[];
  children: ReactNode;
  defaultSorted?: Array<{ dataField: string; order: string }>;
  sort?: {
    dataField: string;
    order: string;
    sortFunc: (a: any, b: any, order: string, dataField: string) => number;
  };
  defaultSortDirection: string;
}

type DataOperator = {
  nextOrder: (
    column: any,
    state: { sortOrder: string; sortColumn: any },
    defaultSortDirection: string
  ) => string;
  sort: (data: any[], order: string, sortColumn: any) => any[];
};

type HandleSortChange = (dataField: string, sortOrder: string) => void;

const SortContext = createContext<SortContextValue | undefined>(undefined);

export default (
  dataOperator: DataOperator,
  isRemoteSort: () => boolean,
  handleSortChange: HandleSortChange
) => {
  class SortProvider extends Component<
    SortProviderProps,
    { sortOrder: any; sortColumn: any }
  > {
    static propTypes = {
      data: PropTypes.array.isRequired,
      columns: PropTypes.array.isRequired,
      children: PropTypes.node.isRequired,
      defaultSorted: PropTypes.arrayOf(
        PropTypes.shape({
          dataField: PropTypes.string.isRequired,
          order: PropTypes.oneOf([Const.SORT_DESC, Const.SORT_ASC]).isRequired,
        })
      ),
      sort: PropTypes.shape({
        dataField: PropTypes.string,
        order: PropTypes.oneOf([Const.SORT_DESC, Const.SORT_ASC]),
        sortFunc: PropTypes.func,
      }),
      defaultSortDirection: PropTypes.oneOf([Const.SORT_DESC, Const.SORT_ASC]),
    };

    constructor(props: SortProviderProps) {
      super(props);
      let sortOrder;
      let sortColumn;
      const { defaultSorted, defaultSortDirection, sort } = props;

      if (defaultSorted && defaultSorted.length > 0) {
        sortOrder = defaultSorted[0].order || defaultSortDirection;
        sortColumn = this.initSort(defaultSorted[0].dataField, sortOrder);
      } else if (sort && sort.dataField && sort.order) {
        sortOrder = sort.order;
        sortColumn = this.initSort(sort.dataField, sortOrder);
      }
      this.state = { sortOrder, sortColumn };
    }

    componentDidMount() {
      const { sortOrder, sortColumn } = this.state;
      if (isRemoteSort() && sortOrder && sortColumn) {
        handleSortChange(sortColumn.dataField, sortOrder);
      }
    }

    componentDidUpdate(prevProps: SortProviderProps) {
      const { sort, columns } = this.props;
      if (sort && sort.dataField && sort.order) {
        this.setState({
          sortOrder: sort.order,
          sortColumn: columns.find((col) => col.dataField === sort.dataField),
        });
      }
    }

    initSort(sortField: string, sortOrder: string) {
      let sortColumn;
      const { columns } = this.props;
      const sortColumns = columns.filter((col) => col.dataField === sortField);
      if (sortColumns.length > 0) {
        sortColumn = sortColumns[0];

        if (sortColumn.onSort) {
          sortColumn.onSort(sortField, sortOrder);
        }
      }
      return sortColumn;
    }

    handleSort = (column: any) => {
      const sortOrder = dataOperator.nextOrder(
        column,
        this.state,
        this.props.defaultSortDirection
      );

      if (column.onSort) {
        column.onSort(column.dataField, sortOrder);
      }

      if (isRemoteSort()) {
        handleSortChange(column.dataField, sortOrder);
      }
      this.setState(() => ({
        sortOrder,
        sortColumn: column,
      }));
    };

    render() {
      let { data } = this.props;
      const { sort } = this.props;
      const { sortOrder, sortColumn } = this.state;
      if (!isRemoteSort() && sortColumn) {
        const sortFunc = sortColumn.sortFunc
          ? sortColumn.sortFunc
          : sort && sort.sortFunc;
        data = dataOperator.sort(data, sortOrder, { ...sortColumn, sortFunc });
      }

      return (
        <SortContext.Provider
          value={{
            data,
            sortOrder,
            onSort: this.handleSort,
            sortField: sortColumn ? sortColumn.dataField : null,
          }}
        >
          {this.props.children}
        </SortContext.Provider>
      );
    }
  }

  return {
    Provider: SortProvider,
    Consumer: SortContext.Consumer,
  };
};
