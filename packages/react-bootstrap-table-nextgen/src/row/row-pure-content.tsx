/* eslint react/prop-types: 0 */
/* eslint react/no-array-index-key: 0 */
/* eslint no-plusplus: 0 */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';

import _ from '../utils';
// @ts-expect-error TS(6142): Module '../cell' was resolved to '/Users/terrence/... Remove this comment to see the full error message
import Cell from '../cell';

export default class RowPureContent extends React.Component {
  props: any;
  shouldComponentUpdate(nextProps: any) {
    if (typeof nextProps.shouldUpdate !== 'undefined') {
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
      editable,
      editingRowIdx,
      editingColIdx,
      onStart,
      clickToEdit,
      dbclickToEdit,
      EditingCellComponent,
      tabIndexStart
    } = this.props;

    let tabIndex = tabIndexStart;

    return columns.map((column: any, index: any) => {
      const { dataField } = column;
      const content = _.get(row, dataField);
      if (rowIndex === editingRowIdx && index === editingColIdx) {
        return (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <EditingCellComponent
            key={ `${content}-${index}-editing` }
            row={ row }
            rowIndex={ rowIndex }
            column={ column }
            columnIndex={ index }
          />
        );
      }
      // render cell
      let cellTitle;
      let cellStyle = {};
      let cellAttrs = {
        ...(_.isFunction(column.attrs) ? column.attrs(content, row, rowIndex, index) : column.attrs)
      };

      if (column.events) {
        const events = Object.assign({}, column.events);
        Object.keys(Object.assign({}, column.events)).forEach((key) => {
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
        cellStyle = Object.assign({}, cellStyle) || {};
      }

      if (column.title) {
        cellTitle = _.isFunction(column.title)
          ? column.title(content, row, rowIndex, index)
          : content;
        cellAttrs.title = cellTitle;
      }

      if (column.align) {
        // @ts-expect-error TS(2339): Property 'textAlign' does not exist on type '{}'.
        cellStyle.textAlign =
          _.isFunction(column.align)
            ? column.align(content, row, rowIndex, index)
            : column.align;
      }

      if (cellClasses) cellAttrs.className = cellClasses;
      if (!_.isEmptyObject(cellStyle)) cellAttrs.style = cellStyle;

      let editableCell = _.isDefined(column.editable) ? column.editable : true;
      if (column.dataField === keyField || !editable) editableCell = false;
      if (_.isFunction(column.editable)) {
        editableCell = column.editable(content, row, rowIndex, index);
      }

      if (tabIndexStart !== -1) {
        cellAttrs.tabIndex = tabIndex++;
      }

      return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Cell
          key={ `${content}-${index}` }
          row={ row }
          editable={ editableCell }
          rowIndex={ rowIndex }
          columnIndex={ index }
          column={ column }
          onStart={ onStart }
          clickToEdit={ clickToEdit }
          dbclickToEdit={ dbclickToEdit }
          { ...cellAttrs }
        />
      );
    });
  }
}
