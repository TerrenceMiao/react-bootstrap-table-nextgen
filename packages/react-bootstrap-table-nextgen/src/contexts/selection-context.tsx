import PropTypes from "prop-types";
import React, { Component, createContext, ReactNode } from "react";
import Const from "../const";
import _ from "../utils";

import dataOperator from "../store/operators";
import { getSelectionSummary } from "../store/selection";

export interface SelectionContextProps {
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

const SelectionContext = createContext<SelectionContextProps | undefined>(
  undefined
);

class SelectionProvider extends Component<SelectionProviderProps> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    data: PropTypes.array.isRequired,
    keyField: PropTypes.string.isRequired,
    selectRow: PropTypes.shape({
      selected: PropTypes.array,
      mode: PropTypes.string,
      hideSelectColumn: PropTypes.bool,
      clickToSelect: PropTypes.bool,
      clickToSelectAndEditCell: PropTypes.bool,
      onSelect: PropTypes.func,
      onSelectAll: PropTypes.func,
      nonSelectable: PropTypes.array,
    }),
  };

  selected: any[];

  constructor(props: SelectionProviderProps) {
    super(props);
    this.selected = props.selectRow.selected || [];
  }

  // exposed API
  getSelected() {
    return this.selected;
  }

  componentDidUpdate(prevProps: SelectionProviderProps) {
    const { selectRow } = this.props;
    if (selectRow) {
      this.selected = selectRow.selected || this.selected;
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
    const { ROW_SELECT_SINGLE } = Const;

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

    if (allRowsSelected) checkedStatus = Const.CHECKBOX_STATUS_CHECKED;
    else if (allRowsNotSelected)
      checkedStatus = Const.CHECKBOX_STATUS_UNCHECKED;
    else checkedStatus = Const.CHECKBOX_STATUS_INDETERMINATE;

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

export default {
  Provider: SelectionProvider,
  Consumer: SelectionContext.Consumer,
};
