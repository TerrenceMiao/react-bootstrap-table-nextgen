/* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */

// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';

import _ from './utils';
// @ts-expect-error TS(6142): Module './row/simple-row' was resolved to '/Users/... Remove this comment to see the full error message
import SimpleRow from './row/simple-row';
// @ts-expect-error TS(6142): Module './row/aggregate-row' was resolved to '/Use... Remove this comment to see the full error message
import RowAggregator from './row/aggregate-row';
// @ts-expect-error TS(6142): Module './row/row-section' was resolved to '/Users... Remove this comment to see the full error message
import RowSection from './row/row-section';
import Const from './const';
// @ts-expect-error TS(6142): Module './row-selection/row-consumer' was resolved... Remove this comment to see the full error message
import withRowSelection from './row-selection/row-consumer';
// @ts-expect-error TS(6142): Module './row-expand/row-consumer' was resolved to... Remove this comment to see the full error message
import withRowExpansion from './row-expand/row-consumer';

class Body extends React.Component {
  EditingCell: any;
  RowComponent: any;
  props: any;
  constructor(props: any) {
    super(props);
    const {
      keyField,
      cellEdit,
      selectRow,
      expandRow
    } = props;

    // Construct Editing Cell Component
    if (cellEdit.createContext) {
      this.EditingCell = cellEdit.createEditingCell(_, cellEdit.options.onStartEdit);
    }

    // Construct Row Component
    let RowComponent = SimpleRow;
    const selectRowEnabled = selectRow.mode !== Const.ROW_SELECT_DISABLED;
    const expandRowEnabled = !!expandRow.renderer;

    if (expandRowEnabled) {
      // @ts-expect-error TS(2322): Type '(props: any) => any' is not assignable to ty... Remove this comment to see the full error message
      RowComponent = withRowExpansion(RowAggregator);
    }

    if (selectRowEnabled) {
      // @ts-expect-error TS(2322): Type '{ (props: any): any; displayName: string; }'... Remove this comment to see the full error message
      RowComponent = withRowSelection(expandRowEnabled ? RowComponent : RowAggregator);
    }

    if (cellEdit.createContext) {
      RowComponent = cellEdit.withRowLevelCellEdit(RowComponent, selectRowEnabled, keyField, _);
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

    let content;

    if (isEmpty) {
      const indication = _.isFunction(noDataIndication) ? noDataIndication() : noDataIndication;
      if (!indication) {
        return null;
      }
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      content = <RowSection content={ indication } colSpan={ visibleColumnSize } />;
    } else {
      const selectRowEnabled = selectRow.mode !== Const.ROW_SELECT_DISABLED;
      const expandRowEnabled = !!expandRow.renderer;

      const additionalRowProps = {};

      if (cellEdit.createContext) {
        // @ts-expect-error TS(2339): Property 'EditingCellComponent' does not exist on ... Remove this comment to see the full error message
        additionalRowProps.EditingCellComponent = this.EditingCell;
      }

      if (selectRowEnabled || expandRowEnabled) {
        // @ts-expect-error TS(2339): Property 'expandRow' does not exist on type '{}'.
        additionalRowProps.expandRow = expandRow;
        // @ts-expect-error TS(2339): Property 'selectRow' does not exist on type '{}'.
        additionalRowProps.selectRow = selectRow;
      }

      content = data.map((row: any, index: any) => {
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

        // @ts-expect-error TS(2339): Property 'style' does not exist on type '{ key: an... Remove this comment to see the full error message
        baseRowProps.style = _.isFunction(rowStyle) ? rowStyle(row, index) : rowStyle;
        // @ts-expect-error TS(2339): Property 'className' does not exist on type '{ key... Remove this comment to see the full error message
        baseRowProps.className = (_.isFunction(rowClasses) ? rowClasses(row, index) : rowClasses);

        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <this.RowComponent { ...baseRowProps } />;
      });
    }

    return (
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <tbody className={ className }>{ content }</tbody>
    );
  }
}

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
Body.propTypes = {
  keyField: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  selectRow: PropTypes.object
};

export default Body;
