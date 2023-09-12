import cs from "classnames";
import React, { Component, ReactNode } from "react";

import { ColumnDescription } from "..";
import eventDelegater from "./cell-event-delegater";
import _ from "./utils";

interface FooterCellProps {
  columnData?: any[];
  index?: number;
  column: ColumnDescription;
}

class FooterCell extends eventDelegater(Component)<FooterCellProps> {
  render() {
    const { index, column, columnData } = this.props;

    const {
      footer,
      footerTitle,
      footerAlign,
      footerFormatter,
      footerEvents,
      footerClasses,
      footerStyle,
      footerAttrs,
    } = column;

    const delegateEvents = this.delegate(footerEvents);
    const cellAttrs = {
      ...(_.isFunction(footerAttrs)
        ? footerAttrs(column, index!)
        : footerAttrs),
      ...delegateEvents,
    };

    let text = "";
    if (_.isString(footer)) {
      text = footer;
    } else if (_.isFunction(footer)) {
      text = footer(columnData || [], column, index || 0);
    }

    let cellStyle: any = {};
    const cellClasses = _.isFunction(footerClasses)
      ? footerClasses(column, index || 0)
      : footerClasses;

    if (footerStyle) {
      cellStyle = _.isFunction(footerStyle)
        ? footerStyle(column, index || 0)
        : footerStyle;
      cellStyle = cellStyle ? { ...cellStyle } : cellStyle;
    }

    if (footerTitle) {
      cellAttrs.title = _.isFunction(footerTitle)
        ? footerTitle(column, index || 0)
        : text;
    }

    if (footerAlign) {
      cellStyle.textAlign = _.isFunction(footerAlign)
        ? footerAlign(column, index || 0)
        : footerAlign;
    }

    if (cellClasses) cellAttrs.className = cs(cellAttrs.className, cellClasses);
    if (!_.isEmptyObject(cellStyle)) cellAttrs.style = cellStyle;

    const children = footerFormatter
      ? footerFormatter(column, index || 0, { text })
      : text;

    return React.createElement("th", cellAttrs, children as ReactNode);
  }
}

export default FooterCell;
