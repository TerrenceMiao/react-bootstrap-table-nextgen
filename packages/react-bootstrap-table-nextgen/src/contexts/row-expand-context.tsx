import React, { Component, createContext, ReactNode } from "react";
import dataOperator from "../store/operators";
import _ from "../utils";

export interface RowExpandContextValue {
  expanded: any[];
  isClosing: any[];
  nonExpandable?: any[];
  onClosed: (closedRow: any) => void;
  isAnyExpands: boolean;
  onRowExpand: (
    rowKey: any,
    expanded: boolean,
    rowIndex: number,
    e: any
  ) => void;
  onAllRowExpand: (e: any, expandAll: boolean) => void;
  onExpand?: (row: any, expanded: boolean, rowIndex: number, e: any) => void;
  onExpandAll?: (expandAll: boolean, expandedRows: any[], e: any) => void;
  onlyOneExpanding?: boolean;
}

interface RowExpandProviderProps {
  children: ReactNode;
  data: any[];
  keyField: string;
  expandRow: {
    expanded?: any[];
    isClosing?: any[];
    onExpand?: (row: any, expanded: boolean, rowIndex: number, e: any) => void;
    onExpandAll?: (expandAll: boolean, expandedRows: any[], e: any) => void;
    onlyOneExpanding?: boolean;
    nonExpandable?: any[];
    renderer?: () => void;
  };
}

const RowExpandContext = createContext<RowExpandContextValue | undefined>(
  undefined
);

class RowExpandProvider extends Component<RowExpandProviderProps> {
  // static propTypes = {
  //   children: PropTypes.node.isRequired,
  //   data: PropTypes.array.isRequired,
  //   keyField: PropTypes.string.isRequired,
  //   expandRow: PropTypes.shape({
  //     expanded: PropTypes.array,
  //     isClosing: PropTypes.array,
  //     onExpand: PropTypes.func,
  //     onExpandAll: PropTypes.func,
  //     onlyOneExpanding: PropTypes.bool,
  //     nonExpandable: PropTypes.array
  //   })
  // };

  state = {
    expanded: this.props.expandRow.expanded || [],
    isClosing: this.props.expandRow.isClosing || [],
  };

  onClosed = (closedRow: any) => {
    this.setState({
      isClosing: this.state.isClosing.filter((value) => value !== closedRow),
    });
  };

  componentDidUpdate(prevProps: RowExpandProviderProps) {
    const { expandRow } = this.props;
    if (expandRow) {
      let nextExpanded = [...(expandRow.expanded || this.state.expanded)];
      const { nonExpandable = [] } = expandRow;
      nextExpanded = nextExpanded.filter(
        (rowId) => !_.contains(nonExpandable, rowId)
      );
      const isClosing = this.state.expanded.reduce((acc, cur) => {
        if (!_.contains(nextExpanded, cur)) {
          acc.push(cur);
        }
        return acc;
      }, []);

      this.setState(() => ({
        expanded: nextExpanded,
        isClosing,
      }));
    } else {
      this.setState(() => ({
        expanded: this.state.expanded,
      }));
    }
  }

  handleRowExpand = (
    rowKey: any,
    expanded: boolean,
    rowIndex: number,
    e: any
  ) => {
    const {
      data,
      keyField,
      expandRow: { onExpand, onlyOneExpanding, nonExpandable },
    } = this.props;

    if (nonExpandable && _.contains(nonExpandable, rowKey)) {
      return;
    }

    let currExpanded = [...this.state.expanded];
    let isClosing = [...this.state.isClosing];

    if (expanded) {
      if (onlyOneExpanding) {
        isClosing = isClosing.concat(currExpanded);
        currExpanded = [rowKey];
      } else currExpanded.push(rowKey);
    } else {
      isClosing.push(rowKey);
      currExpanded = currExpanded.filter((value) => value !== rowKey);
    }

    if (onExpand) {
      const row = dataOperator.getRowByRowId(data, keyField, rowKey);
      onExpand(row, expanded, rowIndex, e);
    }

    this.setState(() => ({ expanded: currExpanded, isClosing }));
  };

  handleAllRowExpand = (e: any, expandAll: boolean) => {
    const {
      data,
      keyField,
      expandRow: { onExpandAll, nonExpandable },
    } = this.props;

    const { expanded } = this.state;

    let currExpanded: any[];

    if (expandAll) {
      currExpanded = expanded.concat(
        dataOperator.expandableKeys(data, keyField, nonExpandable)
      );
    } else {
      currExpanded = expanded.filter(
        (s) => typeof data.find((d) => _.get(d, keyField) === s) === "undefined"
      );
    }

    if (onExpandAll) {
      onExpandAll(
        expandAll,
        dataOperator.getExpandedRows(data, keyField, currExpanded),
        e
      );
    }

    this.setState(() => ({ expanded: currExpanded }));
  };

  render() {
    const { data, keyField } = this.props;
    return (
      <RowExpandContext.Provider
        value={{
          ...this.props.expandRow,
          nonExpandable: this.props.expandRow.nonExpandable,
          expanded: this.state.expanded,
          isClosing: this.state.isClosing,
          onClosed: this.onClosed,
          isAnyExpands: dataOperator.isAnyExpands(
            data,
            keyField,
            this.state.expanded
          ),
          onRowExpand: this.handleRowExpand,
          onAllRowExpand: this.handleAllRowExpand,
        }}
      >
        {this.props.children}
      </RowExpandContext.Provider>
    );
  }
}

export default {
  Provider: RowExpandProvider,
  Consumer: RowExpandContext.Consumer,
};
