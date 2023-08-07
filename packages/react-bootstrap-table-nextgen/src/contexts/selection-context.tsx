/* eslint camelcase: 0 */
/* eslint react/prop-types: 0 */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import Const from '../const';
import _ from '../utils';

import dataOperator from '../store/operators';
import { getSelectionSummary } from '../store/selection';

const SelectionContext = React.createContext();
class SelectionProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    data: PropTypes.array.isRequired,
    keyField: PropTypes.string.isRequired
  }

  forceUpdate: any;
  props: any;
  selected: any;

  constructor(props: any) {
    super(props);
    this.selected = props.selectRow.selected || [];
  }

  // exposed API
  getSelected() {
    return this.selected;
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (nextProps.selectRow) {
      this.selected = nextProps.selectRow.selected || this.selected;
    }
  }

  handleRowSelect = (rowKey: any, checked: any, rowIndex: any, e: any) => {
    const { data, keyField, selectRow: { mode, onSelect } } = this.props;
    const { ROW_SELECT_SINGLE } = Const;

    let currSelected = [...this.selected];

    let result = true;
    if (onSelect) {
      const row = dataOperator.getRowByRowId(data, keyField, rowKey);
      result = onSelect(row, checked, rowIndex, e);
    }

    if (result === true || result === undefined) {
      if (mode === ROW_SELECT_SINGLE) { // when select mode is radio
        currSelected = [rowKey];
      } else if (checked) { // when select mode is checkbox
        currSelected.push(rowKey);
      } else {
        currSelected = currSelected.filter(value => value !== rowKey);
      }
    }
    this.selected = currSelected;
    this.forceUpdate();
  }

  handleAllRowsSelect = (e: any, isUnSelect: any) => {
    const {
      data,
      keyField,
      selectRow: {
        onSelectAll,
        nonSelectable
      }
    } = this.props;
    const { selected } = this;

    let currSelected;

    if (!isUnSelect) {
      currSelected = selected.concat(dataOperator.selectableKeys(data, keyField, nonSelectable));
    } else {
      currSelected = selected.filter((s: any) => typeof data.find((d: any) => _.get(d, keyField) === s) === 'undefined');
    }

    let result;
    if (onSelectAll) {
      result = onSelectAll(
        !isUnSelect,
        dataOperator.getSelectedRows(
          data,
          keyField,
          isUnSelect ? selected : currSelected
        ),
        e
      );
      if (Array.isArray(result)) {
        currSelected = result;
      }
    }
    this.selected = currSelected;
    this.forceUpdate();
  }

  render() {
    const {
      allRowsSelected,
      allRowsNotSelected
    } = getSelectionSummary(
      this.props.data,
      this.props.keyField,
      this.selected
    );

    let checkedStatus;

    // checkbox status depending on selected rows counts
    if (allRowsSelected) checkedStatus = Const.CHECKBOX_STATUS_CHECKED;
    else if (allRowsNotSelected) checkedStatus = Const.CHECKBOX_STATUS_UNCHECKED;
    else checkedStatus = Const.CHECKBOX_STATUS_INDETERMINATE;

    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <SelectionContext.Provider
        value={ {
          ...this.props.selectRow,
          selected: this.selected,
          onRowSelect: this.handleRowSelect,
          onAllRowsSelect: this.handleAllRowsSelect,
          allRowsSelected,
          allRowsNotSelected,
          checkedStatus
        } }
      >
        { this.props.children }
      </SelectionContext.Provider>
    );
  }
}

export default {
  Provider: SelectionProvider,
  Consumer: SelectionContext.Consumer
};
