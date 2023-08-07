/* eslint
  react/require-default-props: 0
  jsx-a11y/no-noninteractive-element-interactions: 0
*/
/* eslint no-nested-ternary: 0 */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';

export default class ExpandCell extends Component {
  static propTypes = {
    rowKey: PropTypes.any,
    expanded: PropTypes.bool.isRequired,
    expandable: PropTypes.bool.isRequired,
    onRowExpand: PropTypes.func.isRequired,
    expandColumnRenderer: PropTypes.func,
    rowIndex: PropTypes.number,
    tabIndex: PropTypes.number
  }

  props: any;

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps: any) {
    const shouldUpdate =
      this.props.rowIndex !== nextProps.rowIndex ||
      this.props.expanded !== nextProps.expanded ||
      this.props.rowKey !== nextProps.rowKey ||
      this.props.tabIndex !== nextProps.tabIndex;

    return shouldUpdate;
  }

  handleClick(e: any) {
    const { rowKey, expanded, onRowExpand, rowIndex } = this.props;
    e.stopPropagation();
    onRowExpand(rowKey, !expanded, rowIndex, e);
  }

  render() {
    const { expanded, expandable, expandColumnRenderer, tabIndex, rowKey } = this.props;
    const attrs = {};
    // @ts-expect-error TS(2339): Property 'tabIndex' does not exist on type '{}'.
    if (tabIndex !== -1) attrs.tabIndex = tabIndex;

    return (
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <td className="expand-cell" onClick={ this.handleClick } { ...attrs }>
        {
          expandColumnRenderer ? expandColumnRenderer({
            expandable,
            expanded,
            rowKey
          }) : (expandable ? (expanded ? '(-)' : '(+)') : '')
        }
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </td>
    );
  }
}
