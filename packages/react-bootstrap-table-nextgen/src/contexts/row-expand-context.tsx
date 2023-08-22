import React, { Component, ReactNode } from "react";
import dataOperator from "../store/operators";
import _ from "../utils";

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

const defaultRowExpandContext = {
  expanded: [],
  isClosing: [],
  onClosed: () => {},
  isAnyExpands: false,
  onRowExpand: () => {},
  onAllRowExpand: () => {},
};
const RowExpandContext = React.createContext<RowExpandContextValue>(
  defaultRowExpandContext
);

class RowExpandProvider extends Component<RowExpandProviderProps> {
  state = {
    expanded: this.props.expandRow.expanded || [],
    isClosing: this.props.expandRow.isClosing || [],
  };

  onClosed = (closedRow: any) => {
    this.setState({
      isClosing: this.state.isClosing.filter((value) => value !== closedRow),
    });
  };

  static getDerivedStateFromProps(
    nextProps: RowExpandProviderProps,
    prevState: { expanded: any[]; isClosing: any[] }
  ) {
    const { expandRow } = nextProps;

    if (expandRow) {
      const { nonExpandable = [] } = expandRow;

      let nextExpanded = [...(expandRow.expanded || prevState.expanded)];
      nextExpanded = nextExpanded.filter(
        (rowId) => !_.contains(nonExpandable, rowId)
      );

      const isClosing = prevState.expanded.reduce((acc: any, cur: any) => {
        if (!_.contains(nextExpanded, cur)) {
          acc.push(cur);
        }
        return acc;
      }, []);

      return {
        expanded: nextExpanded,
        isClosing,
      };
    } else {
      return prevState;
    }
  }

  handleRowExpand = (
    rowKey: any,
    isExpanded: boolean,
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
    let currIsClosing = [...this.state.isClosing];

    if (isExpanded) {
      if (onlyOneExpanding) {
        currIsClosing = currIsClosing.concat(currExpanded);
        currExpanded = [rowKey];
      } else currExpanded.push(rowKey);
    } else {
      currIsClosing.push(rowKey);
      currExpanded = currExpanded.filter((value) => value !== rowKey);
    }

    if (onExpand) {
      const row = dataOperator.getRowByRowId(data, keyField, rowKey);
      onExpand(row, isExpanded, rowIndex, e);
    }

    this.setState(() => ({ expanded: currExpanded, isClosing: currIsClosing }));
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

export default () => ({
  Provider: RowExpandProvider,
  Consumer: RowExpandContext.Consumer,
});
