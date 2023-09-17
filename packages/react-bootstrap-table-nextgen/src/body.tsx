import React, { Component, ReactNode } from "react";

import { ExpandRowProps, ROW_SELECT_DISABLED, SelectRowProps } from "..";
import withRowExpansion from "./row-expand/row-consumer";
import withRowSelection from "./row-selection/row-consumer";
import RowAggregator from "./row/aggregate-row";
import RowSection from "./row/row-section";
import { RowProps } from "./row/should-updater";
import SimpleRow from "./row/simple-row";
import _ from "./utils";

interface BodyProps {
  keyField: string;
  data: any[];
  columns: any[];
  selectRow?: SelectRowProps<any> | undefined;
  cellEdit: any;
  tabIndexCell?: boolean;
  isEmpty?: boolean;
  noDataIndication?:
    | (() => JSX.Element | string)
    | JSX.Element
    | string
    | undefined;
  visibleColumnSize?: number;
  rowStyle?:
    | React.CSSProperties
    | ((row: any, index: number) => React.CSSProperties);
  rowClasses?: string | ((row: any, index: number) => string);
  rowEvents?: Record<string, any> | null;
  expandRow?: ExpandRowProps<any, any> | undefined;
  className?: string;
}

class Body extends Component<BodyProps> {
  EditingCell: any;
  RowComponent: any;

  constructor(props: BodyProps) {
    super(props);
    const { keyField, cellEdit, selectRow, expandRow } = props;

    // Construct Editing Cell Component
    if (cellEdit?.createContext) {
      this.EditingCell = cellEdit.createEditingCell(
        _,
        cellEdit.options.onStartEdit
      );
    }

    // Construct Row Component
    let RowComponent: any = SimpleRow;

    const selectRowEnabled = selectRow?.mode !== ROW_SELECT_DISABLED;
    const expandRowEnabled = !!expandRow!.renderer;

    if (expandRowEnabled) {
      RowComponent = withRowExpansion(RowAggregator);
    }

    if (selectRowEnabled) {
      RowComponent = withRowSelection(
        expandRowEnabled ? RowComponent : RowAggregator
      );
    }

    if (cellEdit?.createContext) {
      RowComponent = cellEdit.withRowLevelCellEdit(
        RowComponent,
        selectRowEnabled,
        keyField,
        _
      );
    }

    this.RowComponent = RowComponent;
  }

  render() {
    const {
      columns,
      data,
      tabIndexCell,
      keyField,
      isEmpty,
      noDataIndication,
      visibleColumnSize,
      cellEdit,
      selectRow,
      rowStyle,
      rowClasses,
      rowEvents,
      expandRow,
      className,
    } = this.props;

    let content: ReactNode;

    if (isEmpty) {
      const indication = _.isFunction(noDataIndication)
        ? noDataIndication()
        : noDataIndication;
      if (!indication) {
        return null;
      }
      content = <RowSection content={indication} colSpan={visibleColumnSize} />;
    } else {
      const selectRowEnabled = selectRow?.mode !== ROW_SELECT_DISABLED;
      const expandRowEnabled = !!expandRow!.renderer;

      const additionalRowProps: RowProps = {};

      if (cellEdit?.createContext) {
        additionalRowProps.EditingCellComponent = this.EditingCell;
      }

      if (selectRowEnabled || expandRowEnabled) {
        additionalRowProps.expandRow = expandRow;
        additionalRowProps.selectRow = selectRow;
      }

      content = data.map((row, index) => {
        if (row) {
          const key = _.get(row, keyField);
          const baseRowProps = {
            key,
            row,
            tabIndexCell,
            columns,
            keyField,
            cellEdit,
            value: key,
            rowIndex: index,
            visibleColumnSize,
            attrs: rowEvents || {},
            ...additionalRowProps,
          };

          baseRowProps.style = _.isFunction(rowStyle)
            ? rowStyle(row, index)
            : rowStyle;
          baseRowProps.className = _.isFunction(rowClasses)
            ? rowClasses(row, index)
            : rowClasses;

          return <this.RowComponent {...baseRowProps} />;
        } else {
          return null;
        }
      });
    }

    return <tbody className={className}>{content}</tbody>;
  }
}

export default Body;
