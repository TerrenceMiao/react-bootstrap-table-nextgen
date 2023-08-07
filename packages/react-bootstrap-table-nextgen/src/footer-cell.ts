/* eslint react/require-default-props: 0 */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import cs from 'classnames';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';

import _ from './utils';
import eventDelegater from './cell-event-delegater';

class FooterCell extends eventDelegater(React.Component) {
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
      footerAttrs
    } = column;

    const delegateEvents = this.delegate(footerEvents);
    const cellAttrs = {
      ...(_.isFunction(footerAttrs) ? footerAttrs(column, index) : footerAttrs),
      ...delegateEvents
    };


    let text = '';
    if (_.isString(footer)) {
      text = footer;
    } else if (_.isFunction(footer)) {
      text = footer(columnData, column, index);
    }

    let cellStyle = {};
    const cellClasses = _.isFunction(footerClasses) ? footerClasses(column, index) : footerClasses;

    if (footerStyle) {
      cellStyle = _.isFunction(footerStyle) ? footerStyle(column, index) : footerStyle;
      cellStyle = cellStyle ? { ...cellStyle } : cellStyle;
    }

    if (footerTitle) {
      cellAttrs.title = _.isFunction(footerTitle) ? footerTitle(column, index) : text;
    }

    if (footerAlign) {
      // @ts-expect-error TS(2339): Property 'textAlign' does not exist on type '{}'.
      cellStyle.textAlign = _.isFunction(footerAlign) ? footerAlign(column, index) : footerAlign;
    }

    if (cellClasses) cellAttrs.className = cs(cellAttrs.className, cellClasses);
    if (!_.isEmptyObject(cellStyle)) cellAttrs.style = cellStyle;

    const children = footerFormatter ? footerFormatter(column, index, { text }) : text;

    return React.createElement('th', cellAttrs, children);
  }
}

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
FooterCell.propTypes = {
  columnData: PropTypes.array,
  index: PropTypes.number,
  column: PropTypes.object
};

export default FooterCell;
