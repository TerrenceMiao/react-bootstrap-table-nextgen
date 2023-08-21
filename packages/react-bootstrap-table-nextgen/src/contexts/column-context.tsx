import React, { ReactNode } from "react";

interface ColumnContextValue {
  columns: any[];
}

interface ColumnProviderProps {
  data?: any;
  columns: any[];
  toggles?: { [dataField: string]: boolean };
  children: ReactNode;
}

const ColumnProvider: React.FC<ColumnProviderProps> = ({
  columns,
  toggles,
  children,
}) => {
  let toggleColumn;
  if (toggles) {
    toggleColumn = columns.filter((column) => toggles[column.dataField]);
  } else {
    toggleColumn = columns.filter((column) => !column.hidden);
  }

  const columnValue = { columns: toggleColumn };

  return (
    <ColumnContext.Provider value={columnValue}>
      {children}
    </ColumnContext.Provider>
  );
};

const defaultColumnContext = { columns: [] };
const ColumnContext = React.createContext<ColumnContextValue>(
  defaultColumnContext
);

export default () => ({
  Provider: ColumnProvider,
  Consumer: ColumnContext.Consumer,
});
