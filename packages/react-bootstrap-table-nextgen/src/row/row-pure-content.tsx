import React, { Component } from "react";

import Cell from "../cell";
import _ from "../utils";
import { RowProps } from "./should-updater";

interface RowPureContentProps extends RowProps {
  atstart?: (rowIndex: number, columnIndex: number) => void;
  shouldUpdate?: boolean;
  isEditable?: boolean;
}

export default class RowPureContent extends Component<RowPureContentProps> {
  shouldComponentUpdate(nextProps: RowPureContentProps) {
    if (typeof nextProps.shouldUpdate !== "undefined") {
      return nextProps.shouldUpdate;
    }
    return true;
  }

  render() {
    const {
      row,
      keyField,
      columns,
      rowIndex,
      isEditable,
      editingRowIdx,
      editingColIdx,
      atstart,
      clickToEdit,
      dbclickToEdit,
      EditingCellComponent,
      tabIndexStart,
    } = this.props;

    let tabIndex = tabIndexStart;

    return columns?.map((column, index) => {
      const { dataField } = column;
      const content = _.get(row, dataField);
      if (
        rowIndex === editingRowIdx &&
        index === editingColIdx &&
        EditingCellComponent
      ) {
        return (
          <EditingCellComponent
            key={`${content}-${index}-editing`}
            row={row}
            rowIndex={rowIndex}
            column={column}
            columnIndex={index}
          />
        );
      }
      // render cell
      let cellTitle;
      let cellStyle: React.CSSProperties = {};
      let cellAttrs: React.HTMLAttributes<HTMLTableCellElement> = {
        ...(typeof column.attrs === "function"
          ? column.attrs(content, row, rowIndex, index)
          : column.attrs),
      };

      if (column.events) {
        const events = { ...column.events };
        Object.keys(events).forEach((key) => {
          const originFn = events[key];
          events[key] = (...rest: any[]) => originFn(...rest, row, rowIndex);
        });
        cellAttrs = { ...cellAttrs, ...events };
      }

      const cellClasses = _.isFunction(column.classes)
        ? column.classes(content, row, rowIndex, index)
        : column.classes;

      if (column.style) {
        cellStyle = _.isFunction(column.style)
          ? column.style(content, row, rowIndex, index)
          : column.style;
        cellStyle = { ...cellStyle } || {};
      }

      if (column.title) {
        cellTitle = _.isFunction(column.title)
          ? column.title(content, row, rowIndex, index)
          : content;
        cellAttrs.title = cellTitle;
      }

      if (column.align) {
        cellStyle.textAlign = _.isFunction(column.align)
          ? column.align(content, row, rowIndex, index)
          : column.align;
      }

      if (cellClasses) cellAttrs.className = cellClasses;
      if (!_.isEmptyObject(cellStyle)) cellAttrs.style = cellStyle;

      let editableCell = _.isDefined(column.editable) ? column.editable : true;
      if (column.dataField === keyField || !isEditable) editableCell = false;
      if (_.isFunction(column.editable)) {
        editableCell = column.editable(content, row, rowIndex, index);
      }

      if (tabIndexStart !== -1) {
        cellAttrs.tabIndex = tabIndex!;
        tabIndex = tabIndex! + 1;
      }

      return (
        <Cell
          key={`${content}-${index}`}
          row={row}
          editable={editableCell.toString()}
          rowindex={rowIndex ?? 0}
          columnindex={index}
          column={column}
          atstart={atstart}
          clicktoedit={clickToEdit ? clickToEdit.toString() : "false"}
          dbclicktoedit={dbclickToEdit ? dbclickToEdit.toString() : "false"}
          {...cellAttrs}
        />
      );
    });
  }
}
