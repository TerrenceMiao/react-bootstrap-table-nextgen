/* eslint react/require-default-props: 0 */
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'prop... Remove this comment to see the full error message
import PropTypes from 'prop-types';

const Caption = (props: any) => {
  if (!props.children) return null;

  const caption = props.bootstrap4 ? (
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <caption style={ { captionSide: 'top' } }>{props.children}</caption>
  ) : (
    // @ts-expect-error TS(7026): JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <caption>{props.children}</caption>
  );

  return caption;
};

Caption.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  bootstrap4: PropTypes.bool
};

export default Caption;
