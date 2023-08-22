import React, { Component, ReactNode } from "react";
import {
  CHECKBOX_STATUS_CHECKED,
  CHECKBOX_STATUS_INDETERMINATE,
  ROW_SELECT_MULTIPLE,
  ROW_SELECT_SINGLE,
} from "../..";
import _ from "../utils";
import { BootstrapContext } from "../contexts/bootstrap";

interface CheckBoxProps {
  className?: string;
  checked: boolean;
  indeterminate: boolean;
}

export const CheckBox: React.FC<CheckBoxProps> = ({
  className,
  checked,
  indeterminate,
}) => (
  <input
    type="checkbox"
    checked={checked}
    className={className}
    ref={(input) => {
      if (input) {
        input.indeterminate = indeterminate;
      }
    }}
    onChange={() => {}}
  />
);

interface SelectionHeaderCellProps {
  mode?: string;
  checkedStatus?: string;
  onAllRowsSelect?: (
    e: React.MouseEvent<HTMLTableHeaderCellElement>,
    isUnSelect: boolean
  ) => void;
  hideSelectAll?: boolean;
  selectionHeaderRenderer?: (args: {
    mode?: string;
    checked: boolean;
    indeterminate: boolean;
  }) => ReactNode;
  headerColumnStyle?:
    | React.CSSProperties
    | ((checkedStatus: string) => React.CSSProperties);
}

export default class SelectionHeaderCell extends Component<SelectionHeaderCellProps> {
  constructor(props: SelectionHeaderCellProps) {
    super(props);
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
  }

  shouldComponentUpdate(nextProps: SelectionHeaderCellProps) {
    const { mode, checkedStatus } = this.props;

    if (mode === ROW_SELECT_SINGLE) return false;

    return nextProps.checkedStatus !== checkedStatus;
  }

  handleCheckBoxClick(e: React.MouseEvent<HTMLTableHeaderCellElement>) {
    const { onAllRowsSelect, checkedStatus } = this.props;
    const isUnSelect =
      checkedStatus === CHECKBOX_STATUS_CHECKED ||
      checkedStatus === CHECKBOX_STATUS_INDETERMINATE;

    onAllRowsSelect!(e, isUnSelect);
  }

  render() {
    const {
      mode,
      checkedStatus,
      selectionHeaderRenderer,
      hideSelectAll,
      headerColumnStyle,
    } = this.props;
    if (hideSelectAll) {
      return <th data-row-selection />;
    }

    const checked = checkedStatus === CHECKBOX_STATUS_CHECKED;

    const indeterminate = checkedStatus === CHECKBOX_STATUS_INDETERMINATE;

    const attrs: React.HTMLAttributes<HTMLTableHeaderCellElement> = {};
    let content: ReactNode | undefined;
    if (selectionHeaderRenderer || mode === ROW_SELECT_MULTIPLE) {
      attrs.onClick = this.handleCheckBoxClick;
    }

    attrs.style = _.isFunction(headerColumnStyle)
      ? headerColumnStyle(checkedStatus!)
      : headerColumnStyle;

    return (
      <BootstrapContext.Consumer>
        {({ bootstrap4 }) => {
          if (selectionHeaderRenderer) {
            content = selectionHeaderRenderer({
              mode,
              checked,
              indeterminate,
            });
          } else if (mode === ROW_SELECT_MULTIPLE) {
            content = (
              <CheckBox
                {...this.props}
                checked={checked}
                className={bootstrap4 ? "selection-input-4" : ""}
                indeterminate={indeterminate}
              />
            );
          }
          return (
            <th className="selection-cell-header" data-row-selection {...attrs}>
              {content}
            </th>
          );
        }}
      </BootstrapContext.Consumer>
    );
  }
}
