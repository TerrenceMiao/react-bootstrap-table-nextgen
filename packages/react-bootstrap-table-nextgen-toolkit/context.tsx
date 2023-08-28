/* eslint no-param-reassign: 0 */

// import PropTypes from "prop-types";
import React from "react";

import { TableToolkitProps, ToolkitContextType } from ".";
import createSearchContext from "./src/search/context";
import statelessDecorator from "./statelessOp";

// interface ToolkitProviderProps {
//   keyField: string;
//   data: any[];
//   columns: any[];
//   children?: React.ReactNode;
//   bootstrap4: boolean;
//   search?:
//     | boolean
//     | {
//         defaultSearch?: string;
//         searchFormatted?: boolean;
//         searchContext: any;
//         searchText: string;
//       };
//   exportCSV?:
//     | boolean
//     | {
//         fileName?: string;
//         separator?: string;
//         ignoreHeader?: boolean;
//         ignoreFooter?: boolean;
//         noAutoBOM?: boolean;
//         blobType?: string;
//         exportAll?: boolean;
//         onlyExportFiltered?: boolean;
//         onlyExportSelection?: boolean;
//       };
//   columnToggle?: { [dataField: string]: boolean };
//   setDependencyModules?: Function;
//   registerExposedAPI?: Function;
// }

// interface ToolkitProviderState {
//   columnToggle: { [dataField: string]: boolean };
//   searchText: string;
// }

const ToolkitContext = React.createContext<ToolkitContextType>({
  searchProps: {
    searchText: "",
    onSearch: (val: string) => {},
    onClear: () => {},
  },
  csvProps: {
    onExport: () => {},
  },
  columnToggleProps: {
    columns: [],
    toggles: [],
    onColumnToggle: (dataField: string) => {},
  },
  baseProps: {
    keyField: undefined,
    columns: [],
    data: [],
    bootstrap4: undefined,
  },
});

class ToolkitProvider extends statelessDecorator(React.Component) {
  // static propTypes = {
  //   keyField: PropTypes.string.isRequired,
  //   data: PropTypes.array.isRequired,
  //   columns: PropTypes.array.isRequired,
  //   children: PropTypes.node.isRequired,
  //   bootstrap4: PropTypes.bool,
  //   search: PropTypes.oneOfType([
  //     PropTypes.bool,
  //     PropTypes.shape({
  //       defaultSearch: PropTypes.string,
  //       searchFormatted: PropTypes.bool,
  //     }),
  //   ]),
  //   exportCSV: PropTypes.oneOfType([
  //     PropTypes.bool,
  //     PropTypes.shape({
  //       fileName: PropTypes.string,
  //       separator: PropTypes.string,
  //       ignoreHeader: PropTypes.bool,
  //       ignoreFooter: PropTypes.bool,
  //       noAutoBOM: PropTypes.bool,
  //       blobType: PropTypes.string,
  //       exportAll: PropTypes.bool,
  //       onlyExportFiltered: PropTypes.bool,
  //       onlyExportSelection: PropTypes.bool,
  //     }),
  //   ]),
  // };

  // static defaultProps = {
  //   search: false,
  //   exportCSV: false,
  //   bootstrap4: false,
  // };

  _: any;
  state: any;

  constructor(props: TableToolkitProps) {
    super(props);
    const initialState = {
      columnToggle: {},
      searchText:
        typeof props.search === "object"
          ? props.search.defaultSearch || ""
          : "",
    };
    this._ = null;
    this.onClear = this.onClear.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onColumnToggle = this.onColumnToggle.bind(this);
    this.setDependencyModules = this.setDependencyModules.bind(this);

    if (props.columnToggle) {
      initialState.columnToggle = props.columns.reduce(
        (obj: any, column: any) => {
          obj[column.dataField] = !column.hidden;
          return obj;
        },
        {}
      );
    }
    initialState.searchText =
      typeof props.search === "object" ? props.search.defaultSearch || "" : "";
    this.state = initialState;
  }

  UNSAFE_componentWillReceiveProps(nextProps: TableToolkitProps) {
    let columnToggle = this.state.columnToggle;
    if (nextProps.columnToggle) {
      columnToggle = nextProps.columns.reduce((obj: any, column: any) => {
        obj[column.dataField] = !column.hidden;
        return obj;
      }, {});
    } else {
      columnToggle = {};
    }
    this.setState({
      ...this.state,
      columnToggle,
    });
  }

  onSearch(searchText: any) {
    if (searchText !== this.state.searchText) {
      this.setState({ searchText });
    }
  }

  onClear() {
    this.setState({ searchText: "" });
  }

  onColumnToggle(dataField: any) {
    const { columnToggle } = this.state;
    columnToggle[dataField] = !columnToggle[dataField];
    this.setState({
      ...this.state,
      columnToggle,
    });
  }
  /**
   *
   * @param {*} _
   * this function will be called only one time when table render
   * react-bootstrap-table-nextgen/src/context/index.js will call this cb for passing the _ module
   * Please consider to extract a common module to handle _ module.
   * this is just a quick fix
   */
  setDependencyModules(_: any) {
    this._ = _;
  }

  render() {
    const baseProps: TableToolkitProps = {
      keyField: this.props.keyField,
      columns: this.props.columns,
      data: this.props.data,
      search: this.props.search ?? false,
      exportCSV: this.props.exportCSV ?? false,
      bootstrap4: this.props.bootstrap4 ?? false,
      children: this.props.children,
      setDependencyModules: this.setDependencyModules,
      registerExposedAPI: this.registerExposedAPI,
    };
    if (this.props.search) {
      baseProps.search = {
        searchContext: createSearchContext(this.props.search),
        searchText: this.state.searchText,
      };
    }
    if (this.props.columnToggle) {
      baseProps.columnToggle = {
        toggles: this.state.columnToggle,
      };
    }
    return (
      <ToolkitContext.Provider
        value={{
          searchProps: {
            searchText: this.state.searchText,
            onSearch: this.onSearch,
            onClear: this.onClear,
          },
          csvProps: {
            onExport: this.handleExportCSV,
          },
          columnToggleProps: {
            columns: this.props.columns,
            toggles: this.state.columnToggle,
            onColumnToggle: this.onColumnToggle,
          },
          baseProps,
        }}
      >
        {this.props.children}
      </ToolkitContext.Provider>
    );
  }
}

export default {
  Provider: ToolkitProvider,
  Consumer: ToolkitContext.Consumer,
};
