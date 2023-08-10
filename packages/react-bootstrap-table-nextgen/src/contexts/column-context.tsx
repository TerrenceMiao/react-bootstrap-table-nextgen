import React, { ReactNode } from "react";

interface ColumnManagementProviderProps {
  columns: any[]; // Replace "any" with the actual column type
  toggles?: { [dataField: string]: boolean };
  children: ReactNode;
}

const ColumnManagementProvider: React.FC<ColumnManagementProviderProps> = ({
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

  const columnManagementValue = { columns: toggleColumn };

  return (
    <ColumnManagementContext.Provider value={columnManagementValue}>
      {children}
    </ColumnManagementContext.Provider>
  );
};

// ColumnManagementProvider.propTypes = {
//   columns: PropTypes.array.isRequired,
//   toggles: PropTypes.object,
//   children: PropTypes.node.isRequired,
// };

const ColumnManagementContext = React.createContext<
  { columns: any[] } | undefined
>(undefined);

export default () => ({
  Provider: ColumnManagementProvider,
  Consumer: ColumnManagementContext.Consumer,
});
