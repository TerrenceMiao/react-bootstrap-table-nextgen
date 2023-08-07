import cs from 'classnames';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { CSSTransition } from 'react-transition-group';

const ExpandRow = ({
  children,
  expanded,
  onClosed,
  className,
  ...rest
}: any) => (
  // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
  <tr>
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <td className={ cs('reset-expansion-style', className) } { ...rest }>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <CSSTransition
        appear
        in={ expanded }
        timeout={ 400 }
        classNames="row-expand-slide"
        onExited={ onClosed }
      >
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        <div>
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <div className="row-expansion-style">
            { children }
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          </div>
        // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
        </div>
      </CSSTransition>
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    </td>
  // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
  </tr>
);

ExpandRow.propTypes = {
  children: PropTypes.node,
  expanded: PropTypes.bool,
  onClosed: PropTypes.func,
  className: PropTypes.string
};

ExpandRow.defaultProps = {
  children: null,
  expanded: false,
  onClosed: null,
  className: ''
};

export default ExpandRow;
