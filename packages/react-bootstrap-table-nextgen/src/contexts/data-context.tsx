import React, { Component, ReactNode } from "react";

interface FilterProps {
  data: any;
}

interface SearchProps {
  data: any;
}

interface SortProps {
  data: any;
}

interface PaginationProps {
  data: any;
}

//
interface DataProviderProps {
  data: any[];
  children: ReactNode;
}

interface DataContextValue {
  data: any[];
  getData: (
    filterProps?: FilterProps,
    searchProps?: SearchProps,
    sortProps?: SortProps,
    paginationProps?: PaginationProps
  ) => any[];
}

const defaultDataContext = { data: [], getData: () => [] };
const DataContext = React.createContext<DataContextValue>(defaultDataContext);

class DataProvider extends Component<DataProviderProps> {
  state = { data: this.props.data };

  getData = (
    filterProps?: FilterProps,
    searchProps?: SearchProps,
    sortProps?: SortProps,
    paginationProps?: PaginationProps
  ) => {
    if (paginationProps) return paginationProps.data;
    else if (sortProps) return sortProps.data;
    else if (searchProps) return searchProps.data;
    else if (filterProps) return filterProps.data;
    return this.props.data;
  };

  componentDidUpdate(nextProps: DataProviderProps) {
    if (this.props.data !== nextProps.data) {
      this.setState(() => ({ data: nextProps.data }));
    }
  }

  render() {
    return (
      <DataContext.Provider
        value={{
          data: this.state.data,
          getData: this.getData,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export default () => ({
  Provider: DataProvider,
  Consumer: DataContext.Consumer,
});
