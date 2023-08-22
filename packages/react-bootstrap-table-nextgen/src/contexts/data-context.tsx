import React, { ReactNode, useEffect, useState } from "react";

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

const DataProvider: React.FC<DataProviderProps> = ({
  data,
  children,
}) => {
  const [stateData, setStateData] = useState(data);

  const getData = (
    filterProps?: FilterProps,
    searchProps?: SearchProps,
    sortProps?: SortProps,
    paginationProps?: PaginationProps
  ) => {
    if (paginationProps) return paginationProps.data;
    else if (sortProps) return sortProps.data;
    else if (searchProps) return searchProps.data;
    else if (filterProps) return filterProps.data;
    return data;
  };

  useEffect(() => {
    setStateData(data);
  }, [data]);

  return (
    <DataContext.Provider
      value={{
        data: stateData,
        getData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default () => ({
  Provider: DataProvider,
  Consumer: DataContext.Consumer,
});
