/* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */
/* eslint no-continue: 0 */
/* eslint no-lonely-if: 0 */
/* eslint class-methods-use-this: 0 */
/* eslint camelcase: 0 */
import React from "react";
import { SearchMatchProps, TableSearchProps } from "../..";

// interface Column {
//   searchable?: boolean;
//   dataField: string;
//   formatter?: (
//     value: any,
//     row: any,
//     rowIndex: number,
//     formatExtraData: any
//   ) => any;
//   filterValue?: (value: any, row: any) => any;
// }

// interface Options {
//   searchFormatted?: boolean;
//   afterSearch?: ((result: any) => void) | null;
//   onColumnMatch?:
//     | ((params: {
//         searchText: string;
//         value: any;
//         column: Column;
//         row: any;
//       }) => boolean)
//     | null;
// }

interface DataChangeListener {
  emit: (event: string, value: any) => void;
}

interface SearchProviderProps extends SearchMatchProps {
  // columns: ColumnDescription[];
  // searchText?: string;
  data: any[];
  dataChangeListener?: DataChangeListener;
  children: React.ReactNode;
}

interface SearchProviderState {
  data: any[];
}

export default (
    options: TableSearchProps = {
      searchFormatted: false,
      afterSearch: undefined,
      onColumnMatch: () => false,
    }
  ) =>
  (
    _: any,
    isRemoteSearch: () => boolean,
    handleRemoteSearchChange: (searchText: string) => void
  ) => {
    const SearchContext = React.createContext<any>(null);

    class SearchProvider extends React.Component<
      SearchProviderProps,
      SearchProviderState
    > {
      constructor(props: SearchProviderProps) {
        super(props);
        let initialData = props.data;
        if (isRemoteSearch() && this.props.searchText !== "") {
          handleRemoteSearchChange(this.props.searchText!);
        } else {
          initialData = this.search(props);
          this.triggerListener(initialData, true);
        }
        this.state = { data: initialData };
      }

      getSearched() {
        return this.state.data;
      }

      triggerListener(result: any, skipInit?: any) {
        if (options.afterSearch && !skipInit) {
          options.afterSearch(result);
        }
        if (this.props.dataChangeListener) {
          this.props.dataChangeListener.emit("filterChanged", result.length);
        }
      }

      componentDidUpdate(nextProps: SearchProviderProps) {
        if (nextProps.searchText !== this.props.searchText) {
          if (isRemoteSearch()) {
            handleRemoteSearchChange(nextProps.searchText);
          } else {
            const result = this.search(nextProps);
            this.triggerListener(result);
            this.setState({
              data: result,
            });
          }
        } else {
          if (isRemoteSearch()) {
            this.setState({ data: nextProps.data });
          } else if (!_.isEqual(nextProps.data, this.props.data)) {
            const result = this.search(nextProps);
            this.triggerListener(result);
            this.setState({
              data: result,
            });
          }
        }
      }

      search(props: any) {
        const { data, columns } = props;
        const searchText = props.searchText.toLowerCase();
        return data.filter((row: any, ridx: any) => {
          for (let cidx = 0; cidx < columns.length; cidx += 1) {
            const column = columns[cidx];
            if (column.searchable === false) continue;
            let targetValue = _.get(row, column.dataField);
            if (column.formatter && options.searchFormatted) {
              targetValue = column.formatter(
                targetValue,
                row,
                ridx,
                column.formatExtraData
              );
            } else if (column.filterValue) {
              targetValue = column.filterValue(targetValue, row);
            }
            if (options.onColumnMatch) {
              if (
                options.onColumnMatch({
                  searchText,
                  value: targetValue,
                  column,
                  row,
                })
              ) {
                return true;
              }
            } else {
              if (targetValue !== null && typeof targetValue !== "undefined") {
                targetValue = targetValue.toString().toLowerCase();
                if (targetValue.indexOf(searchText) > -1) {
                  return true;
                }
              }
            }
          }
          return false;
        });
      }

      render() {
        return (
          <SearchContext.Provider value={{ data: this.state.data }}>
            {this.props.children}
          </SearchContext.Provider>
        );
      }
    }

    return {
      Provider: SearchProvider,
      Consumer: SearchContext.Consumer,
    };
  };
