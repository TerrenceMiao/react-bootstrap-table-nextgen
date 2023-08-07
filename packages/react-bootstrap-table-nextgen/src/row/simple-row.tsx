/* eslint react/prop-types: 0 */
/* eslint react/no-array-index-key: 0 */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';

// @ts-expect-error TS(6142): Module './row-pure-content' was resolved to '/User... Remove this comment to see the full error message
import RowPureContent from './row-pure-content';
import eventDelegater from './event-delegater';
import shouldUpdater from './should-updater';

class SimpleRow extends shouldUpdater(eventDelegater(Component)) {
  constructor(props: any) {
    // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
    super(props);
    this.shouldUpdateRowContent = false;
  }

  shouldComponentUpdate(nextProps: any) {
    this.shouldUpdateRowContent = false;
    this.shouldUpdateRowContent = this.shouldRowContentUpdate(nextProps);
    if (this.shouldUpdateRowContent) return true;

    return this.shouldUpdatedBySelfProps(nextProps);
  }

  render() {
    const {
      className,
      style,
      attrs,
      visibleColumnSize,
      tabIndexCell,
      ...rest
    } = this.props;
    const trAttrs = this.delegate(attrs);
    const tabIndexStart = (this.props.rowIndex * visibleColumnSize) + 1;

    return (
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      <tr style={ style } className={ className } { ...trAttrs }>
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <RowPureContent
          shouldUpdate={ this.shouldUpdateRowContent }
          tabIndexStart={ tabIndexCell ? tabIndexStart : -1 }
          { ...rest }
        />
      // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
      </tr>
    );
  }
}

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
SimpleRow.propTypes = {
  row: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  attrs: PropTypes.object
};

// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
SimpleRow.defaultProps = {
  editable: true,
  style: {},
  className: null,
  attrs: {}
};

export default SimpleRow;
