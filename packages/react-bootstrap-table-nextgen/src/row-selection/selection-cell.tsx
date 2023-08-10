import PropTypes from "prop-types";
import React, { Component, MouseEvent } from "react";
import Const from "../const";
import { BootstrapContext } from "../contexts/bootstrap";
import _ from "../utils";

interface SelectionCellProps {
  mode: string;
  rowKey: any;
  selected: boolean;
  onRowSelect: (
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
    disabled: boolean;
    rowIndex?: number;
    rowKey: any;
  }) => React.ReactNode;
  selectColumnStyle?:
    | React.CSSProperties
    | ((args: {
        checked: boolean;
        disabled: boolean;
        rowIndex?: number;
        rowKey: any;
      }) => React.CSSProperties);
}

export default class SelectionCell extends Component<SelectionCellProps> {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    rowKey: PropTypes.any,
    selected: PropTypes.bool,
    onRowSelect: PropTypes.func,
    disabled: PropTypes.bool,
    rowIndex: PropTypes.number,
    tabIndex: PropTypes.number,
    clickToSelect: PropTypes.bool,
    selectionRenderer: PropTypes.func,
    selectColumnStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
  };

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
      disabled = false,
      rowIndex = -1
    } = this.props;
    e.stopPropagation();
    if (disabled) return;

    const checked = inputType === Const.ROW_SELECT_SINGLE ? true : !selected;

    onRowSelect(rowKey, checked, rowIndex, e);
  }

  render() {
    const {
      rowKey,
      mode: inputType,
      selected,
      disabled = false,
      tabIndex = -1,
      rowIndex,
      selectionRenderer,
      selectColumnStyle
    } = this.props;

    const attrs: React.HTMLAttributes<HTMLTableCellElement> = {};
    if (tabIndex !== -1) attrs.tabIndex = tabIndex;

    attrs.style = _.isFunction(selectColumnStyle)
      ? selectColumnStyle({
        checked: selected,
        disabled,
        rowIndex,
        rowKey
      })
      : selectColumnStyle;

    return (
      <BootstrapContext.Consumer>
        {({ bootstrap4 }) => (
          <td className="selection-cell" onClick={ this.handleClick } { ...attrs }>
            {selectionRenderer ? (
              selectionRenderer({
                mode: inputType,
                checked: selected,
                disabled,
                rowIndex,
                rowKey
              })
            ) : (
              <input
                type={ inputType }
                checked={ selected }
                disabled={ disabled }
                className={ bootstrap4 ? "selection-input-4" : "" }
                onChange={ () => {} }
              />
            )}
          </td>
        )}
      </BootstrapContext.Consumer>
    );
  }
}
