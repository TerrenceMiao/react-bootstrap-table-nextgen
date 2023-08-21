import React, { Component } from "react";
import { INDICATOR_POSITION_LEFT } from "../..";
import ExpandCell from "../row-expand/expand-cell";
import SelectionCell from "../row-selection/selection-cell";
import _ from "../utils";
import eventDelegater from "./event-delegater";
import RowPureContent from "./row-pure-content";
import shouldUpdater, { RowProps } from "./should-updater";

class RowAggregator extends shouldUpdater(eventDelegater(Component<RowProps>)) {
  clickNum: number = 0;
  shouldUpdateRowContent: boolean = false;

  constructor(props: RowProps) {
    super(props);
    this.createClickEventHandler = this.createClickEventHandler.bind(this);
  }

  shouldComponentUpdate(nextProps: RowProps) {
    if (
      this.props.selected !== nextProps.selected ||
      this.props.expanded !== nextProps.expanded ||
      this.props.expandable !== nextProps.expandable ||
      this.props.selectable !== nextProps.selectable ||
      this.props.selectRow.hideSelectColumn !==
        nextProps.selectRow.hideSelectColumn ||
      this.shouldUpdatedBySelfProps(nextProps)
    ) {
      this.shouldUpdateRowContent = this.shouldRowContentUpdate(nextProps);
      return true;
    }
    this.shouldUpdateRowContent = this.shouldRowContentUpdate(nextProps);

    return this.shouldUpdateRowContent;
  }

  isRenderFunctionColumnInLeft(position = INDICATOR_POSITION_LEFT): boolean {
    return position === INDICATOR_POSITION_LEFT;
  }

  render() {
    const {
      row,
      columns,
      keyField,
      rowIndex,
      style,
      className,
      attrs,
      selectRow,
      expandRow,
      expanded,
      expandable,
      selected,
      selectable,
      visibleColumnSize,
      tabIndexCell,
      ...rest
    } = this.props;
    const key = _.get(row, keyField);
    const { hideSelectColumn, selectColumnPosition, clickToSelect } = selectRow;
    const { showExpandColumn = undefined, expandColumnPosition = undefined } =
      expandRow ?? {};

    const newAttrs = this.delegate({ ...attrs });
    if (clickToSelect || (expandRow && !!expandRow.renderer)) {
      newAttrs.onClick = this.createClickEventHandler(newAttrs.onClick);
    }

    let tabIndexStart = rowIndex! * visibleColumnSize! + 1;

    const childrens = [
      <RowPureContent
        key="row"
        row={row}
        columns={columns}
        keyField={keyField}
        rowIndex={rowIndex}
        shouldUpdate={this.shouldUpdateRowContent}
        tabIndexStart={tabIndexCell ? tabIndexStart : -1}
        {...rest}
      />,
    ];

    if (!hideSelectColumn) {
      const selectCell = (
        <SelectionCell
          {...selectRow}
          key="selection-cell"
          rowKey={key}
          rowIndex={rowIndex}
          selected={selected}
          disabled={!selectable}
          tabIndex={tabIndexCell ? (tabIndexStart += 1) : -1}
        />
      );
      if (this.isRenderFunctionColumnInLeft(selectColumnPosition)) {
        childrens.unshift(selectCell);
      } else {
        childrens.push(selectCell);
      }
    }

    if (showExpandColumn) {
      const expandCell = (
        <ExpandCell
          {...expandRow}
          key="expand-cell"
          rowKey={key}
          rowIndex={rowIndex}
          expanded={expanded}
          expandable={expandable}
          tabIndex={tabIndexCell ? (tabIndexStart += 1) : -1}
        />
      );
      if (this.isRenderFunctionColumnInLeft(expandColumnPosition)) {
        childrens.unshift(expandCell);
      } else {
        childrens.push(expandCell);
      }
    }

    return (
      <tr style={style} className={className} {...newAttrs}>
        {childrens}
      </tr>
    );
  }
}

export default RowAggregator;
