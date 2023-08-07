/* eslint camelcase: 0 */
/* eslint react/prop-types: 0 */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import dataOperator from '../store/operators';
import _ from '../utils';

const RowExpandContext = React.createContext();

class RowExpandProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    data: PropTypes.array.isRequired,
    keyField: PropTypes.string.isRequired
  };

  props: any;
  setState: any;

  // @ts-expect-error TS(2729): Property 'props' is used before its initialization... Remove this comment to see the full error message
  state = { expanded: this.props.expandRow.expanded || [],
    // @ts-expect-error TS(2729): Property 'props' is used before its initialization... Remove this comment to see the full error message
    isClosing: this.props.expandRow.isClosing || [] };

  onClosed = (closedRow: any) => {
    this.setState({ isClosing: this.state.isClosing.filter((value: any) => value !== closedRow) });
  };

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (nextProps.expandRow) {
      let nextExpanded = [...(nextProps.expandRow.expanded || this.state.expanded)];
      const { nonExpandable = [] } = nextProps.expandRow;
      nextExpanded = nextExpanded.filter(rowId => !_.contains(nonExpandable, rowId));
      const isClosing = this.state.expanded.reduce((acc: any, cur: any) => {
        if (!_.contains(nextExpanded, cur)) {
          acc.push(cur);
        }
        return acc;
      }, []);

      this.setState(() => ({
        expanded: nextExpanded,
        isClosing
      }));
    } else {
      this.setState(() => ({
        expanded: this.state.expanded
      }));
    }
  }

  handleRowExpand = (rowKey: any, expanded: any, rowIndex: any, e: any) => {
    const { data, keyField, expandRow: { onExpand, onlyOneExpanding, nonExpandable } } = this.props;
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
      currExpanded = currExpanded.filter(value => value !== rowKey);
    }

    if (onExpand) {
      const row = dataOperator.getRowByRowId(data, keyField, rowKey);
      onExpand(row, expanded, rowIndex, e);
    }
    this.setState(() => ({ expanded: currExpanded, isClosing }));
  };

  handleAllRowExpand = (e: any, expandAll: any) => {
    const {
      data,
      keyField,
      expandRow: {
        onExpandAll,
        nonExpandable
      }
    } = this.props;
    const { expanded } = this.state;

    let currExpanded: any;

    if (expandAll) {
      currExpanded = expanded.concat(dataOperator.expandableKeys(data, keyField, nonExpandable));
    } else {
      currExpanded = expanded.filter((s: any) => typeof data.find((d: any) => _.get(d, keyField) === s) === 'undefined');
    }

    if (onExpandAll) {
      onExpandAll(expandAll, dataOperator.getExpandedRows(data, keyField, currExpanded), e);
    }

    this.setState(() => ({ expanded: currExpanded }));
  };

  render() {
    const { data, keyField } = this.props;
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <RowExpandContext.Provider
        value={ {
          ...this.props.expandRow,
          nonExpandable: this.props.expandRow.nonExpandable,
          expanded: this.state.expanded,
          isClosing: this.state.isClosing,
          onClosed: this.onClosed,
          isAnyExpands: dataOperator.isAnyExpands(data, keyField, this.state.expanded),
          onRowExpand: this.handleRowExpand,
          onAllRowExpand: this.handleAllRowExpand
        } }
      >
        { this.props.children }
      </RowExpandContext.Provider>
    );
  }
}

export default {
  Provider: RowExpandProvider,
  Consumer: RowExpandContext.Consumer
};
