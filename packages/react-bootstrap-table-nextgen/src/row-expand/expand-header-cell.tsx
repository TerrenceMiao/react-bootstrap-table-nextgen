/* eslint react/require-default-props: 0 */
/* eslint no-nested-ternary: 0 */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';

export default class ExpansionHeaderCell extends Component {
  static propTypes = {
    isAnyExpands: PropTypes.bool.isRequired,
    onAllRowExpand: PropTypes.func.isRequired,
    expandHeaderColumnRenderer: PropTypes.func
  }

  props: any;

  constructor() {
    super();
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
  }

  handleCheckBoxClick(e: any) {
    const { isAnyExpands, onAllRowExpand } = this.props;

    onAllRowExpand(e, !isAnyExpands);
  }

  render() {
    const { isAnyExpands, expandHeaderColumnRenderer } = this.props;
    const attrs = {
      onClick: this.handleCheckBoxClick
    };

    return (
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <th className="expand-cell-header" data-row-selection { ...attrs }>
        {
          expandHeaderColumnRenderer ?
            expandHeaderColumnRenderer({ isAnyExpands }) :
            (isAnyExpands ? '(-)' : '(+)')
        }
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </th>
    );
  }
}
