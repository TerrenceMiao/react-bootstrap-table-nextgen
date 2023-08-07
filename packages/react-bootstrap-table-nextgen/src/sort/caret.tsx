// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
import cs from 'classnames';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';

import Const from '../const';
import { BootstrapContext } from '../contexts/bootstrap';


const SortCaret = ({
  order
}: any) => {
  const orderClass = cs('react-bootstrap-table-sort-order', {
    dropup: order === Const.SORT_ASC
  });

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <BootstrapContext.Consumer>
      {
        ({
          bootstrap4
        }: any) => (bootstrap4 ? (
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <span className={ `caret-4-${order}` } />
        ) : (
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          <span className={ orderClass }>
            // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
            <span className="caret" />
          // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
          </span>
        ))
      }
    </BootstrapContext.Consumer>
  );
};

SortCaret.propTypes = {
  order: PropTypes.oneOf([Const.SORT_ASC, Const.SORT_DESC]).isRequired
};

export default SortCaret;
