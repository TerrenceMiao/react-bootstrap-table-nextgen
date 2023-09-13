import React, { Component, MouseEvent } from "react";

import eventDelegater from "./cell-event-delegater";
import _ from "./utils";

interface CellProps {
  row: any;
  rowindex: number;
  column: any;
  columnindex: number;
  atstart?: (rowIndex: number, columnIndex: number) => void;
  editable?: string;
  clicktoedit?: string;
  dbclicktoedit?: string;
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

    // if (nextProps.formatter)

    shouldUpdate =
      (nextProps.column.formatter
        ? !_.isEqual(this.props.row, nextProps.row)
        : false) ||
      this.props.column.hidden !== nextProps.column.hidden ||
      this.props.column.isDummyField !== nextProps.column.isDummyField ||
      this.props.rowindex !== nextProps.rowindex ||
      this.props.columnindex !== nextProps.columnindex ||
      this.props.className !== nextProps.className ||
      this.props.title !== nextProps.title ||
      this.props.editable !== nextProps.editable ||
      this.props.clicktoedit !== nextProps.clicktoedit ||
      this.props.dbclicktoedit !== nextProps.dbclicktoedit ||
      !_.isEqual(this.props.style, nextProps.style) ||
      !_.isEqual(
        this.props.column.formatExtraData,
        nextProps.column.formatExtraData
      ) ||
      !_.isEqual(this.props.column.events, nextProps.column.events) ||
      !_.isEqual(this.props.column.attrs, nextProps.column.attrs) ||
      this.props.tabIndex !== nextProps.tabIndex;

    return shouldUpdate;
  }

  createHandleEditingCell(originFunc: (e: MouseEvent) => void) {
    return (e: MouseEvent) => {
      const { atstart, rowindex, columnindex, clicktoedit, dbclicktoedit } =
        this.props;
      if ((clicktoedit || dbclicktoedit) && _.isFunction(originFunc)) {
        originFunc(e);
      }
      if (atstart) {
        atstart(rowindex, columnindex);
      }
    };
  }

  render() {
    const { row, column, atstart, ...rest } = this.props;
    const { dataField, formatter, formatExtraData } = column;
    const attrs = this.delegate({ ...rest });
    let content = column.isDummyField ? null : _.get(row, dataField);

    if (formatter) {
      content = column.formatter(
        content,
        row,
        this.props.rowindex,
        formatExtraData
      );
    }

    if (this.props.clicktoedit === "true" && this.props.editable === "true") {
      attrs.onClick = this.createHandleEditingCell(attrs.onClick);
    } else if (
      this.props.dbclicktoedit === "true" &&
      this.props.editable === "true"
    ) {
      attrs.onDoubleClick = this.createHandleEditingCell(attrs.onDoubleClick);
    }

    return (
      <td {...attrs}>
        {typeof content === "boolean" ? `${content}` : content}
      </td>
    );
  }
}

export default Cell;
