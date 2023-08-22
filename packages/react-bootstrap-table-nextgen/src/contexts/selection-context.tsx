import React, { Component, ReactNode } from "react";
import _ from "../utils";

import {
  CHECKBOX_STATUS_CHECKED,
  CHECKBOX_STATUS_INDETERMINATE,
  CHECKBOX_STATUS_UNCHECKED,
  ROW_SELECT_SINGLE,
} from "../..";
import dataOperator from "../store/operators";
import { getSelectionSummary } from "../store/selection";

export interface SelectionContextValue {
  selected?: any[];
  onRowSelect?: (
    rowKey: any,
    checked: boolean,
    rowIndex: number,
    e: any
  ) => void;
  onAllRowsSelect?: (e: any, isUnSelect: boolean) => void;
  allRowsSelected?: boolean;
  allRowsNotSelected?: boolean;
  checkedStatus?: string;
  mode?: string;
  hideSelectColumn?: boolean;
  clickToSelect?: boolean;
  clickToSelectAndEditCell?: boolean;
  onSelect?: (
    row: any,
    checked: boolean,
    rowIndex: number,
    e: any
  ) => boolean | undefined;
  onSelectAll?: (checked: boolean, selectedRows: any[], e: any) => void | any[];
  nonSelectable?: any[];
  hideSelectAll?: boolean;
}

interface SelectionProviderProps {
  children: ReactNode;
  data: any[];
  keyField: string;
  selectRow: {
    selected?: any[];
    mode?: string;
    hideSelectColumn?: boolean;
    clickToSelect?: boolean;
    clickToSelectAndEditCell?: boolean;
    onSelect?: (
      row: any,
      checked: boolean,
      rowIndex: number,
      e: any
    ) => boolean;
    onSelectAll?: (
      checked: boolean,
      selectedRows: any[],
      e: any
    ) => void | any[];
    nonSelectable?: any[];
  };
}

const defaultSelectionContext = {};
const SelectionContext = React.createContext<SelectionContextValue>(
  defaultSelectionContext
);

class SelectionProvider extends Component<SelectionProviderProps> {
  selected: any[];

  constructor(props: SelectionProviderProps) {
    super(props);
    this.selected = props.selectRow.selected || [];
  }

  // exposed API
  getSelected() {
    return this.selected;
  }

  componentDidUpdate(nextProps: SelectionProviderProps) {
    if (nextProps.selectRow) {
      this.selected = nextProps.selectRow.selected || this.selected;
    }
  }

  handleRowSelect = (
    rowKey: any,
    checked: boolean,
    rowIndex: number,
    e: any
  ) => {
    const {
      data,
      keyField,
      selectRow: { mode, onSelect },
    } = this.props;

    let currSelected = [...this.selected];

    let result = true;
    if (onSelect) {
      const row = dataOperator.getRowByRowId(data, keyField, rowKey);
      result = onSelect(row, checked, rowIndex, e);
    }

    if (result === true || result === undefined) {
      if (mode === ROW_SELECT_SINGLE) {
        currSelected = [rowKey];
      } else if (checked) {
        currSelected.push(rowKey);
      } else {
        currSelected = currSelected.filter((value) => value !== rowKey);
      }
    }
    this.selected = currSelected;
    this.forceUpdate();
  };

  handleAllRowsSelect = (e: any, isUnSelect: boolean) => {
    const {
      data,
      keyField,
      selectRow: { onSelectAll, nonSelectable },
    } = this.props;
    const { selected } = this;

    let currSelected;

    if (!isUnSelect) {
      currSelected = selected.concat(
        dataOperator.selectableKeys(data, keyField, nonSelectable)
      );
    } else {
      currSelected = selected.filter(
        (s) => typeof data.find((d) => _.get(d, keyField) === s) === "undefined"
      );
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
  };

  render() {
    const { allRowsSelected, allRowsNotSelected } = getSelectionSummary(
      this.props.data,
      this.props.keyField,
      this.selected
    );

    let checkedStatus: string;

    if (allRowsSelected) {
      checkedStatus = CHECKBOX_STATUS_CHECKED;
    } else if (allRowsNotSelected) {
      checkedStatus = CHECKBOX_STATUS_UNCHECKED;
    } else {
      checkedStatus = CHECKBOX_STATUS_INDETERMINATE;
    }

    return (
      <SelectionContext.Provider
        value={{
          ...this.props.selectRow,
          selected: this.selected,
          onRowSelect: this.handleRowSelect,
          onAllRowsSelect: this.handleAllRowsSelect,
          allRowsSelected,
          allRowsNotSelected,
          checkedStatus,
        }}
      >
        {this.props.children}
      </SelectionContext.Provider>
    );
  }
}

export default () => ({
  Provider: SelectionProvider,
  Consumer: SelectionContext.Consumer,
});
