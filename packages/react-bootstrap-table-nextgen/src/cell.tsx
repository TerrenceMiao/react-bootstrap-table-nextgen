/* eslint react/prop-types: 0 */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';

import eventDelegater from './cell-event-delegater';
import _ from './utils';

class Cell extends eventDelegater(Component) {
  constructor(props: any) {
    super(props);
    this.createHandleEditingCell = this.createHandleEditingCell.bind(this);
  }

  shouldComponentUpdate(nextProps: any) {
    let shouldUpdate = false;
    if (nextProps.column.isDummyField) {
      shouldUpdate = !_.isEqual(this.props.row, nextProps.row);
    } else {
      shouldUpdate =
        _.get(this.props.row, this.props.column.dataField)
          !== _.get(nextProps.row, nextProps.column.dataField);
    }

    if (shouldUpdate) return true;

    // if (nextProps.formatter)

    shouldUpdate =
      (nextProps.column.formatter ? !_.isEqual(this.props.row, nextProps.row) : false) ||
      this.props.column.hidden !== nextProps.column.hidden ||
      this.props.column.isDummyField !== nextProps.column.isDummyField ||
      this.props.rowIndex !== nextProps.rowIndex ||
      this.props.columnIndex !== nextProps.columnIndex ||
      this.props.className !== nextProps.className ||
      this.props.title !== nextProps.title ||
      this.props.editable !== nextProps.editable ||
      this.props.clickToEdit !== nextProps.clickToEdit ||
      this.props.dbclickToEdit !== nextProps.dbclickToEdit ||
      !_.isEqual(this.props.style, nextProps.style) ||
      !_.isEqual(this.props.column.formatExtraData, nextProps.column.formatExtraData) ||
      !_.isEqual(this.props.column.events, nextProps.column.events) ||
      !_.isEqual(this.props.column.attrs, nextProps.column.attrs) ||
      this.props.tabIndex !== nextProps.tabIndex;
    return shouldUpdate;
  }

  createHandleEditingCell = (originFunc: any) => (e: any) => {
    const { onStart, rowIndex, columnIndex, clickToEdit, dbclickToEdit } = this.props;
    if ((clickToEdit || dbclickToEdit) && _.isFunction(originFunc)) {
      originFunc(e);
    }
    if (onStart) {
      onStart(rowIndex, columnIndex);
    }
  }

  render() {
    const {
      row,
      rowIndex,
      column,
      columnIndex,
      onStart,
      editable,
      clickToEdit,
      dbclickToEdit,
      ...rest
    } = this.props;
    const {
      dataField,
      formatter,
      formatExtraData
    } = column;
    const attrs = this.delegate({ ...rest });
    let content = column.isDummyField ? null : _.get(row, dataField);

    if (formatter) {
      content = column.formatter(content, row, rowIndex, formatExtraData);
    }

    if (clickToEdit && editable) {
      // @ts-expect-error TS(2339): Property 'onClick' does not exist on type '{}'.
      attrs.onClick = this.createHandleEditingCell(attrs.onClick);
    } else if (dbclickToEdit && editable) {
      // @ts-expect-error TS(2339): Property 'onDoubleClick' does not exist on type '{... Remove this comment to see the full error message
      attrs.onDoubleClick = this.createHandleEditingCell(attrs.onDoubleClick);
    }

    return (
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <td { ...attrs }>
        { typeof content === 'boolean' ? `${content}` : content }
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </td>
    );
  }
}

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
Cell.propTypes = {
  row: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  column: PropTypes.object.isRequired,
  columnIndex: PropTypes.number.isRequired
};

export default Cell;
