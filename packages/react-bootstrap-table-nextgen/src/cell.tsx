import React, { Component, MouseEvent } from "react";

import eventDelegater from "./cell-event-delegater";
import _ from "./utils";

interface CellProps {
  row: any;
  rowIndex: number;
  column: any;
  columnIndex: number;
  onStart?: (rowIndex: number, columnIndex: number) => void;
  editable?: boolean;
  clickToEdit?: boolean;
  dbclickToEdit?: boolean;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  tabIndex?: number;
}

class Cell extends eventDelegater(Component)<CellProps> {
  constructor(props: CellProps) {
    super(props);
    this.createHandleEditingCell = this.createHandleEditingCell.bind(this);
  }

  shouldComponentUpdate(nextProps: CellProps) {
    let shouldUpdate = false;
    if (nextProps.column.isDummyField) {
      shouldUpdate = !_.isEqual(this.props.row, nextProps.row);
    } else {
      shouldUpdate =
        _.get(this.props.row, this.props.column.dataField) !==
        _.get(nextProps.row, nextProps.column.dataField);
    }

    if (shouldUpdate) return true;

    // Other comparisons here

    return shouldUpdate;
  }

  createHandleEditingCell(originFunc: (e: MouseEvent) => void) {
    return (e: MouseEvent) => {
      const { onStart, rowIndex, columnIndex, clickToEdit, dbclickToEdit } =
        this.props;
      if ((clickToEdit || dbclickToEdit) && _.isFunction(originFunc)) {
        originFunc(e);
      }
      if (onStart) {
        onStart(rowIndex, columnIndex);
      }
    };
  }

  render() {
    const { row, column, ...rest } = this.props;
    const { dataField, formatter, formatExtraData } = column;
    const attrs = this.delegate({ ...rest });
    let content = column.isDummyField ? null : _.get(row, dataField);

    if (formatter) {
      content = column.formatter(
        content,
        row,
        this.props.rowIndex,
        formatExtraData
      );
    }

    if (this.props.clickToEdit && this.props.editable) {
      attrs.onClick = this.createHandleEditingCell(attrs.onClick);
    } else if (this.props.dbclickToEdit && this.props.editable) {
      attrs.onDoubleClick = this.createHandleEditingCell(attrs.onDoubleClick);
    }

    return (
      <td { ...attrs }>
        {typeof content === "boolean" ? `${content}` : content}
      </td>
    );
  }
}

// Cell.propTypes = {
//   row: PropTypes.object.isRequired,
//   rowIndex: PropTypes.number.isRequired,
//   column: PropTypes.object.isRequired,
//   columnIndex: PropTypes.number.isRequired,
// };

export default Cell;
