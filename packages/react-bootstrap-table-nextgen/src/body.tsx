import React, { Component, ReactNode } from "react";

import Const from "./const";
import withRowExpansion from "./row-expand/row-consumer";
import withRowSelection from "./row-selection/row-consumer";
import RowAggregator from "./row/aggregate-row";
import RowSection from "./row/row-section";
import SimpleRow from "./row/simple-row";
import _ from "./utils";
import { RowProps } from "./row/should-updater";

interface BodyProps {
  keyField: string;
  data: any[];
  columns: any[];
  selectRow?: any;
  cellEdit: any;
  tabIndexCell?: boolean;
  isEmpty?: boolean;
  noDataIndication?: string | (() => ReactNode);
  visibleColumnSize?: number;
  rowStyle?:
    | React.CSSProperties
    | ((row: any, index: number) => React.CSSProperties);
  rowClasses?: string | ((row: any, index: number) => string);
  rowEvents?: Record<string, any> | null;
  expandRow: any;
  className?: string;
}

class Body extends Component<BodyProps> {
  EditingCell: any;
  RowComponent: any;

  constructor(props: BodyProps) {
    super(props);
    const { keyField, cellEdit, selectRow, expandRow } = props;

    // Construct Editing Cell Component
    if (cellEdit.createContext) {
      this.EditingCell = cellEdit.createEditingCell(
        _,
        cellEdit.options.onStartEdit
      );
    }

    // Construct Row Component
    let RowComponent: any;

    const selectRowEnabled = selectRow?.mode !== Const.ROW_SELECT_DISABLED;
    const expandRowEnabled = !!expandRow?.renderer;

    if (expandRowEnabled) {
      RowComponent = withRowExpansion(RowAggregator);
    } else if (selectRowEnabled) {
      RowComponent = withRowSelection(
        expandRowEnabled ? RowComponent : RowAggregator
      );
    } else if (cellEdit.createContext) {
      RowComponent = cellEdit.withRowLevelCellEdit(
        RowComponent,
        selectRowEnabled,
        keyField,
        _
      );
    } else {
      RowComponent = SimpleRow;
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
      className
    } = this.props;

    let content: ReactNode;

    if (isEmpty) {
      const indication = _.isFunction(noDataIndication)
        ? noDataIndication()
        : noDataIndication;
      if (!indication) {
        return null;
      }
      content = <RowSection content={ indication } colSpan={ visibleColumnSize } />;
    } else {
      const selectRowEnabled = selectRow?.mode !== Const.ROW_SELECT_DISABLED;
      const expandRowEnabled = !!expandRow?.renderer;

      const additionalRowProps: RowProps = {};

      if (cellEdit.createContext) {
        additionalRowProps.EditingCellComponent = this.EditingCell;
      }

      if (selectRowEnabled || expandRowEnabled) {
        additionalRowProps.expandRow = expandRow;
        additionalRowProps.selectRow = selectRow;
      }

      content = data.map((row, index) => {
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
          ...additionalRowProps
        };

        baseRowProps.style = _.isFunction(rowStyle)
          ? rowStyle(row, index)
          : rowStyle;
        baseRowProps.className = _.isFunction(rowClasses)
          ? rowClasses(row, index)
          : rowClasses;

        return <this.RowComponent { ...baseRowProps } />;
      });
    }

    return <tbody className={ className }>{content}</tbody>;
  }
}

// Body.propTypes = {
//   keyField: PropTypes.string.isRequired,
//   data: PropTypes.array.isRequired,
//   columns: PropTypes.array.isRequired,
//   selectRow: PropTypes.object,
//   cellEdit: PropTypes.any.isRequired,
//   tabIndexCell: PropTypes.bool.isRequired,
//   isEmpty: PropTypes.bool.isRequired,
//   noDataIndication: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
//     .isRequired,
//   visibleColumnSize: PropTypes.number.isRequired,
//   rowStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
//   rowClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
//     .isRequired,
//   rowEvents: PropTypes.object,
//   expandRow: PropTypes.any.isRequired,
//   className: PropTypes.string,
// };

export default Body;
