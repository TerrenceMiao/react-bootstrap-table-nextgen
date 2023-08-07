/* eslint class-methods-use-this: 0 */
/* eslint react/prop-types: 0 */
/* eslint no-plusplus: 0 */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
import _ from '../utils';
// @ts-expect-error TS(6142): Module '../row-expand/expand-cell' was resolved to... Remove this comment to see the full error message
import ExpandCell from '../row-expand/expand-cell';
// @ts-expect-error TS(6142): Module '../row-selection/selection-cell' was resol... Remove this comment to see the full error message
import SelectionCell from '../row-selection/selection-cell';
import shouldUpdater from './should-updater';
import eventDelegater from './event-delegater';
// @ts-expect-error TS(6142): Module './row-pure-content' was resolved to '/User... Remove this comment to see the full error message
import RowPureContent from './row-pure-content';
import Const from '../const';

export default class RowAggregator extends shouldUpdater(eventDelegater(React.Component)) {
  static propTypes = {
    attrs: PropTypes.object,
    style: PropTypes.object
  };

  static defaultProps = {
    attrs: {},
    style: {}
  };

  constructor(props: any) {
    // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
    super(props);
    this.clickNum = 0;
    this.shouldUpdateRowContent = false;
    this.createClickEventHandler = this.createClickEventHandler.bind(this);
  }

  shouldComponentUpdate(nextProps: any) {
    if (
      this.props.selected !== nextProps.selected ||
      this.props.expanded !== nextProps.expanded ||
      this.props.expandable !== nextProps.expandable ||
      this.props.selectable !== nextProps.selectable ||
      this.props.selectRow.hideSelectColumn !== nextProps.selectRow.hideSelectColumn ||
      this.shouldUpdatedBySelfProps(nextProps)
    ) {
      this.shouldUpdateRowContent = this.shouldRowContentUpdate(nextProps);
      return true;
    }
    this.shouldUpdateRowContent = this.shouldRowContentUpdate(nextProps);

    return this.shouldUpdateRowContent;
  }

  isRenderFunctionColumnInLeft(
    position = Const.INDICATOR_POSITION_LEFT
  ) {
    return position === Const.INDICATOR_POSITION_LEFT;
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
    const { showExpandColumn, expandColumnPosition } = expandRow;

    const newAttrs = this.delegate({ ...attrs });
    if (clickToSelect || !!expandRow.renderer) {
      newAttrs.onClick = this.createClickEventHandler(newAttrs.onClick);
    }

    let tabIndexStart = (rowIndex * visibleColumnSize) + 1;

    const childrens = [(
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <RowPureContent
        key="row"
        row={ row }
        columns={ columns }
        keyField={ keyField }
        rowIndex={ rowIndex }
        shouldUpdate={ this.shouldUpdateRowContent }
        tabIndexStart={ tabIndexCell ? tabIndexStart : -1 }
        { ...rest }
      />
    )];

    if (!hideSelectColumn) {
      const selectCell = (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SelectionCell
          { ...selectRow }
          key="selection-cell"
          rowKey={ key }
          rowIndex={ rowIndex }
          selected={ selected }
          disabled={ !selectable }
          tabIndex={ tabIndexCell ? tabIndexStart++ : -1 }
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ExpandCell
          { ...expandRow }
          key="expand-cell"
          rowKey={ key }
          rowIndex={ rowIndex }
          expanded={ expanded }
          expandable={ expandable }
          tabIndex={ tabIndexCell ? tabIndexStart++ : -1 }
        />
      );
      if (this.isRenderFunctionColumnInLeft(expandColumnPosition)) {
        childrens.unshift(expandCell);
      } else {
        childrens.push(expandCell);
      }
    }

    return (
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <tr
        style={ style }
        className={ className }
        { ...newAttrs }
      >
        { childrens }
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </tr>
    );
  }
}
