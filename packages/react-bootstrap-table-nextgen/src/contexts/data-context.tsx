import PropTypes from "prop-types";
import React, { Component, createContext, ReactNode } from "react";

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

const DataContext = createContext<DataContextValue | undefined>(undefined);

class DataProvider extends Component<DataProviderProps> {
  static propTypes = {
    data: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired,
  };

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

  componentDidUpdate(prevProps: DataProviderProps) {
    if (this.props.data !== prevProps.data) {
      this.setState(() => ({ data: this.props.data }));
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

export default () => {
  return {
    Provider: DataProvider,
    Consumer: DataContext.Consumer,
  };
};
