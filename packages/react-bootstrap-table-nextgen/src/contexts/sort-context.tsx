import React, { Component, ReactNode } from "react";
import { SORT_ASC, SORT_DESC } from "../..";

type DataOperator = {
  nextOrder: (
    column: any,
    state: { sortOrder: string | undefined; sortColumn: any | undefined },
    defaultSortDirection: string
  ) => string;
  sort: (
    data: any[],
    order: string | undefined,
    sortColumn: any | undefined
  ) => any[];
};

type HandleSortChange = (
  dataField: string,
  sortOrder: string | undefined
) => void;

//
interface SortContextValue {
  data: any[];
  sortOrder: string | undefined;
  onSort: (column: any) => void;
  sortField: string | null;
}

interface SortProviderProps {
  data: any[];
  columns: any[];
  children: ReactNode;
  defaultSorted?: Array<{
    dataField: string;
    order: typeof SORT_ASC | typeof SORT_DESC;
  }>;
  sort?: {
    dataField: string;
    order: typeof SORT_ASC | typeof SORT_DESC;
    sortFunc: (a: any, b: any, order: string, dataField: string) => number;
  };
  defaultSortDirection: typeof SORT_ASC | typeof SORT_DESC;
}

export default (
  dataOperator: DataOperator,
  isRemoteSort: () => boolean,
  handleSortChange: HandleSortChange
) => {
  const defaultSortContext = {
    data: [],
    sortOrder: undefined,
    onSort: () => {},
    sortField: null,
  };
  const SortContext = React.createContext<SortContextValue>(defaultSortContext);

  class SortProvider extends Component<SortProviderProps> {
    state: {
      sortOrder: string | undefined;
      sortColumn:
        | {
            dataField: string;
            text: string;
            onSort: Function;
            sortFunc: Function;
          }
        | undefined;
    } = {
      sortOrder: SORT_ASC,
      sortColumn: {
        dataField: "id",
        text: "ID",
        onSort: () => {},
        sortFunc: () => {},
      },
    };

    constructor(props: SortProviderProps) {
      super(props);
      const { defaultSorted, defaultSortDirection, sort } = props;

      let sortOrder: any;
      let sortColumn: any;

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

    static getDerivedStateFromProps(
      nextProps: SortProviderProps,
      prevState: any
    ) {
      const { sort, columns } = nextProps;

      if (sort && sort.dataField && sort.order) {
        return {
          sortOrder: sort.order,
          sortColumn: columns.find((col) => col.dataField === sort.dataField),
        };
      } else {
        return null;
      }
    }

    initSort(sortField: string, sortOrder: string) {
      const { columns } = this.props;
      const sortColumns = columns.filter((col) => col.dataField === sortField);

      let sortColumn: any;

      if (sortColumns.length > 0) {
        sortColumn = sortColumns[0];
        if (sortColumn.onSort) {
          sortColumn.onSort(sortField, sortOrder);
        }
      }

      return sortColumn;
    }

    handleSort = (column: { dataField: string; onSort: Function }) => {
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
      const { sort } = this.props;
      const { sortOrder, sortColumn } = this.state;

      let { data } = this.props;

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
