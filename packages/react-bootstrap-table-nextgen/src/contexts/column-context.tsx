import React, { Component, ReactNode, createContext } from "react";

interface Column {
  dataField: string;
  hidden?: boolean;
}

interface Toggles {
  [key: string]: boolean;
}

interface ColumnManagementContextValue {
  columns: Column[];
}

const ColumnManagementContext = createContext<
  ColumnManagementContextValue | undefined
>(undefined);

interface ColumnManagementProviderProps {
  columns: Column[];
  toggles?: Toggles | null;
  children: ReactNode;
}

class ColumnManagementProvider extends Component<ColumnManagementProviderProps> {
  // static propTypes = {
  //   columns: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       dataField: PropTypes.string.isRequired,
  //       hidden: PropTypes.bool,
  //     })
  //   ).isRequired,
  //   toggles: PropTypes.object,
  //   children: PropTypes.node.isRequired,
  // };

  // static defaultProps = {
  //   toggles: null,
  // };

  render() {
    let toggleColumn: Column[];
    const { columns, toggles } = this.props;
    if (toggles) {
      toggleColumn = columns.filter((column) => toggles[column.dataField]);
    } else {
      toggleColumn = columns.filter((column) => !column.hidden);
    }
    return (
      <ColumnManagementContext.Provider value={{ columns: toggleColumn }}>
        {this.props.children}
      </ColumnManagementContext.Provider>
    );
  }
}

export default () => {
  return {
    Provider: ColumnManagementProvider,
    Consumer: ColumnManagementContext.Consumer,
  };
};
