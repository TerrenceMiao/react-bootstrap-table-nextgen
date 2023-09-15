import React, { Component, MouseEvent } from "react";
import { ROW_SELECT_SINGLE } from "../..";
import _ from "../utils";
import { BootstrapContext } from "../contexts/bootstrap";

interface SelectionCellProps {
  mode?: string;
  rowKey: any;
  selected: boolean;
  onRowSelect?: (
    rowKey: any,
    checked: boolean,
    rowIndex: number,
    e: MouseEvent
  ) => void;
  disabled?: boolean;
  rowIndex?: number;
  tabIndex?: number;
  clickToSelect?: boolean;
  selectionRenderer?: (args: {
    mode: string;
    checked: boolean;
    disabled?: boolean;
    rowindex?: number;
    rowkey: any;
  }) => React.ReactNode;
  selectColumnStyle?:
    | React.CSSProperties
    | ((args: {
        checked: boolean;
        disabled?: boolean;
        rowindex?: number;
        rowkey: any;
      }) => React.CSSProperties);
}

export default class SelectionCell extends Component<SelectionCellProps> {
  constructor(props: SelectionCellProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps: SelectionCellProps) {
    const shouldUpdate =
      this.props.rowIndex !== nextProps.rowIndex ||
      this.props.selected !== nextProps.selected ||
      this.props.disabled !== nextProps.disabled ||
      this.props.rowKey !== nextProps.rowKey ||
      this.props.tabIndex !== nextProps.tabIndex ||
      this.props.selectColumnStyle !== nextProps.selectColumnStyle;

    return shouldUpdate;
  }

  handleClick(e: MouseEvent<HTMLTableCellElement>) {
    const {
      mode: inputType,
      rowKey,
      selected,
      onRowSelect,
      disabled,
      rowIndex = -1,
    } = this.props;
    e.stopPropagation();
    if (disabled) return;

    const checked = inputType === ROW_SELECT_SINGLE ? true : !selected;

    onRowSelect!(rowKey, checked, rowIndex, e);
  }

  render() {
    const {
      rowKey,
      mode: inputType,
      selected,
      disabled,
      tabIndex = -1,
      rowIndex,
      selectionRenderer,
      selectColumnStyle,
    } = this.props;

    const attrs: React.HTMLAttributes<HTMLTableCellElement> = {};
    if (tabIndex !== -1) attrs.tabIndex = tabIndex;

    attrs.style = _.isFunction(selectColumnStyle)
      ? selectColumnStyle({
          checked: selected,
          disabled,
          rowindex: rowIndex,
          rowkey: rowKey,
        })
      : selectColumnStyle;

    return (
      <BootstrapContext.Consumer>
        {({ bootstrap4 }) => (
          <td className="selection-cell" onClick={this.handleClick} {...attrs}>
            {selectionRenderer ? (
              selectionRenderer({
                mode: inputType!,
                checked: selected,
                disabled,
                rowindex: rowIndex,
                rowkey: rowKey,
              })
            ) : (
              <input
                type={inputType}
                checked={selected}
                disabled={disabled ?? false}
                className={bootstrap4 ? "selection-input-4" : ""}
                onChange={() => {}}
              />
            )}
          </td>
        )}
      </BootstrapContext.Consumer>
    );
  }
}
