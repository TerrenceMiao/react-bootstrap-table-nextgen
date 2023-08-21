import React, { ReactNode } from "react";

interface ColumnProviderProps {
  data: any;
  columns: any[];
  toggles?: { [dataField: string]: boolean };
  children: ReactNode;
}

interface ColumnContextValue {
  columns: any[];
  toggles?: { [dataField: string]: boolean };
}

const defaultColumnContext = { columns: [], toggles: undefined };
const ColumnContext =
  React.createContext<ColumnContextValue>(defaultColumnContext);

const ColumnProvider: React.FC<ColumnProviderProps> = ({
  columns,
  toggles,
  children,
}) => {
  let toggleColumns;

  if (toggles) {
    toggleColumns = columns.filter((column) => toggles[column.dataField]);
  } else {
    toggleColumns = columns.filter((column) => !column.hidden);
  }
  return (
    <ColumnContext.Provider value={{ columns: toggleColumns }}>
      {children}
    </ColumnContext.Provider>
  );
};

export default () => ({
  Provider: ColumnProvider,
  Consumer: ColumnContext.Consumer,
});
